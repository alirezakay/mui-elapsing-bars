import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';

import Covid19 from './examples/covid19';

const useStyles = makeStyles({
  App: {},
  header: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
    color: 'white',
    padding: '0 2.5%',
    marginBottom: 25,
    "& a": {
      textDecoration: "none",
      color: "#ededed",
    },
  },
  main: {
    padding: "0 5%",
    "& a": {
      textDecoration: "none",
    },
  },
});



function App({ classes }) {
  return (
    <div className={classes.App}>
      <main className={classes.main}>
        <List component="nav">
          <Link to="/covid19">
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <span role="img" aria-label="covid19">🦠</span>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="COVID19" secondary="Oct 5, 2020" />
            </ListItem>
          </Link>
          <Divider variant="inset" component="li" />
          <Link to="/population">
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <span role="img" aria-label="population">👨‍👩‍👧‍👧</span>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="POPULATION" secondary="Oct 6, 2020" />
            </ListItem>
          </Link>
        </List>
      </main>
    </div>
  );
}

function Render() {
  const theme = createMuiTheme(
    {
      typography: {
        fontFamily: [
          '-apple-system',
          'Nunito',
          'Roboto',
          '"Segoe UI"',
          'BlinkMacSystemFont',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        h1: {
          fontSize: '2.2em',
          fontWeight: 900,
        },
        h2: {
          fontSize: '1.75em',
          fontWeight: 600,
        }
      },
    }
  );
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static" color="transparent" className={classes.header}>
          <Toolbar>
            <Link to="/">
              <Typography variant="h6">
                react-elapsing-bars
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/population">
            {/* <About /> */}
          </Route>
          <Route path="/covid19">
            <Covid19 classes={classes} />
          </Route>
          <Route path="/">
            <App classes={classes} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default Render;
