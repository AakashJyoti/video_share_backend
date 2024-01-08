import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/c/:channelId").get(getSubscribedChannels);
router.route("/c/:channelId").post(toggleSubscription);
router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router;
