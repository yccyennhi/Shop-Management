import express from 'express';
import { getPosts, createPost } from '../controllers/post.js';

const router = express.Router();
//http://localhost:5000/posts

router.get('/', getPosts);

router.post('/', createPost);

router.post('/update', updatePost);

export default router;