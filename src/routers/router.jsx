import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import UserHome from "../userHome/userHome";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../blogs/Blog";
import Recipes from "../recipes/Recipes";
import DashboardLayout from "../dashboard/DashboardLayout";
import ManageProducts from "../dashboard/ManageProducts";
import EditProducts from "../dashboard/EditProducts";
import EditStaffs from "../dashboard/EditStaffs";
import UploadProduct from "../dashboard/UploadProduct";
import AddNewStaffs from "../dashboard/AddNewStaffs";
import ManageStaffs from "../dashboard/ManageStaffs";
import SingleProduct from "../shop/SingleProduct";
import SingleBlog from "../blogs/SingleBlog";
import Signup from "../components/Signup";
import Overview from "../pages/OverviewPage";
import Login from "../components/Login";
import AdminRoute from "../PrivateRoute/AdminRoute";
import UserRoute from "../PrivateRoute/UserRoute";
import AnalyticsPage from "../pages/AnalyticsPage";
import OrdersPage from "../pages/OrdersPage";
import ProductsPage from "../pages/ProductsPage";
import SalesPage from "../pages/SalesPage";
import SettingsPage from "../pages/SettingsPage";
import UsersPage from "../pages/UsersPage";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";
import UploadStaff from "../dashboard/UploadStaff";
import Notifications from "../components/Notifications";
import TaskManager from "../pages/TaskManager";
import StaffAttendance from "../pages/StaffAttendance"; 
import QRCodePage from "../pages/QRCodePage";
import BirthdayReminders from "../pages/BirthdayReminders";
import ContactUs from "../components/ContactUs";
import HelpPage from "../pages/HelpPage";
import BillingPage from "../pages/BillingPage";
import ManageRecipes from "../dashboard/ManageRecipes";
import Wishlist from '../components/Wishlist';
import Cart from '../components/Cart';
import ManageBlogs from "../dashboard/ManageBlogs";
import SingleRecipe from "../recipes/SingleRecipe";

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/recipe",
        element: <Recipes />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/wishlists",
        element: <Wishlist />,
      },
      {
        path: "/carts",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/product/product/${params.id}`),
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs/blog/${params.id}`),
      },
      {
        path: "/recipes/:id",
        element: <SingleRecipe />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes/recipes/${params.id}`),
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/help",
        element: <HelpPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*", // Catch-all for undefined routes
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <ErrorBoundary>
          <DashboardLayout />
        </ErrorBoundary>
      </AdminRoute>
    ),
    children: [
      {
        index: true, // Default route for /admin/dashboard
        element: <Navigate to="overview" />, // Redirect to overview page
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "taskmanager",
        element: <TaskManager />,
      },
      {
        path: "upload",
        element: <UploadProduct />,
      },
      {
        path: "billing",
        element: <BillingPage />,
      },
      {
        path: "manage",
        element: <ManageProducts />,
      },
      {
        path: "recipes",
        element: <ManageRecipes />,
      },
      {
        path: "blogs",
        element: <ManageBlogs />,
      },
      {
        path: "newstaffs",
        element: <AddNewStaffs />,
      },
      {
        path: "managestaffs",
        element: <ManageStaffs />,
      },
      {
        path: "uploadstaff",
        element: <UploadStaff />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "attendance",
        element: <StaffAttendance />,
      },
      {
        path: "qrcode",
        element: <QRCodePage />,
      },
      {
        path: "birthday-reminders",
        element: <BirthdayReminders />,
      },
      {
        path: "edit-products/:id",
        element: <EditProducts />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/product/product/${params.id}`),
      },
      {
        path: "edit-staffs/:id",
        element: <EditStaffs />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/staff/staff/${params.id}`),
      },
      {
        path: "*", // Catch-all for undefined admin routes
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      <UserRoute>
        <ErrorBoundary>
        <App />
        </ErrorBoundary>
      </UserRoute>
    ),
    children: [
      {
        index: true, // Default route for /admin/dashboard
        element: <Navigate to="overview" />, // Redirect to overview page
      },
      {
        path: "overview",
        element: <UserHome />,
      }
    ],
  },
]);

export default router;
