import express from 'express';
import { getPosts, addPost, getPostById } from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.get('/:id', getPostById);

export default router;