import React from 'react';
import NotificationNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import {
  AppBar,
  Badge,
  Grid,
  InputBase,
  Toolbar,
  IconButton,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },

  // btnRoot: {
  //   backgroundColor: 'green',
  // },
  // btnLabel: {
  //   backgroundColor: 'red',
  // },
  // btn: {
  //   backgroundColor: 'red',
  // },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder="Search topics"
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            {/* <IconButton className={classes.btn}> */}
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationNoneIcon />
              </Badge>
            </IconButton>
            <IconButton
            // classes={{ root: classes.btnRoot, label: classes.btnLabel }}
            >
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
