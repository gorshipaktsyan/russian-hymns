import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { useSelector } from "react-redux";
import createNavItems from "../../../utils/createNavItems";
import { resetContentValues } from "../../../redux/slice/contentSlice";
import { setTitle } from "../../../redux/slice/appBarSlice";
import { setIsDrawerOpen } from "../../../redux/slice/drawerSlice";
import DrawerStyledComponents from "./styles";

const { StyledDrawer, StyledBox, StyledVersionText } = DrawerStyledComponents;

function DrawerComponent({ fontSize, dispatch, lg }) {
  const navItems = createNavItems(lg);
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
  const navigate = useNavigate();

  function handleNavigate(item) {
    navigate(`/${item.route}`);
    dispatch(setTitle(item.title));
    dispatch(
      resetContentValues({
        contentSelectedTitleId: "",
        contentSelectedSubtitleId: "",
      })
    );
    dispatch(setIsDrawerOpen(false));
  }

  return (
    <StyledDrawer
      variant="temporary"
      open={isDrawerOpen}
      onClose={() => dispatch(setIsDrawerOpen(false))}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <StyledBox>
        <List>
          {navItems.slice(1).map((item) => (
            <ListItem
              key={item.title}
              disablePadding
              onClick={() => handleNavigate(item)}
            >
              <ListItemButton>
                <Box sx={{ fontSize: `${fontSize}em` }}>{item.title}</Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledBox>
      <StyledVersionText>
        <p>{lg.version}: 1.3.7</p>
      </StyledVersionText>
    </StyledDrawer>
  );
}

export default DrawerComponent;
