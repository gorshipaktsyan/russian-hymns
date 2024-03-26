import styled from "@emotion/styled";
import { Box, List, ListItem, Typography } from "@mui/material";

const SettingsStyledComponents = {
  StyledSettingsList: styled(List)({
    display: "grid",
    width: "100%",
    paddingBottom: "100px",
    maxWidth: "450px",
  }),
  StyledSettingsListItem: styled(ListItem)({
    display: "flex",
    justifyContent: "center",
    padding: "5px 5px",
  }),
  StyledOpButton: styled(Box)({
    color: "black",
    margin: "0px 5px",
    "&:hover": { cursor: "pointer" },
  }),
  StyledSettingsTpg: styled(Typography)({
    "&:hover": { cursor: "default" },
    margin: "0px 5px",
  }),
};

export default SettingsStyledComponents;
