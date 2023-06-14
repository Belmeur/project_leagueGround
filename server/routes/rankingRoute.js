import express from 'express';
import {updateRankingResponder} from '../responders/rankingResponder.js';

const router = express.Router();


export const updateRanking = router.get("/", updateRankingResponder);

export default router;