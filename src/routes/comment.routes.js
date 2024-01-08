import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").post(addComment);
router.route("/:videoId").get(getVideoComments);
router.route("/c/:commentId").patch(updateComment);
router.route("/c/:commentId").delete(deleteComment);

export default router;
