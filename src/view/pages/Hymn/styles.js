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
    top: "400px",
    right: "300px",
    fontSize: "large",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    ":hover": {
      color: "gray",
    },
  }),
  ArrowCircleLeftIcon: styled(ArrowCircleLeftIcon)({
    position: "fixed",
    top: "400px",
    right: "300px",
    fontSize: "large",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    ":hover": {
      color: "gray",
    },
  }),
};

export default HymnStyledComponents;
