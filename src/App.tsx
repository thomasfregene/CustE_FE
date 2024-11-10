import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login/Login";
import Token from "./Pages/Login/Token";
import Dashboard from "./Pages/Dashboard";
import Organization from "./Pages/Organization/organization";
import Product from "./Pages/Product/Product";
import Customer from "./Pages/Customers/Customer";
import Users from "./Pages/Users/Users";
import ViewUser from "./Pages/Users/ViewUser";
import ViewOrganization from "./Pages/Organization/ViewOrganization";
import PrivateRoute from "./Pages/common/PrivateRoute";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/token" element={<Token />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization" element={<Organization />} />
          <Route
            path="/organization/:tenantId"
            element={<ViewOrganization />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<ViewUser />} />
          <Route path="/product" element={<Product />} />
          <Route path="/customers" element={<Customer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
