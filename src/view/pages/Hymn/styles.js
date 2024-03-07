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
    width: "100px",
    height: "100px",
    cursor: "pointer",
    color: "grey",
    display: 'flex',
    justifyContent: 'center',
  }),
  ArrowLeftWrapper: styled(Box)({
    position: "fixed",
    top: "50%",
    left: "20px",
    fontSize: "large",
    width: "100px",
    height: "100px",
    cursor: "pointer",
    color: "grey",
    display: 'flex',
    justifyContent: 'center',
  }),
  ArrowRightIcon: styled(ArrowForwardIosIcon)({
    width: "50px",
    height: "50px",
    cursor: "pointer",
    color: "grey",
    ":hover": {
      color: "black",
    },
  }),
  ArrowLeftIcon: styled(ArrowBackIosIcon)({
    width: "50px",
    height: "50px",
    cursor: "pointer",
    color: "grey",
    ":hover": {
      color: "black",
    },
  }),
};

export default HymnStyledComponents;
