import React, { createContext, useContext, useState } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, ProductPage, NewArrival, CategoryProduct, ProductSingle, Cart, Search, Login } from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";

// Create a context to manage user authentication
const AuthContext = createContext();

// A simple authentication provider
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // You may want to use a more robust authentication check here
  const checkAuthentication = () => isAuthenticated;

  // Function to simulate login
  const login = () => {
    // You would replace this with your actual login logic
    setIsAuthenticated(true);
  };

  // Function to simulate logout
  const logout = () => {
    // You would replace this with your actual logout logic
    setIsAuthenticated(false);
  };

  // Custom hook to access authentication context
  const useAuth = () => {
    return useContext(AuthContext);
  };

  // ProtectedRoute component to conditionally render routes based on authentication
  const ProtectedRoute = ({ element, ...rest }) => {
    const { checkAuthentication } = useAuth();

    return checkAuthentication() ? element : <Navigate to="/login" />;
  };

  // Login page component
  const LoginPage = () => {
    const { login } = useAuth();

    const handleLogin = () => {
      // You would replace this with your actual login logic
      // For now, just simulate a successful login
      login();
    };

    return (
      <div>
        <h2>Login Page</h2>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthentication, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Sidebar />

            <Routes>
              {/* home page route */}
              <Route path="/" element={<Home />} />
              {/* protected routes */}
              <Route path="/src/pages/Products/Products" element={<ProtectedRoute element={<ProductPage />} />} />
              <Route path="/src/pages/NewArrival/NewArrival" element={<ProtectedRoute element={<NewArrival />} />} />
              {/* single product route */}
              <Route path="/product/:id" element={<ProductSingle />} />
              {/* category wise product listing route */}
              <Route path="/category/:category" element={<CategoryProduct />} />
              {/* cart */}
              <Route path="/cart" element={<Cart />} />
              {/* searched products */}
              <Route path="/search/:searchTerm" element={<Search />} />
              {/* login route */}
              <Route path="/login" element={<LoginPage />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
