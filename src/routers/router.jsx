import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import DashboardLayout from "../dashboard/DashboardLayout";
import ManageProducts from "../dashboard/ManageProducts";
import EditProducts from "../dashboard/EditProducts";
import EditStaffs from "../dashboard/EditStaffs";
import UploadProduct from "../dashboard/UploadProduct";
import AddNewStaffs from "../dashboard/AddNewStaffs";
import ManageStaffs from "../dashboard/ManageStaffs";
import SingleProduct from "../shop/SingleProduct";
import Signup from "../components/Signup";
import Overview from "../pages/OverviewPage";
import Login from "../components/Login";
import AdminRoute from "../PrivateRoute/AdminRoute";
import Logout from "../components/Logout";
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
        loader: async ({ params }) =>
          fetch(`http://localhost:3000/product/product/${params.id}`),
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout/>,
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
        path: "manage",
        element: <ManageProducts />,
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
        element: <QRCodePage />
      },
      {
        path: "birthday-reminders",
        element: <BirthdayReminders />
      },
      {
        path: "edit-products/:id",
        element: <EditProducts />,
        loader: async ({ params }) =>
          fetch(`http://localhost:3000/product/product/${params.id}`),
      },
      {
        path: "edit-staffs/:id",
        element: <EditStaffs />,
        loader: async ({ params }) =>
          fetch(`http://localhost:3000/staff/staff/${params.id}`),
      },
      {
        path: "*", // Catch-all for undefined admin routes
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
