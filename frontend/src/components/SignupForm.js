import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: "block"
    }
  },
  formStyle: {
    backgroundColor: "white",
    padding: '2em'
  },
  buttonClass: {
    margin: "auto",
    width: "50%",
  }
}));

export default function SignupForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.formStyle}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={props.handelSignup}>
        <TextField id="filled-basic" label="email" variant="filled" onChange={props.handleEmailChange} />
        <TextField id="filled-basic" label="username" variant="filled" onChange={props.handleUserNameChange} />
        <TextField id="filled-basic" label="passowrd" variant="filled" type="password" onChange={props.handlePasswordChange} />
        <Button type="submit" className={classes.buttonClass} variant="contained" color="primary">
          Signup
        </Button>
      </form>
    </div>
  );
}

