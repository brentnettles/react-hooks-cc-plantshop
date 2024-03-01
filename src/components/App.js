import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  };

  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} fetchPlants={fetchPlants} />
    </div>
  );
}

export default App;
