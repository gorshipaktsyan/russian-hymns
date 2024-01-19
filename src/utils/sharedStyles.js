import styled from "@emotion/styled";
import { Box, List, Fab, Alert, Typography } from "@mui/material";

const StyledComponents = {
  StyledBox: styled(Box)({
    display: "flex",
    justifyContent: "center",
    width: "100%",
  }),
  StyledList: styled(List)({
    width: "100%",
    paddingBottom: "100px",
    maxWidth: "400px",
  }),
  StyledFab: styled(Fab)({
    zIndex: 1000,
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "black",
    "&:hover": { backgroundColor: "black" },
  }),
  StyledAlert: styled(Alert)({
    width: "100%",
    marginTop: "50px",
  }),
  StyledTypography: styled(Typography)({
    marginTop: "100px",
  }),
};

export default StyledComponents;
