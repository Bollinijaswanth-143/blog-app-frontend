import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/signup', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={10}>
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} required/>
                    <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} required/>
                    <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} required/>
                    <Button type="submit" variant="contained" color="primary" fullWidth>SignUp</Button>
                </form>
            </Box>
            <Divider sx={{ my: 2, borderColor: 'grey.300' }} />
            <Button onClick={() => navigate('/login')} variant="outlined" color="primary" fullWidth>LogIn</Button>
        </Container>
    );
};

export default Signup;
