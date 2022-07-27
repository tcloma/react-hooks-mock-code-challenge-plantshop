import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plantData, setPlantData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    let request = await fetch('http://localhost:6001/plants')
    let data = await request.json()
    setPlantData(data)
  }

  const handleDeletePlant = (id) => {
    setPlantData(plantData.filter((plant) => plant.id !== id))
  }

  const handleUpdatePlant = (updatedPlant) => {
    const newPlantArray = plantData.map((plant) => {
        if(plant.id === updatedPlant.id){
          return updatedPlant
        } else {
          return plant
        }
    })
    setPlantData(newPlantArray)
  }

  const filteredPlants = plantData.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm plantData={filteredPlants} setPlantData={setPlantData}/>
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <PlantList plantData={filteredPlants} setPlantData={setPlantData} handleDeletePlant={handleDeletePlant} handleUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;