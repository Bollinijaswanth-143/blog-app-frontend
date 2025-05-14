import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, CardMedia, Chip, Stack } from '@mui/material';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getToken } from '../utils/auth';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchMyBlogs = async () => {
        try {
            const res = await axios.get('/blogs/my', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`/blogs/${id}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            fetchMyBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <Box mt={4}>
                    <Typography variant="h4" gutterBottom>My Blogs</Typography>
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
                                    <CardActions>
                                        <Button onClick={() => navigate(`/edit/${blog._id}`)} size="small" variant="contained" color="primary">Edit</Button>
                                        <Button onClick={() => deleteBlog(blog._id)} size="small" variant="outlined" color="error">Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default MyBlogs;
