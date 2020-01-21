import React from 'react'

function Card(props) {
    return (
        <div>
            <img src={props.char.image} alt='profile'/>
            <h2>{props.char.name}</h2>
            <p>{props.char.house}</p>
      </div>
    )
}

export default Card