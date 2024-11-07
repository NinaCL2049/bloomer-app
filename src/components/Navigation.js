import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MyTimer from './Session';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
        <Toolbar>
            <Typography variant="h6" style={{ flexGrow: "1" }} component="div">
              Bloomer
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
              >
                Log Out
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
              >
                About
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/menu"
              >
                Menu
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {/* <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(1)]
            .map(
              () => `Welcome to Bloomer! Here's what it is and how to use it. right now this text is in navigation.js, but i'll move it to about.js.`,
            )
            .join('\n')}
        </Box>
      </Container> */}
    </React.Fragment>
  );
}

