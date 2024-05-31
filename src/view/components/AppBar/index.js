import * as React from 'react';
import { useState } from 'react';
import ToolBar from './ToolBar';
import { Snackbar, AppBar } from '@mui/material';
import { StyledComponents } from '../../styles';

const { StyledAlert } = StyledComponents;

function AppBarComponent({ lg }) {
  const [copyAlert, setCopyAlert] = useState(false);
  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          backgroundColor: 'black',
          zIndex: 1300
        }}
      >
        <ToolBar setCopyAlert={setCopyAlert} />
      </AppBar>
      {copyAlert && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
