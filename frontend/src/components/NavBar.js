import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginModal from './LoginModal'
import loginService from '../services/login'




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    console.log("you opened it")
  };

  const handleClose = () => {
    setOpen(false);
    console.log("you closed it")
  };

  const handelLogin = async (e) => {
    e.preventDefault()

    const creds = {
      "identifier": "basta@sybinmail.com",
      "password": "pppoooiii123"
    }

    const user = await loginService.login(creds)

    console.log(user)
  }


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pickaboo
          </Typography>
          {/* open the modal when clicking on login or signup*/}
          <Button color="inherit" onClick={handleOpen}>Login</Button>

          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
      <LoginModal onClose={handleClose} handelLogin={handelLogin} open={open} />
    </div>
  );
}

