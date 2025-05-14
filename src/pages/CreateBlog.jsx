import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import Navbar from '../components/Navbar';
import { getToken } from '../utils/auth';

const CreateBlog = () => {
  const [form, setForm] = useState({ title: '', category: '', content: '', image: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/blogs', form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4">Create Blog</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleChange} required/>
            <TextField label="Category" name="category" fullWidth margin="normal" onChange={handleChange} required/>
            <TextField label="Content" name="content" fullWidth multiline rows={4} margin="normal" onChange={handleChange} required/>
            <TextField label="Image URL" name="image" fullWidth margin="normal" onChange={handleChange} required/>
            <Button type="submit" variant="contained" color="primary" fullWidth>Create</Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default CreateBlog;
