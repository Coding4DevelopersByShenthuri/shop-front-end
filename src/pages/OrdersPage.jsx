import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";

const OrdersPage = () => {
    const [orderStats, setOrderStats] = useState({
        totalOrders: "0",
        pendingOrders: "0",
        completedOrders: "0",
        totalRevenue: "Rs 0",
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/stats/dashboard-stats`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrderStats(prev => ({
                        ...prev,
                        totalOrders: data.data.orderCount.toLocaleString(),
                        totalRevenue: `Rs ${data.data.totalSales.toLocaleString()}`,
                        // Since we don't have status in Order model yet, let's keep others or mock
                        completedOrders: data.data.orderCount.toLocaleString(),
                    }));
                }
            })
            .catch(err => console.error("Error fetching order stats:", err));
    }, []);

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Orders' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
					<StatCard name='Pending Orders' icon={Clock} value={orderStats.pendingOrders} color='#F59E0B' />
					<StatCard
						name='Completed Orders'
						icon={CheckCircle}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
					<StatCard name='Total Revenue' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div>

				<OrdersTable />
			</main>
		</div>
	);
};
export default OrdersPage;