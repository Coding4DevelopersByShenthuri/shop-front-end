import React, { useEffect, useState } from "react";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

const OverviewPage = () => {
    const [stats, setStats] = useState({
        totalSales: "$0",
        newUsers: "0",
        totalProducts: "0",
        conversionRate: "0%"
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/stats/dashboard-stats`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStats({
                        totalSales: `Rs ${data.data.totalSales.toLocaleString()}`,
                        newUsers: data.data.totalUsers.toString(),
                        totalProducts: data.data.totalProducts.toString(),
                        conversionRate: data.data.conversionRate
                    });
                }
            })
            .catch(err => console.error("Error fetching stats:", err));
    }, []);

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Sales' icon={Zap} value={stats.totalSales} color='#6366F1' />
					<StatCard name='Total Users' icon={Users} value={stats.newUsers} color='#8B5CF6' />
					<StatCard name='Total Products' icon={ShoppingBag} value={stats.totalProducts} color='#EC4899' />
					<StatCard name='Conversion Rate' icon={BarChart2} value={stats.conversionRate} color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;