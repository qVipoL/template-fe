import { TextField, TextFieldProps, styled } from "@mui/material";
import { forwardRef } from "react";

const AuthTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    "font-family": "Arial",
  },
  "& label.Mui-focused": {
    color: "white",
    marginTop: "0px",
  },
  "& label": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export const AuthInput = forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => (
    <AuthTextField
      margin="normal"
      variant="standard"
      InputProps={{
        sx: { color: "black", py: 0.7, pl: 0.9, borderRadius: 3 },
        disableUnderline: true,
      }}
      InputLabelProps={{ shrink: true }}
      {...props}
      ref={ref}
    />
  )
);
