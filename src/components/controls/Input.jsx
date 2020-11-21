import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, onChange, error = null, ...otherProps } = props;

  return (
    <TextField
      {...otherProps}
      variant='outlined'
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
