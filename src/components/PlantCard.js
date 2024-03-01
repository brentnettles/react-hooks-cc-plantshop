import React, { useState, useEffect } from "react";

function PlantCard({ plant }) {
  const [isSoldOut, setIsSoldOut] = useState(plant.soldOut);

  const handleToggleSoldOut = () => {
    // Toggle the sold status locally
    setIsSoldOut(prevIsSoldOut => !prevIsSoldOut); 
    // Send a PATCH request to update the sold status on the server
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ soldOut: !isSoldOut }), // Toggle the soldOut property
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed");
        }
        console.log("PATCH SENT", response);
      })
      .catch((error) => {
        console.error("Error updating plant sold status:", error);
        // Revert the local state if the server update fails
        setIsSoldOut(prevIsSoldOut => !prevIsSoldOut); // Use functional form of setState
      });
  };

  return (
    <li className="card" data-testd="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price.toFixed(2)}</p>
      {/* //needed the "toFixed to show the price num ending in zero(s)" */}
      {isSoldOut ? (
        <button onClick={handleToggleSoldOut}>Sold Out</button>
      ) : (
        <button onClick={handleToggleSoldOut}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
