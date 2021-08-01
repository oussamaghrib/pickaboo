import React from "react"
import LineCard from "./Linecard"
import Grid from "@material-ui/core/Grid"
import Masonry from 'react-masonry-css'



export default function LineCards(props) {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };



  return (
    <Grid container justify="center">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {
          props.lines.map((line, index) => {
            return (
              <div>
                <LineCard line={line} key={index}></LineCard>
              </div>
            )
          })
        }
      </Masonry>
    </Grid>
  )
}

