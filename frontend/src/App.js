import axios from "axios";
import React, {useEffect, useState} from "react";
import LineCards from "./components/Linecards"
import NavBar from "./components/NavBar"
import Box from '@material-ui/core/Box';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Profile from './pages/Profile'
function App() {



  const root = "http://localhost:1337"
  const URL = 'http://localhost:1337/pick-up-lines'

  const history = createBrowserHistory();

  const [APIdata, setAPIdata] = useState([])

  const linesFromApi = APIdata.map((line, index) => {
    const profileImage = root + line.users_permissions_user.profilePicture.formats.thumbnail.url
    const userName = line.users_permissions_user.username
    const title = line.title
    const lineBody = line.line
    const rating = line.rating
    const categories = line.categories.map((category, index) => category.categoryName)
    const id = line._id
    return {
      profileImage,
      userName,
      title,
      lineBody,
      rating,
      categories,
      id
    }

  })
  useEffect(() => {
    axios.get(URL).then((res) => {
      setAPIdata(res.data)
    })


  }, [])




  return (
    <BrowserRouter >
    <div>
      
      <Switch>
          <Route path="/my-profile">
            <Profile />
          </Route>
          <Route path="/">
        {/* because i couldn't "sticky" the navbar, i used fixed with margin of 10*/}
        <Box m={10}>
          <NavBar rootUrl={root} />
        </Box>
      <LineCards lines={linesFromApi} />
          </Route>
        </Switch>
    </div >
    </BrowserRouter>
  );
}

export default App;
