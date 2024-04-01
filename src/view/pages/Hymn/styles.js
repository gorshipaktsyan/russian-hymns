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
  ArrowMobileRightIcon: styled(ArrowForwardIosIcon)({
    width: "30px",
    height: "40px",
  }),
  ArrowMobileLeftIcon: styled(ArrowBackIosIcon)({
    width: "30px",
    height: "40px",
  }),
  StyledFooter: styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: "0px",
    height: "50px",
    width: "100%",
    backgroundColor: "grey",
    opacity: "0.5",
  }),
  ArrowLeftMobWrapper: styled(Box)({
    display: "flex",
    justifyContent: "flex-end",
    width: "50px",
  }),
  ArrowRightMobWrapper: styled(Box)({
    display: "flex",
    justifyContent: "flex-start",
    width: "40px",
  }),
};

export default HymnStyledComponents;
