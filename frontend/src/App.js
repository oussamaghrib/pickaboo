import axios from "axios";
import React, {useEffect, useState} from "react";
import LineCards from "./components/Linecards"
import NavBar from "./components/NavBar"
import Box from '@material-ui/core/Box';

function App() {



  const root = "http://localhost:1337"
  const URL = 'http://localhost:1337/pick-up-lines'

  const [APIdata, setAPIdata] = useState([])

  const linesFromApi = APIdata.map((line, index) => {
    const profileImage = root + line.users_permissions_user.profilePicture.formats.thumbnail.url
    const userName = line.users_permissions_user.username
    const title = line.title
    const lineBody = line.line
    const rating = line.rating
    const categories = line.categories.map((category, index) => category.categoryName)

    return {
      profileImage,
      userName,
      title,
      lineBody,
      rating,
      categories
    }

  })

  useEffect(() => {
    axios.get(URL).then((res) => {
      setAPIdata(res.data)
    })


  }, [])




  return (
    <div>
      {/* because i couldn't a sticky navbar, i used fixed with margin of 10*/}
      <Box m={10}>
        <NavBar rootUrl={root}/>
      </Box>
      <LineCards lines={linesFromApi} />
    </div >
  );
}

export default App;
