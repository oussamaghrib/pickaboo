import React from "react"
import LineCard from "./Linecard"


export default function LineCards(props) {

  return (

    <div>
      {
        props.lines.map((line, index) => {
          return <LineCard line={line} key={index}></LineCard>
        })
      }
    </div>

  )
}

