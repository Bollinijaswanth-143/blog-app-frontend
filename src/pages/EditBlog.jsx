import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import Navbar from '../components/Navbar';
import { getToken } from '../utils/auth';

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', category: '', content: '', image: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/blogs/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((res) => setForm(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Error fetching blog'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/blogs/${id}`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      navigate('/myblogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4">Edit Blog</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField label="Title" name="title" value={form.title} fullWidth margin="normal" onChange={handleChange} required/>
            <TextField label="Category" name="category" value={form.category} fullWidth margin="normal" onChange={handleChange} required/>
            <TextField label="Content" name="content" value={form.content} fullWidth multiline rows={4} margin="normal" onChange={handleChange} required/>
            <TextField label="Image URL" name="image" value={form.image} fullWidth margin="normal" onChange={handleChange} required/>
            <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default EditBlog;
