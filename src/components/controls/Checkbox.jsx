import React from 'react';
import {
  FormControl,
  Checkbox as MuiCheckbox,
  FormControlLabel,
} from '@material-ui/core';

function Checkbox(props) {
  function convertToDefaultEventParameter(name, value) {
    return { target: { name, value } };
  }

  const { name, label, value, onChange } = props;
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefaultEventParameter(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}

export default Checkbox;
