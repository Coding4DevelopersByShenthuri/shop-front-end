import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Label, TextInput, Select } from "flowbite-react";

function EditProducts() {
  const productCategories = [
    "Select Category",
    "Beverage",
    "Dairy",
    "Fruits",
    "Vegetables",
    "Meat",
    "Canned",
    "Cleaning Supplies",
    "Snacks",
    "Frozen",
    "Grains",
    "Baking Things",
    "Spices",
    "Oils",
    "Dried",
    "Condiments",
    "Chocolates",
    "Sweets"
  ];

  const productUnits = [
    "Select Unit",
    "Bottle",
    "Pack",
    "kg",
    "Piece",
    "Box",
    "Tin",
    "Cup",
    "Litre",
    "Scoop"
  ];

  const productOrigins = [
    "Select Origin",
    "Sri Lanka",
    "USA",
    "Australia",
    "UK",
    "India",
    "Canada",
    "Japan",
    "China"
  ];

  const { id } = useParams(); // Get the product ID from the URL
  const productData = useLoaderData(); // Use loader data to get product details

  const [selectedProductCategory, setSelectedProductCategory] = useState(productCategories[0]);
  const [selectedProductUnit, setSelectedProductUnit] = useState(productUnits[0]);
  const [selectedProductOrigin, setSelectedProductOrigin] = useState(productOrigins[0]);
  const [price, setPrice] = useState(''); // State for price

  // Pre-populate the form with product data from loader
  useEffect(() => {
    if (productData) {
      setSelectedProductCategory(productData.category);
      setSelectedProductUnit(productData.unit);
      setSelectedProductOrigin(productData.origin);
      setPrice(productData.price); // Set initial price value
    }
  }, [productData]);

  // Handle product submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const stock_quantity = form.stock_quantity.value;
    const imageURL = form.imageURL.value;
    const unit = selectedProductUnit;
    const category = selectedProductCategory;
    const origin = selectedProductOrigin;

    if (category === "Select Category" || unit === "Select Unit" || origin === "Select Origin" || !price) {
      alert("Please select valid options for Category, Unit, Origin, and provide a price.");
      return;
    }

    const updateProductObj = {
      name,
      stock_quantity,
      imageURL,
      unit,
      category,
      origin,
      price // Include price in the update object
    };

    // Update product data
    fetch(`http://localhost:3000/product/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateProductObj)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      alert("Product is Updated Successfully!");
    })
    .catch(error => {
      console.error('Error updating the product:', error);
      alert("There was an issue updating the product.");
    }); 
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Product Data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* Product Name */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Product Name" />
          </div>
          <TextInput
            id="name"
            name="name"
            defaultValue={productData?.name}
            placeholder="Product name"
            required
            type="text"
          />
        </div>

        {/* Stock Quantity */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="stock_quantity" value="Product Stock Quantity" />
          </div>
          <TextInput
            id="stock_quantity"
            name="stock_quantity"
            defaultValue={productData?.stock_quantity}
            placeholder="Stock Quantity"
            required
            type="number"
          />
        </div>

        {/* Price */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Product Price" />
          </div>
          <TextInput
            id="price"
            name="price"
            value={price} // Bind price state to the input
            onChange={(e) => setPrice(e.target.value)} // Update price state on change
            placeholder="Product Price"
            required
            type="number" // Use number input type for price
          />
        </div>

        {/* Image URL */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="imageURL" value="Product image URL" />
          </div>
          <TextInput
            id="imageURL"
            name="imageURL"
            defaultValue={productData?.imageURL}
            placeholder="Product image URL"
            required
            type="text"
          />
        </div>

        {/* Category */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="category" value="Product Category" />
          </div>
          <Select id='category' value={selectedProductCategory} onChange={(e) => setSelectedProductCategory(e.target.value)}>
            {
              productCategories.map((option) => (
                <option key={option} value={option} disabled={option === "Select Category"}>
                  {option}
                </option>
              ))
            }
          </Select>
        </div>

        {/* Unit */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="unit" value="Product Unit" />
          </div>
          <Select id='unit' value={selectedProductUnit} onChange={(e) => setSelectedProductUnit(e.target.value)}>
            {
              productUnits.map((option) => (
                <option key={option} value={option} disabled={option === "Select Unit"}>
                  {option}
                </option>
              ))
            }
          </Select>
        </div>

        {/* Origin */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="origin" value="Product Origin" />
          </div>
          <Select id='origin' value={selectedProductOrigin} onChange={(e) => setSelectedProductOrigin(e.target.value)}>
            {
              productOrigins.map((option) => (
                <option key={option} value={option} disabled={option === "Select Origin"}>
                  {option}
                </option>
              ))
            }
          </Select>
        </div>

        <Button type="submit" className="mt-5 w-80 bg-blue-500 text-white hover:bg-blue-700">
          Update Product
        </Button>
      </form>
    </div>
  );
}

export default EditProducts;
