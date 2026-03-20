import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import './UserHome.css';
import { 
  FaUser, FaEnvelope, FaBirthdayCake, FaRegEdit, FaBell, 
  FaShoppingCart, FaWallet, FaStar, FaArrowRight, FaChartLine 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const UserHome = () => {
  const { user, loading } = useContext(AuthContext);
  
  // Mock data for analytics
  const spendingData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
  ];

  const newProducts = [
    {
      _id: '1',
      name: 'Organic Green Tea',
      description: 'Antioxidant rich blend.',
      price: 150,
      imageURL: 'https://www.assamicaagro.in/cdn/shop/articles/Untitled_design_26_1200x1200.png?v=1592799889',
    },
    {
      _id: '2',
      name: 'Vegan Protein',
      description: 'Plant-based pea protein.',
      price: 2200,
      imageURL: 'https://media.post.rvohealth.io/wp-content/uploads/sites/3/2024/03/3040632-The-12-Best-Vegan-Protein-Powders-1296x728-Header-e9f1ca-1024x575.jpg',
    },
    {
      _id: '3',
      name: 'Yoga Mat',
      description: 'Eco-friendly grip.',
      price: 1200,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXQlIvinNwNYX4TWDnZI3qDJq1Jhr7BWztA&s',
    },
    {
      _id: '4',
      name: 'Chia Seeds',
      description: 'Superfood seeds.',
      price: 400,
      imageURL: 'https://ordinaryvegan.net/wp-content/uploads/2014/12/Chia-seed-pudding-small-.jpg',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200 mb-10"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={user?.userDetails[0]?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                alt="Profile"
                className="w-32 h-32 rounded-3xl border-4 border-white/20 object-cover shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-indigo-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                {getTimeGreeting()}, <span className="text-indigo-200">{user?.userDetails[0]?.name || 'Shopper'}!</span>
              </h1>
              <p className="text-indigo-100 text-lg font-medium max-w-xl opacity-90">
                Welcome back to Shenthu MART. You have <span className="font-bold text-white">3 items</span> in your cart and one order arriving today!
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-transform flex items-center gap-2">
                  <FaRegEdit /> Edit Profile
                </button>
                <button className="bg-indigo-500/30 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-2xl font-black text-sm hover:bg-indigo-500/50 transition-all flex items-center gap-2">
                  <FaBell /> Notifications
                </button>
              </div>
            </div>
          </div>
          
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full -ml-24 -mb-24 blur-3xl"></div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Spent', value: 'Rs 12,450', icon: FaWallet, color: 'indigo' },
            { label: 'Active Orders', value: '02', icon: FaShoppingCart, color: 'emerald' },
            { label: 'Loyalty Points', value: '850', icon: FaStar, color: 'amber' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group hover:-translate-y-1 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform`}></div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Spending Analytics */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Spending Overview</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Monthly Analytics</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-indigo-600">
                  <FaChartLine size={20} />
                </div>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '1rem'}}
                      itemStyle={{fontWeight: 900, color: '#6366f1'}}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 h-full">
              <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Recent Activity</h3>
              <div className="space-y-6">
                {user?.notifications?.length > 0 ? (
                  user.notifications.map((n, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                        <FaBell size={18} />
                      </div>
                      <div>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">{n.message}</p>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 block">Just Now</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                      <FaBell size={32} />
                    </div>
                    <p className="text-slate-400 font-bold italic">No recent notifications</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                View All History <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Handpicked Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 px-4">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Handpicked for You</h3>
            <button className="text-indigo-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              See more <FaArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((p, i) => (
              <motion.div 
                key={p._id}
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-[2rem] shadow-lg shadow-slate-200/30 border border-slate-50 group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={p.imageURL} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaShoppingCart className="text-indigo-600" />
                  </div>
                </div>
                <h4 className="font-extrabold text-slate-900 px-2 line-clamp-1">{p.name}</h4>
                <p className="text-slate-400 text-sm px-2 mb-4 line-clamp-1 italic">{p.description}</p>
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="text-lg font-black text-indigo-600">Rs {p.price}</span>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
