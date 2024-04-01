import styled from "@emotion/styled";
import { Box, List, ListItem } from "@mui/material";

const SettingsStyledComponents = {
  StyledSetList: styled(List)({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    paddingBottom: "100px",
    maxWidth: "450px",
  }),
  StyledSetListItem: styled(ListItem)({
    flexDirection: "column",
    width: "250px",
    padding: "5px 5px",
  }),
  StyledSetTpg: styled(Box)({
    "&:hover": { cursor: "default" },
    margin: "0px 5px",
  }),
  ArrowSetBox: styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
};

export default SettingsStyledComponents;
