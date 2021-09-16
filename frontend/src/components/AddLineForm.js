import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "block",
    },
  },
  formStyle: {
    backgroundColor: "white",
    padding: "2em",
  },
  buttonClass: {
    margin: "auto",
    width: "50%",
  },
}));

export default function AddLineForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.formStyle}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={props.handleSubmit}
      >
        <TextField
          multiline
          id="filled-basic"
          label="line title"
          variant="filled"
          onChange={props.handleLineTitleChange}
        />
        <TextField
          multiline
          id="filled-basic"
          label="line body"
          variant="filled"
          type="password"
          onChange={props.handleLineBodyChange}
        />
        <TextField
          multiline
          id="filled-basic"
          label="caregories"
          variant="filled"
          type="password"
          onChange={props.handleCategoriesChange}
        />
        <Button
          type="submit"
          className={classes.buttonClass}
          variant="contained"
          color="primary"
        >
          submit
        </Button>
      </form>
    </div>
  );
}
