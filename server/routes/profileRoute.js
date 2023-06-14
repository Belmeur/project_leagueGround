import express from 'express';
import { getProfileResponder, updateProfileResponder } from '../responders/profileResponder.js';

const router = express.Router();

export const getProfile = router.get("/:userName", getProfileResponder);

export const updateProfile = router.post("/:userName", updateProfileResponder)

export default router;