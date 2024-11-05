import React, { useEffect, useState } from 'react';

const Notifications = () => {
    // State to hold product quantities fetched from the API
    const [productQuantities, setProductQuantities] = useState({});
    
    // State to handle loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product quantities from the backend
    useEffect(() => {
        const fetchProductQuantities = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stock/stock_quantity`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product quantities');
                }
                const data = await response.json();
                setProductQuantities(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductQuantities();
    }, []);

    // Filter out categories with low stock
    const lowStockCategories = Object.keys(productQuantities).filter(
        (category) => productQuantities[category] < 1000
    );

    // Filter out categories with excess stock
    const excessStockCategories = Object.keys(productQuantities).filter(
        (category) => productQuantities[category] > 1000
    );

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-8 rounded-lg shadow-lg flex-1 overflow-auto relative z-10 glass-container">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Stock Alerts</h2>

            {/* Low Stock Alerts */}
            <h3 className="text-xl font-semibold mb-4 text-red-700">Low Stock Alerts</h3>
            {lowStockCategories.length > 0 ? (
                <ul className="space-y-4">
                    {lowStockCategories.map((category) => (
                        <li key={category} className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            <strong>{category}</strong> has only <strong>{productQuantities[category]}</strong> units left.
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg mb-6">
                    All categories are sufficiently stocked.
                </div>
            )}

            {/* Excess Stock Alerts */}
            <h3 className="text-xl font-semibold mt-6 mb-4 text-green-700">Excess Stock Alerts</h3>
            {excessStockCategories.length > 0 ? (
                <ul className="space-y-4">
                    {excessStockCategories.map((category) => (
                        <li key={category} className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                            <strong>{category}</strong> has an excess of <strong>{productQuantities[category] - 1000}</strong> units.
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-4 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg">
                    No categories have excess stock.
                </div>
            )}
        </div>
    );
};

export default Notifications;
