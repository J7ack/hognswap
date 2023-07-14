import React, { useState } from 'react'

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [tags, setTags] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/hognswap/itemInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemName, category, condition, tags }),
      });

      if (response.ok) {
        console.log('Item successfully added');

        // Reset form fields
        setItemName('');
        setCategory('');
        setCondition('');
        setTags([]);

      } else {
        console.error('Item submission failed');
      }
    } catch (error) {
      console.error('Error adding item: ', error);
    }

    console.log('Item Name: ', itemName);
    console.log('Category: ', category);
    console.log('Condition: ', condition);
    console.log('Tags: ', tags);

    // Reset form
    setItemName('');
    setCategory('');
    setCondition('');
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default ItemForm;
