import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiInbox,
  HiTable,
  HiUser,
  HiUserAdd,
  HiOutlineUserCircle,
  HiBell,
  HiPhotograph,
} from "react-icons/hi";
import {
  BarChart2,
  DollarSign,
  Menu,
  ShoppingCart,
  TrendingUp,
  Settings,
  ClipboardCheck,
} from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Simulate product data (replace this with API call if necessary)
const productQuantities = {
  category1: 950,
  category2: 1200,
  category3: 800,
};

// Function to check for low stock
const checkLowStock = () => {
  let alertCount = 0;
  Object.keys(productQuantities).forEach((category) => {
    if (productQuantities[category] < 1000) {
      alertCount++;
    }
  });
  return alertCount;
};

// Sidebar items including Task Manager
const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/admin/dashboard/overview" },
  { name: "Products", icon: HiShoppingBag, color: "#8B5CF6", href: "/admin/dashboard/products" },
  { name: "Users", icon: HiUser, color: "#EC4899", href: "/admin/dashboard/users" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/admin/dashboard/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/admin/dashboard/orders" },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/admin/dashboard/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/admin/dashboard/settings" },
  { name: "Upload Products", icon: HiOutlineCloudUpload, color: "#F59E0B", href: "/admin/dashboard/upload" },
  { name: "Manage Products", icon: HiInbox, color: "#8B5CF6", href: "/admin/dashboard/manage" },
  { name: "Task Manager", icon: ClipboardCheck, color: "#FF5733", href: "/admin/dashboard/taskmanager" }, 
  { name: "Add New Staffs", icon: HiUserAdd, color: "#10B981", href: "/admin/dashboard/newstaffs" },
  { name: "Manage Staffs", icon: HiOutlineUserCircle, color: "#EC4899", href: "/admin/dashboard/managestaffs" },
  { name: "Upload Staff Image", icon: HiPhotograph, color: "#6366f1", href: "/admin/dashboard/uploadstaff" },
  { name: "Sign In", icon: HiArrowSmRight, color: "#10B981", href: "/login" },
  { name: "Log Out", icon: HiTable, color: "#EC4899", href: "/logout" },
  { name: "Help", icon: BiBuoy, color: "#8B5CF6", href: "#" },
  { 
    name: "Notifications", 
    icon: HiBell, 
    color: "#F59E0B", 
    href: "/admin/dashboard/notifications",
    hasAlert: checkLowStock() > 0 // Add this to handle alerts
  },
];

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-full">
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="h-xl bg-gray-700 bg-opacity-80 backdrop-blur-md p-4 flex flex-col border-r border-gray-600 shadow-lg">
          <div className="flex items-center p-2">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt="User profile"
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  className="ml-4"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  <p className="text-white">{user?.displayName || "Demo User"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-900 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>

          <nav className="mt-8 flex-grow">
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.name} to={item.href}>
                <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors mb-2">
                  <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                        {/* Show alert badge next to the bell icon */}
                        {item.name === "Notifications" && item.hasAlert && (
                          <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">!</span>
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </div>
  );
};

export default SideBar;
