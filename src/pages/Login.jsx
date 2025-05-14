import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert,Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { setToken } from '../utils/auth';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', form);
            setToken(res.data.token);
            navigate('/blogs');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={10}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} required/>
                    <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} required/>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                </form>
            </Box>
            <Divider sx={{ my: 2, borderColor: 'grey.300' }} />
            <Button onClick={() => navigate('/signup')} variant="outlined" color="primary" fullWidth>SignUp</Button>
        </Container>
    );
};

export default Login;
