import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleProduct = () => {
    const product = useLoaderData();

    // Check if the product exists
    if (!product) {
        return <div>Product not found.</div>;
    }

    const { _id, name, imageURL } = product;

    return (
        <div className='mt-28 px-4 lg:px-24'>
            <img src={imageURL} alt={name} className='h-96'/>
            <h2>{name}</h2>
        </div>
    );
};

export default SingleProduct;
