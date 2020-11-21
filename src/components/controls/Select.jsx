import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;
  return (
    <FormControl variant='outlined' {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value=''>None</MenuItem>
        {options.map((element) => (
          <MenuItem key={element.id} value={element.id}>
            {element.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default Select;
