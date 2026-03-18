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
    "Cleaners",
    "Snacks",
    "Frozen",
    "Grains",
    "Bakings",
    "Spices",
    "Oils",
    "Dried",
    "Condiments",
    "Chocolates",
    "Sweets",
    "Leafy"
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
    "Scoop",
    "Bundle"
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
      const productResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/upload-product`, newProduct);
      const productId = productResponse.data._id;
      // If a file is selected, upload the file and update the product document with the image URL
      if (imageFile && productId) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('productId', productId);

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/upload-product-image`, formData, {
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
    <div className='py-8'>
      <div className="mb-8">
        <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight font-sans'>Upload Product</h2>
        <p className="text-slate-500 mt-2">Add a new item to your shop inventory with details and image.</p>
      </div>

      <form onSubmit={handleProductSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* first row */}
          <div className="space-y-2">
            <Label htmlFor="name" value="Product Name" className="text-sm font-semibold text-slate-700" />
            <TextInput
              id="name"
              name="name"
              placeholder="e.g. Fresh Organic Milk"
              required
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock_quantity" value="Stock Quantity" className="text-sm font-semibold text-slate-700" />
            <TextInput
              id="stock_quantity"
              name="stock_quantity"
              placeholder="0"
              required
              type="number"
              className="focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* second row */}
          <div className="space-y-2">
            <Label htmlFor="imageURL" value="Product Image URL (Optional)" className="text-sm font-semibold text-slate-700" />
            <TextInput
              id="imageURL"
              name="imageURL"
              placeholder="https://example.com/image.jpg"
              type="text"
              value={productImageUrl}
              onChange={handleImageUrlChange}
              className="focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" value="Category" className="text-sm font-semibold text-slate-700" />
            <select 
              id='category' 
              name='categoryname' 
              className="w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm h-[42px]" 
              value={selectedProductCategory}
              onChange={(e) => setSelectedProductCategory(e.target.value)}
            >
              {productCategories.map((option) => (
                <option key={option} value={option} disabled={option === "Select Category"}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* third row */}
          <div className="space-y-2">
            <Label htmlFor="unit" value="Unit" className="text-sm font-semibold text-slate-700" />
            <select 
              id='unit' 
              name='unitname' 
              className="w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm h-[42px]" 
              value={selectedProductUnit}
              onChange={(e) => setSelectedProductUnit(e.target.value)}
            >
              {productUnits.map((option) => (
                <option key={option} value={option} disabled={option === "Select Unit"}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id" value="Internal Product ID" className="text-sm font-semibold text-slate-700" />
            <TextInput
              id="id"
              name="id"
              placeholder="e.g. SKU-001"
              required
              type="text"
              className="focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* fourth row */}
          <div className="space-y-2">
            <Label htmlFor="price" value="Price (Rs)" className="text-sm font-semibold text-slate-700" />
            <TextInput
              id="price"
              name="price"
              placeholder="0.00"
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="origin" value="Origin" className="text-sm font-semibold text-slate-700" />
            <select 
              id='origin' 
              name='origin' 
              className="w-full rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm h-[42px]" 
              value={selectedProductOrigin}
              onChange={(e) => setSelectedProductOrigin(e.target.value)}
            >
              {productOrigins.map((option) => (
                <option key={option} value={option} disabled={option === "Select Origin"}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* file input */}
          <div className="md:col-span-2 space-y-2 pt-2">
            <Label htmlFor="image" value="Upload Product Image (Optional)" className="text-sm font-semibold text-slate-700" />
            <div className="flex items-center justify-center w-full">
              <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 800x400px)</p>
                </div>
                <input id="image" name="image" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            {imageFile && <p className="text-sm text-indigo-600 font-medium mt-1">Selected: {imageFile.name}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-full md:w-64 bg-indigo-600 text-white hover:bg-indigo-700 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95">
            Upload Product
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadProduct;
