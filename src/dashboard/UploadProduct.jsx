import React, { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import axios from 'axios';

function UploadProduct() {
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

  const [selectedProductCategory, setSelectedProductCategory] = useState(productCategories[0]);
  const [selectedProductUnit, setSelectedProductUnit] = useState(productUnits[0]);
  const [selectedProductOrigin, setSelectedProductOrigin] = useState(productOrigins[0]);
  const [price, setPrice] = useState(''); // State for price
  const [imageFile, setImageFile] = useState(null); // State for file input
  const [productName, setProductName] = useState(''); // New state for product name
  const [productImageUrl, setProductImageUrl] = useState(''); // New state for image URL

  // Handle product image URL input change
  const handleImageUrlChange = (e) => {
    setProductImageUrl(e.target.value);
  };

  // Handle product file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle product submission
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = event.target;
      const name = form.name.value;
      const stock_quantity = form.stock_quantity.value;
      const imageURL = form.imageURL.value;
      const id = form.id.value; 
      const unit = selectedProductUnit;
      const category = selectedProductCategory;
      const origin = selectedProductOrigin;

      if (category === "Select Category" || unit === "Select Unit" || origin === "Select Origin") {
        alert("Please select valid options for Category, Unit, and Origin.");
        return;
      }

      // Create a new product document with only the name and URL if provided
      let newProduct = { name: productName || name, stock_quantity, imageURL, id, unit, category, origin, price };

      if (productImageUrl) {
        newProduct.imageURL = productImageUrl;
      }

      // Insert the new product document into the database
      const productResponse = await axios.post('http://localhost:3000/product/upload-product', newProduct);
      const productId = productResponse.data._id;
      // If a file is selected, upload the file and update the product document with the image URL
      if (imageFile && productId) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('productId', productId);

        await axios.post('http://localhost:3000/product/upload-product-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Product and image uploaded successfully');
      } else {
        alert('Product uploaded successfully without image');
      }

      // Reset form fields
      form.reset();
      setProductName('');
      setSelectedProductCategory(productCategories[0]);
      setSelectedProductUnit(productUnits[0]);
      setSelectedProductOrigin(productOrigins[0]);
      setPrice(''); // Reset price
      setImageFile(null); // Reset file input
      setProductImageUrl(''); // Reset image URL input
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    }
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Product</h2>

      <form onSubmit={handleProductSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* first row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                value="Product Name"
              />
            </div>
            <TextInput
              id="name"
              name="name"
              placeholder="Product name"
              required
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)} // Update product name state
            />
          </div>

          {/* stock_quantity */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="stock_quantity"
                value="Product Stock Quantity"
              />
            </div>
            <TextInput
              id="stock_quantity"
              name="stock_quantity"
              placeholder="Stock Quantity"
              required
              type="number"
            />
          </div>
        </div>

        {/* second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="imageURL"
                value="Product Image URL (Optional)"
              />
            </div>
            <TextInput
              id="imageURL"
              name="imageURL"
              placeholder="Product image URL"
              type="text"
              value={productImageUrl}
              onChange={handleImageUrlChange} // Handle image URL change
            />
          </div>

          {/* category */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="category"
                value="Product Category"
              />
            </div>

            <select id='category' name='categoryname' className="w-full rounded" value={selectedProductCategory}
              onChange={(e) => setSelectedProductCategory(e.target.value)}>
              {
                productCategories.map((option) => (
                  <option key={option} value={option} disabled={option === "Select Category"}>
                    {option}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        {/* third row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="unit"
                value="Product Unit"
              />
            </div>

            <select id='unit' name='unitname' className="w-full rounded" value={selectedProductUnit}
              onChange={(e) => setSelectedProductUnit(e.target.value)}>
              {
                productUnits.map((option) => (
                  <option key={option} value={option} disabled={option === "Select Unit"}>
                    {option}
                  </option>
                ))
              }
            </select>
          </div>

          {/* id of product in db */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="id"
                value="Product ID"
              />
            </div>
            <TextInput
                id="id"
                name="id"
                placeholder="Product ID"
                required
                type="text"
              />
          </div>
        </div>

        {/* fourth row */}
        <div className='flex gap-8'>
          {/* price */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="price"
                value="Product Price"
              />
            </div>
            <TextInput
              id="price"
              name="price"
              placeholder="Price per Unit"
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)} // Update price state
            />
          </div>

          {/* origin */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label
                htmlFor="origin"
                value="Product Origin"
              />
            </div>

            <select id='origin' name='origin' className="w-full rounded" value={selectedProductOrigin}
              onChange={(e) => setSelectedProductOrigin(e.target.value)}>
              {
                productOrigins.map((option) => (
                  <option key={option} value={option} disabled={option === "Select Origin"}>
                    {option}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        {/* file input for image upload */}
        <div className='lg:w-1/3'>
          <div className="mb-2 block">
            <Label
              htmlFor="image"
              value="Product Image File (Optional)"
            />
          </div>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Handle file input change
          />
        </div>

        {/* submit button */}
        <div>
        <Button type="submit" className="mt-5 w-80 bg-blue-700 text-white hover:bg-blue-600">
            Upload Product
        </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadProduct;
