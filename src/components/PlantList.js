import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plantData, handleDeletePlant, handleUpdatePlant }) {


  return (
    <ul className="cards">
      {plantData.map((plant) => {
        return (
          <PlantCard key={plant.id} plant={plant} handleDeletePlant={handleDeletePlant} handleUpdatePlant={handleUpdatePlant} />
        )
      })}
    </ul>
  );
}

export default PlantList;