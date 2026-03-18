import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        lowStock: 0,
        totalRevenue: "Rs 0",
        topSelling: 89
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/stats/dashboard-stats`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStats(prev => ({
                        ...prev,
                        totalProducts: data.data.totalProducts,
                        totalRevenue: `Rs ${data.data.totalSales.toLocaleString()}`,
                    }));
                }
            })
            .catch(err => console.error("Error fetching product stats:", err));
            
        // Fetch products to count low stock
        fetch(`${import.meta.env.VITE_API_BASE_URL}/product/all-products`)
            .then(res => res.json())
            .then(data => {
                const products = data.data || [];
                const lowStockCount = products.filter(p => p.stock_quantity < 10).length;
                setStats(prev => ({
                    ...prev,
                    lowStock: lowStockCount
                }));
            })
            .catch(err => console.error("Error fetching low stock info:", err));
    }, []);

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={stats.totalProducts} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={stats.topSelling} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={stats.lowStock} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={stats.totalRevenue} color='#EF4444' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};
export default ProductsPage;