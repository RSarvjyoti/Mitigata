import React from 'react'

const Card = ({title, icon, numberOfUsers}) => {
  return (
    <div>
        <div>{icon}</div>
        <div>{title}</div>
        <div>{numberOfUsers}</div>
    </div>
  )
}

const styles = {

}

export default Card