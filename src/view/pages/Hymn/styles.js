import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const HymnStyledComponents = {
  StyledDivider: styled(Divider)({
    width: "400px",
    margin: "auto",
  }),
  ArrowCircleRightIcon: styled(ArrowCircleRightIcon)({
    position: "fixed",
    top: "55%",
    right: "10%",
    fontSize: "large",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    ":hover": {
      color: "gray",
    },
  }),
  ArrowCircleLeftIcon: styled(ArrowCircleLeftIcon)({
    position: "fixed",
    top: "55%",
    left: "10%",
    fontSize: "large",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    ":hover": {
      color: "gray",
    },
  }),
};

export default HymnStyledComponents;
