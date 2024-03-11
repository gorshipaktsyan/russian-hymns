import styled from "@emotion/styled";
import { Divider, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HymnStyledComponents = {
  StyledDivider: styled(Divider)({
    width: "400px",
    margin: "auto",
  }),
  ArrowRightWrapper: styled(Box)({
    position: "fixed",
    top: "50%",
    right: "20px",
    width: "80px",
    height: "80px",
    cursor: "pointer",
    color: "grey",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      color: "black",
    },
  }),
  ArrowLeftWrapper: styled(Box)({
    position: "fixed",
    top: "50%",
    left: "20px",
    width: "80px",
    height: "80px",
    cursor: "pointer",
    color: "grey",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      color: "black",
    },
  }),
  ArrowRightIcon: styled(ArrowForwardIosIcon)({
    width: "50px",
    height: "50px",
    cursor: "pointer",
  }),
  ArrowLeftIcon: styled(ArrowBackIosIcon)({
    width: "50px",
    height: "50px",
    cursor: "pointer",
  }),
};

export default HymnStyledComponents;
