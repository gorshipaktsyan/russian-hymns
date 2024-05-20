import * as React from "react";
import { useState, useEffect } from "react";
import { Snackbar, AppBar } from "@mui/material";
import { StyledComponents } from "../../../utils/index";
import { useSelector } from "react-redux";
import ToolBar from "./ToolBar";

const { StyledAlert } = StyledComponents;

function AppBarComponent({ handleDrawerToggle, currentNumber, lg }) {
  const currentHymnNumber = currentNumber.length < 2 ? currentNumber[0] : null;
  const [saved, setSaved] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const savedHymnsList = useSelector((state) => state.bookmarks.savedHymns);

  useEffect(() => {
    if (currentHymnNumber && savedHymnsList) {
      const isSaved = savedHymnsList.some((day) =>
        day.hymns.some((h) => h.number === currentHymnNumber)
      );
      setSaved(isSaved);
    }
  }, [currentHymnNumber, savedHymnsList]);

  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          backgroundColor: "black",
          zIndex: 1300,
        }}
      >
        <ToolBar
          handleDrawerToggle={handleDrawerToggle}
          saved={saved}
          setSaved={setSaved}
          currentHymnNumber={currentHymnNumber}
          currentNumber={currentNumber}
          setCopyAlert={setCopyAlert}
        />
      </AppBar>
      {copyAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={copyAlert}
          onClose={() => setCopyAlert(false)}
          autoHideDuration={2000}
        >
          <StyledAlert>{lg.appBar.copyAlert}</StyledAlert>
        </Snackbar>
      )}
    </>
  );
}

export default AppBarComponent;
