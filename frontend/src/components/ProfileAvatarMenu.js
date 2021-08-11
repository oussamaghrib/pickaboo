import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem';
import { Router, Link, Switch, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import { createBrowserHistory } from "history";
export default function SimpleMenu(props) {

  const customHistory = createBrowserHistory();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <Avatar alt={props.user.user.username} onClick={props.goToProfile} src={props.rootUrl + props.user.user.profilePicture.formats.thumbnail.url} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>            <Link to="/my-profile">profile</Link>
</MenuItem>
        <MenuItem onClick={handleClose}>add new pickup line</MenuItem>
      </Menu>
      
    </div>
  );
}
