import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ProfileAvatarMenu from "./ProfileAvatarMenu";
import loginService from "../services/login";
import signupService from "../services/signup";
import UserService from "../services/user";

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
  },
}));

export default function NavBar(props) {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const classes = useStyles();

  const handleOpen = (e) => {
    e.currentTarget.value === "login"
      ? setLoginOpen(true)
      : setSignupOpen(true);
  };

  const handleClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    console.log("you closed it");
  };

  const handelLogin = async (e) => {
    e.preventDefault();

    const creds = {
      identifier: userName,
      password: password,
    };

    try {
      const userData = await loginService.login(creds);
      console.log(userData);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.log(e);
    }
  };

  const handelSignup = async (e) => {
    e.preventDefault();
    const profileSVG = await UserService.fetchProfilePic(userName);

    const creds = {
      username: userName,
      email: email,
      password: password,
      profileSVG,
    };

    try {
      await signupService.signup(creds);
      await setSignupOpen(false);
      await setLoginOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async (e) => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    handleClose();
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const goToProfile = async (e) => {
    const data = await UserService.getUserPosts(user.user._id, user.jwt);
    console.log(data);
  };

  if (user == null) {
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title}>Pickaboo</Typography>
            {/* open the modal when clicking on login or signup*/}
            <Button color="inherit" onClick={handleOpen} value="login">
              Login
            </Button>

            <Button color="inherit" onClick={handleOpen} value="signup">
              Signup
            </Button>
          </Toolbar>
        </AppBar>
        <LoginModal
          onClose={handleClose}
          handelLogin={handelLogin}
          handleUserNameChange={handleUserNameChange}
          handlePasswordChange={handlePasswordChange}
          open={loginOpen}
        />
        <SignupModal
          onClose={handleClose}
          handelSignup={handelSignup}
          handleUserNameChange={handleUserNameChange}
          handlePasswordChange={handlePasswordChange}
          handleEmailChange={handleEmailChange}
          open={signupOpen}
        />
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
            <ProfileAvatarMenu
              user={user}
              goToProfile={goToProfile}
              rootUrl={props.rootUrl}
            />
          </div>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
