import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlant = {
      name: name,
      image: image,
      price: parseFloat(price),
    };
    onAddPlant(newPlant);
    setName("");
    setImage("");
    setPrice("");
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Plant name"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
          placeholder="Image URL"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          step="0.01"
          placeholder="Price"
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
