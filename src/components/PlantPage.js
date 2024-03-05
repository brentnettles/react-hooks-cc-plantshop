import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

///

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = () => {
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data); // Set filteredPlants initially with all plants
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  };

  const handleAddPlant = (newPlant) => {
    // POST request to add new plant to the server
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json()) // Parse the response JSON
      .then((data) => {
       
        setPlants([...plants, data]);
        setFilteredPlants([...filteredPlants, data]);
      });
  };

  const handleSearch = (search) => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
