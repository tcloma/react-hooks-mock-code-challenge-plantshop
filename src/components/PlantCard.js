import React, { useState } from "react";

function PlantCard({ plant, handleDeletePlant, handleUpdatePlant }) {

  const { id, name, image, price } = plant;
  const [isInStock, setIsInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState('')

  const handleSoldOutClick = () => {
    setIsInStock(isInStock => !isInStock)
  }

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE',
    })
    handleDeletePlant(id)
  }

  const handlePriceUpdate = (e) => {
    if (updatedPrice !== '') {
      e.preventDefault()
      fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
          { 'price': updatedPrice }
        )
      })
        .then(res => res.json())
        .then(updatedPlant => {
          handleUpdatePlant(updatedPlant)
        })
      setUpdatedPrice('')
    }
  }

  const handleImageChange = (e) => {
    e.preventDefault()
    const newImage = prompt('Enter a new image link!')
    if (newImage !== null) {
      fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'image': newImage
        })
      })
        .then(res => res.json())
        .then(updatedPlant => {
          handleUpdatePlant(updatedPlant)
        })
    } else {
      alert('enter image URL!')
    }
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price} </p>
      {isInStock ? (
        <button className="primary" onClick={handleSoldOutClick}>In Stock</button>
      ) : (
        <button onClick={handleSoldOutClick} >Out of Stock</button>
      )}
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}> Delete </button>
      <form onSubmit={handlePriceUpdate}>
        <input
          onChange={e => setUpdatedPrice(parseFloat(e.target.value))}
          value={updatedPrice}
          type='number'
          step='0.01'
          id={id}
          placeholder="New price..."
        />
        <button type='submit'>  u/Price </button>
        <button
          onClick={handleImageChange}> u/Image </button>
      </form>
    </li>
  );
}

export default PlantCard;
