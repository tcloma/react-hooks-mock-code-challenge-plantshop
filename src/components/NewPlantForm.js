import React, { useState } from "react";

function NewPlantForm({ plantData, setPlantData }) {

  const [plantName, setPlantName] = useState('')
  const [plantUrl, setPlantUrl] = useState('')
  const [plantPrice, setPlantPrice] = useState('')

  const handleNameChange = (e) => {
    setPlantName(e.target.value)
  }

  const handleUrlChange = (e) => {
    setPlantUrl(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPlantPrice(parseFloat(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      "name": plantName,
      "image": plantUrl,
      "price": plantPrice
    }
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    setPlantData([...plantData, formData])
    setPlantName('')
    setPlantUrl('')
    setPlantPrice('')
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
        onChange={handleNameChange} 
        type="text" name="name" 
        placeholder="Plant name" 
        value={plantName}
        />
        <input onChange={handleUrlChange} type="text" name="image" placeholder="Image URL" value={plantUrl}/>
        <input onChange={handlePriceChange} type="number" name="price" step="0.01" placeholder="Price" value={plantPrice}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
