import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import { Router, Link, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AddLineModal from "./AddLineModal";

import userService from "../services/user";
import categoriesService from "../services/categories";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "transparent",
  },
}));

export default function SimpleMenu(props) {
  const customHistory = createBrowserHistory();

  const classes = useStyles();
  const [categoriesFromApi, setCategoriesFromApi] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addLineModalOpen, setAddLineModalOpen] = useState(false);
  const [lineTitle, setLineTitle] = useState("");
  const [lineBody, setLineBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesID, setCategoriesID] = useState([]);

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

  const handleLineTitleChange = (e) => {
    setLineTitle(e.target.value);
  };

  const handleLineBodyChange = (e) => {
    setLineBody(e.target.value);
  };

  const handleCategoriesChange = (e) => {
    const categoriesAsString = e.target.value;
    const categoriesAsArray = categoriesAsString.trim().split(/\s*,\s*/g);
    setCategories(categoriesAsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesIDList = await Promise.all(
      categories.map(async (i) => {
        const category = {
          categoryName: i,
        };
        const postedCategory = await categoriesService.postCategoy(
          category,
          props.user.jwt
        );
        return postedCategory;
      })
    );
    setCategoriesID(categoriesIDList);

    const line = {
      title: lineTitle,
      line: lineBody,
      users_permissions_user: props.user.user._id,
      categories: [...categoriesIDList],
    };
    const res = await userService.postLine(line, props.user.jwt);
    if (res.status === 200) {
      setAddLineModalOpen(false);
    }
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
          <svg
            dangerouslySetInnerHTML={{
              __html: `${props.user.user.profileSVG}`,
            }}
          ></svg>
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
      <AddLineModal
        open={addLineModalOpen}
        onClose={handleModalClose}
        handleLineTitleChange={handleLineTitleChange}
        handleLineBodyChange={handleLineBodyChange}
        handleCategoriesChange={handleCategoriesChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
