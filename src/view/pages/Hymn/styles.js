import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HymnStyledComponents = {
  StyledDivider: styled(Divider)({
    width: "400px",
    margin: "auto",
  }),
  ArrowRightIcon: styled(ArrowForwardIosIcon)({
    position: "fixed",
    top: "55%",
    right: "2%",
    fontSize: "large",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    color: "grey",
    ":hover": {
      color: "black",
    },
  }),
  ArrowLeftIcon: styled(ArrowBackIosIcon)({
    position: "fixed",
    top: "55%",
    left: "2%",
    fontSize: "large",
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
