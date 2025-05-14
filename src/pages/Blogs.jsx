import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Box, Grid, Card, CardContent, CardMedia, Chip, Stack } from '@mui/material';
import axios from '../utils/axiosConfig';
import Navbar from '../components/Navbar';
import { getToken } from '../utils/auth';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [filters, setFilters] = useState({ category: '', author: '' });

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/blogs', {
                headers: { Authorization: `Bearer ${getToken()}` },
                params: filters,
            });
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <Container>
                <Box mt={3}>
                    <Typography variant="h4">All Blogs</Typography>
                    <Box display="flex" gap={2} mt={2}>
                        <TextField label="Category" name="category" onChange={handleFilterChange} />
                        <TextField label="Author" name="author" onChange={handleFilterChange} />
                    </Box>
                    <Box mt={4}>
                        <Grid container spacing={4}>
                            {blogs.map((blog) => (
                                <Grid item xs={12} md={6} lg={4} key={blog._id}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {blog.image && (
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={blog.image}
                                                alt={blog.title}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>{blog.title}</Typography>
                                            <Stack direction="row" spacing={1} mb={1}>
                                                <Chip label={blog.category} color="primary" size="small" />
                                                <Chip label={blog.author} color="secondary" size="small" />
                                            </Stack>
                                            <Typography variant="body2" color="textSecondary">
                                                {blog.content.length > 100 ? blog.content.slice(0, 100) + '...' : blog.content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Blogs;
