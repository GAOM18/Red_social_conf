import express from 'express';
import { updateUserProfilePic } from '../controllers/user.js';

const router = express.Router();

router.put('/profile_pic', updateUserProfilePic);

export default router;