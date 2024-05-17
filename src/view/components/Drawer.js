import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { useSelector } from "react-redux";
import createNavItems from "../../utils/createNavItems";
import { resetContentValues } from "../../redux/slice/contentSlice";
import { setTitle } from "../../redux/slice/appBarSlice";

function DrawerComponent({ handleDrawerToggle, fontSize, dispatch, lg }) {
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
  }

  return (
    <Drawer
      variant="temporary"
      open={isDrawerOpen}
      onClose={() => handleDrawerToggle(false)}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "240px",
          paddingTop: "64px",
        },
      }}
    >
      <Box
        onClick={() => handleDrawerToggle(!isDrawerOpen)}
        sx={{ textAlign: "center" }}
      >
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
      </Box>
      <Box
        sx={{
          marginLeft: "10px",
          position: "absolute",
          bottom: 10,
          fontSize: "13px",
        }}
      >
        <p>{lg.version}: 1.3.7</p>
      </Box>
    </Drawer>
  );
}

export default DrawerComponent;
