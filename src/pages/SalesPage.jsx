import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";

const SalesPage = () => {
    const [salesStats, setSalesStats] = useState({
        totalRevenue: "Rs 0",
        averageOrderValue: "Rs 0",
        conversionRate: "0%",
        salesGrowth: "0%",
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/stats/dashboard-stats`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const avgOrder = data.data.orderCount > 0 ? (data.data.totalSales / data.data.orderCount).toFixed(2) : 0;
                    setSalesStats(prev => ({
                        ...prev,
                        totalRevenue: `Rs ${data.data.totalSales.toLocaleString()}`,
                        averageOrderValue: `Rs ${avgOrder}`,
                        conversionRate: data.data.conversionRate,
                    }));
                }
            })
            .catch(err => console.error("Error fetching sales stats:", err));
    }, []);

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Sales Dashboard' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* SALES STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Revenue' icon={DollarSign} value={salesStats.totalRevenue} color='#6366F1' />
					<StatCard
						name='Avg. Order Value'
						icon={ShoppingCart}
						value={salesStats.averageOrderValue}
						color='#10B981'
					/>
					<StatCard
						name='Conversion Rate'
						icon={TrendingUp}
						value={salesStats.conversionRate}
						color='#F59E0B'
					/>
					<StatCard name='Sales Growth' icon={CreditCard} value={salesStats.salesGrowth} color='#EF4444' />
				</motion.div>

				<SalesOverviewChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<SalesByCategoryChart />
					<DailySalesTrend />
				</div>
			</main>
		</div>
	);
};
export default SalesPage;