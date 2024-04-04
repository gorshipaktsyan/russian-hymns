import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";

const SearchStyledComponents = {
  StyledSearchButton: styled(Button)({
    width: "50%",
    maxWidth: "150px",
    height: "50px",
    background: "black",
    marginTop: "20px",
    "&:hover": {
      background: "black",
    },
  }),
  StyledForm: styled("div")({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "50px",
  }),
  StyledTextField: styled(TextField)({
    width: "100%",
    maxWidth: "300px",
    marginTop: "10px",
    "& input": {
      "-webkit-appearance": "none",
      margin: "0",
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: "0",
    },
  }),
};

export default SearchStyledComponents;
