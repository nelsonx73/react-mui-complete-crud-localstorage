import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import { useForm, Form } from "../../components/useForm";
import Controls from "../../components/controls/Controls";

import * as employeeService from "../../services/employeeService";
import DatePicker from "../../components/controls/DatePicker";

const genderItems = [
  {
    id: "male",
    title: "Male",
  },
  {
    id: "female",
    title: "Female",
  },
  {
    id: "other",
    title: "Other",
  },
];

const initialFieldValues = {
  id: 0,
  fullname: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

function EmployeeForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, true, validate);

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({ ...recordForEdit });
    }
  }, [recordForEdit]);

  function validate(fieldValues = values) {
    let temp = { ...errors };

    // const emailPattern = RegExp(
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // );
    const emailPattern = RegExp(/$^|.+@.+..+/);

    if ("fullname" in fieldValues) {
      temp.fullname = fieldValues.fullname ? "" : "This field is required";
    }

    if ("email" in fieldValues) {
      temp.email = emailPattern.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    }

    if ("mobile" in fieldValues) {
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimun 10 numbers required";
    }

    if ("departmentId" in fieldValues) {
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required";
    }

    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
      // employeeService.insertEmployee(values);
      // resetForm();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullname'
            label='Full Name'
            value={values.fullname}
            onChange={handleInputChange}
            error={errors.fullname}
          />
          <Controls.Input
            name='email'
            label='Email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name='mobile'
            label='Mobile'
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name='city'
            label='City'
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            value={values.gender}
            label='Gender'
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name='departmentId'
            label='Department'
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepatmentColletion()}
            error={errors.departmentId}
          />
          <DatePicker
            name='hireDate'
            label='Hire Date'
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button text='Submit' type='submit' />
            <Controls.Button color='default' text='Reset' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default EmployeeForm;
