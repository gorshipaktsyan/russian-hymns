import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

function DrawerComponent({
  navItems,
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) {
  const navigate = useNavigate();
  function handleNavigate(item) {
    navigate(`/russian-hymns/${item}`);
  }
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.tittle}
              disablePadding
              onClick={() => handleNavigate(item.route)}
            >
              <ListItemButton>
                <ListItemText primary={item.tittle} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default DrawerComponent;
