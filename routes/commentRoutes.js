import express from "express"
import isAuthenticated from "../middlewares/auth.js"
import { addComment, deleteComment, getAllComments, updateComment } from "../controllers/commentController.js"
let router = express.Router()

router.route("/addComment/:id").post(isAuthenticated, addComment)
router.route("/getComments/:id").get(getAllComments)
router.route("/deleteComment/:id").delete(isAuthenticated, deleteComment)
router.route("/updateComment/:id").put(isAuthenticated, updateComment)

export default router