import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import LoginModal from './LoginModal'
import ProfileAvatarMenu from './ProfileAvatarMenu'
import loginService from '../services/login'
import UserService from '../services/user'



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
  username: {
    flexGrow: 1,
  }
}));

export default function NavBar(props) {

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null)
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

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
      "identifier": userName,
      "password": password
    }

    try {

      const userData = await loginService.login(creds)
      console.log(userData)
      localStorage.setItem("loggedInUser", JSON.stringify(userData))
      setUser(userData)

    } catch (e) {
      console.log(e)
    }

  }

  const handleLogout = async (e) => {
    localStorage.removeItem("loggedInUser")
    setUser(null)
    handleClose()
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const goToProfile = async (e) => {
    const data = await UserService.getUserPosts(user.user._id, user.jwt)
    console.log(data)
  }

  if (user == null) {

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title}>
              Pickaboo
            </Typography>
            {/* open the modal when clicking on login or signup*/}
            <Button color="inherit" onClick={handleOpen}>Login</Button>

            <Button color="inherit">Signup</Button>
          </Toolbar>
        </AppBar>
        <LoginModal onClose={handleClose} handelLogin={handelLogin} handleUserNameChange={handleUserNameChange} handlePasswordChange={handlePasswordChange} open={open} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pickaboo
          </Typography>
          <div className={classes.username}>
            <ProfileAvatarMenu user={user} goToProfile={goToProfile} rootUrl={props.rootUrl} />
          </div>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>

  )
}

