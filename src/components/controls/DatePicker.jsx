import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DatefnsUtils from '@date-io/date-fns';

function DatePicker(props) {
  const { name, label, value, onChange } = props;

  function convertToDefaultEventParameter(name, value) {
    return { target: { name, value } };
  }

  return (
    <MuiPickersUtilsProvider utils={DatefnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        value={value}
        name={name}
        format="MM/dd/yyyy"
        onChange={(date) =>
          onChange(convertToDefaultEventParameter(name, date))
        }
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
