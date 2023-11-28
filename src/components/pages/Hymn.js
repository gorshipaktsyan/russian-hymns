import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '../shared/AppBar'
import DrawerComponent from "../shared/Drawer";
import {useState} from "react";
import storage from "../../app/storage.json";
import {useSwipeable} from "react-swipeable";
import './Hymn.css'

const drawerWidth = 240;
const navItems = ['Поиск', 'Содержанье', 'Алфавитный указатель', 'История', 'Закладки', 'Предисловие', 'Справка', 'Настройки', 'O Программе'];
const config = {
    delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: false,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
}

function DrawerAppBar(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [number, setNumber] = useState(1)

    function handleLeftSwipe() {
        const index = storage.findIndex(el => Number(el.number) === Number(number + 1))
        if (index > 0) {
            setNumber(number + 1)
        }
    }

    function handleRightSwipe(n) {
        const index = storage.findIndex(el => Number(el.number) === Number(number - 1))
        if (index > 0) {
            setNumber(number - 1)
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => handleLeftSwipe(),
        onSwipedRight: () => handleRightSwipe(),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    }, config);

/*    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };*/

    const hymn = storage.find(h => Number(h.number) === number)

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar navItems={navItems} handleDrawerToggle={handleDrawerToggle} number={number} />
            <Box sx={{ pt: 10, width: '100%' }}>
                <div {...handlers}>
                    <div dangerouslySetInnerHTML={{__html: hymn.html}} />
                </div>
            </Box>
            <DrawerComponent
                handleDrawerToggle={handleDrawerToggle}
                navItems={navItems}
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
            />
        </Box>
    );
}

export default DrawerAppBar
