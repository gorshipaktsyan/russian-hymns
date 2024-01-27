import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const drawerWidth = 240;

function DrawerComponent({
  navItems,
  mobileOpen,
  handleDrawerToggle,
  setTitle,
}) {
  const navigate = useNavigate();
  function handleNavigate(item) {
    navigate(`/russian-hymns/${item.route}`);
    setTitle(item.title);
  }
  return (
      <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
      >
        <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
          <List>
            {navItems.slice(1).map((item) => (
                <ListItem
                    key={item.tittle}
                    disablePadding
                    onClick={() => handleNavigate(item)}
                >
                  <ListItemButton>
                    <Box sx={{fontSize: "18px"}}>{item.title}</Box>
                  </ListItemButton>
                </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{marginLeft: "10px", position: 'absolute', bottom: 0}}><p>Версия программы: 1.0.9</p></Box>
      </Drawer>
  );
}

export default DrawerComponent;
