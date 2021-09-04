import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import { Router, Link, Switch, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import { createBrowserHistory } from "history";
import AddLineModal from "./AddLineModal";
const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "transparent",
  },
}));

export default function SimpleMenu(props) {
  const customHistory = createBrowserHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addLineModalOpen, setAddLineModalOpen] = React.useState(false);

  const handelOpen = () => {
    setAddLineModalOpen(true);
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setAddLineModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          className={classes.avatar}
          alt={props.user.user.username}
          onClick={props.goToProfile}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `${props.user.user.profileSVG}`,
            }}
          ></div>
        </Avatar>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <Link to="/my-profile">profile</Link>
        </MenuItem>
        <MenuItem onClick={handelOpen}>add new pickup line</MenuItem>
      </Menu>
      <AddLineModal open={addLineModalOpen} onClose={handleModalClose} />
    </div>
  );
}
