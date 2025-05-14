import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import { getToken } from './utils/auth';

const PrivateRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route
          path="/blogs"
          element={<PrivateRoute><Blogs /></PrivateRoute>}
        />
        <Route
          path="/create"
          element={<PrivateRoute><CreateBlog /></PrivateRoute>}
        />
        <Route
          path="/edit/:id"
          element={<PrivateRoute><EditBlog /></PrivateRoute>}
        />
        <Route
          path="/myblogs"
          element={<PrivateRoute><MyBlogs /></PrivateRoute>}
        />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
