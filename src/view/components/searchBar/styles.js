import styled from "@emotion/styled";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RightArrow from "@mui/icons-material/East";

const SearchBarStyledComponents = {
  DesktopStyledTextField: styled(TextField)({
    maxWidth: "300px",
    backgroundColor: "#f1f1e0",
    borderRadius: "30px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "30px",
    },
    "& input": {
      "-webkit-appearance": "none",
      margin: "0",
      padding: "0px 8px",
      fontSize: "20px",
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: "0",
    },
  }),
  MobileStyledTextField: styled(TextField)({
    position: "fixed",
    bottom: "29px",
    right: "110px",
    width: "200px",
    height: "55px",
    maxWidth: "250px",
    border: "1px solid black",
    borderRadius: "30px",
    backgroundColor: "#f1f1e0",
    transition: "width 0.5s",

    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      fontSize: "1.2em",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "30px",
      height: "59px",
    },
  }),
  StyledSearchIcon: styled(SearchIcon)({
    fontSize: "30px",
    marginLeft: "10px",
    cursor: "pointer",
  }),
  StyledRightArrowIcon: styled(RightArrow)({
    fontSize: "30px",
    marginLeft: "10px",
    cursor: "pointer",
  }),
  SearchedBox: styled(Box)({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
};

export default SearchBarStyledComponents;
