import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>Blog App</Typography>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={() => navigate('/blogs')}>Blogs</Button>
              <Button color="inherit" onClick={() => navigate('/create')}>Create</Button>
              <Button color="inherit" onClick={() => navigate('/myblogs')}>My Blogs</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
