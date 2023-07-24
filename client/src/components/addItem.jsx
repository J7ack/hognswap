import React, { useState } from 'react';

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [tags, setTags] = useState([]);
  const [pictures, setPictures] = useState([]);

  // Handlers
  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleTagsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTags((prevTags) => [...prevTags, value]);
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };

  const handlePicturesChange = (event) => {
    const selectedPictures = Array.from(event.target.files);
    setPictures(selectedPictures);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('tags', JSON.stringify(tags));
    pictures.forEach((picture, index) => {
      formData.append('pictures', picture);
  })

    try {
      // Create the item object to send in the request body
      const newItem = {
        itemName,
        category,
        condition,
        tags,
        // Add pictures array directly to newItem
        pictures: pictures.map((picture) => picture.name),
      };

      // Send the request to the server
      const response = await fetch('/api/hognswap/itemInfo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Item successfully added');

        // Reset form fields
        setItemName('');
        setCategory('');
        setCondition('');
        setTags([]);
        setPictures([]);
      } else {
        console.error('Item submission failed');
      }
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type='text' value={itemName} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select a category of item</option>
          <option value="appliance">Appliance</option>
          <option value="collectible">Collectible</option>
          <option value="Clothing">Clothing</option>
        </select>
      </label>
      <br />
      <label>
        Condition:
        <select value={condition} onChange={handleConditionChange}>
          <option value="">Select a condition</option>
          <option value="great">Great</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </label>
      <br />
      <label>
        Tags:
        <br />
        <input
          type="checkbox"
          value="unopened product"
          checked={tags.includes('unopened product')}
          onChange={handleTagsChange}
        />
        <span>Unopened Product</span>
        <br />
        <input
          type="checkbox"
          value="kitchen"
          checked={tags.includes('kitchen')}
          onChange={handleTagsChange}
        />
        <span>Kitchen</span>
        <br />
        <input
          type="checkbox"
          value="outside"
          checked={tags.includes('outside')}
          onChange={handleTagsChange}
        />
        <span>Outside</span>
      </label>
      <br />
      <label>
        Pictures:
        <input type="file" multiple onChange={handlePicturesChange} />
      </label>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ItemForm;
