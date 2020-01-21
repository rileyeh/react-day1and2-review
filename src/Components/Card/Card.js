import React from 'react'
import './Card.css'

function Card(props) {
    return (
        <div className='card'>
            <img src={props.char.image} alt='profile'/>
            <h2>{props.char.name}</h2>
            <p>{props.char.house}</p>
            <button onClick={() => props.delete(props.index)}>delete</button>
      </div>
    )
}

export default Card