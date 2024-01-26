import { styled } from "@mui/system";
import { Button, Box, List, TextField } from "@mui/material";

const SearchStyledComponents = {
  StyledModalBox: styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "#fdfde8",
    border: "2px solid #000",
    boxShadow: "0px 0px 20px 5px ",
    padding: "4px",
  }),
  StyledModalList: styled(List)({
    width: "100%",
    paddingBottom: "100px",
    maxWidth: "400px",
    overflowY: "auto",
    height: "100dvh",
  }),
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
    marginTop: "5%",
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
