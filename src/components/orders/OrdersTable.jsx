import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Trash } from "lucide-react";

const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
    const [allOrders, setAllOrders] = useState([]);
	const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/stats/recent-orders`)
            .then(res => res.json())
            .then(data => {
                const orders = data.data || [];
                setAllOrders(orders);
                setFilteredOrders(orders);
            })
            .catch(err => console.error("Error fetching orders:", err));
    }, []);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = allOrders.filter(
			(order) => order.orderNumber.toString().includes(term) || (order.userId && order.userId.toLowerCase().includes(term))
		);
		setFilteredOrders(filtered);
	};

    const calculateTotal = (detail) => {
        return detail.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

	return (
		<motion.div
			className='bg-gray-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Order List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search orders...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Order No.
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Items
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Total
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Date
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide divide-gray-700'>
						{filteredOrders.map((order) => (
							<motion.tr
								key={order._id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200'>
									#{order.orderNumber}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200'>
									{order.orderDetail.length} items
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200'>
									Rs {calculateTotal(order.orderDetail).toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Eye size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300 mr-2'>
										<Trash size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default OrdersTable;