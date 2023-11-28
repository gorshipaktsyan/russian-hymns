import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

function AppBarComponent({navItems, handleDrawerToggle, number}) {
    return (
        <AppBar component="nav" sx={{backgroundColor: '#000'}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Box>Гимны (1-800)</Box>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarComponent;
