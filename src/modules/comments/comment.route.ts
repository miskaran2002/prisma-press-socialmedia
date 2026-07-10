import { Router } from "express";
import { commentController } from "./coment.controller";
import { auth } from "../../mddlewires/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/",
    auth(Role.USER, Role.ADMIN, Role.AUTHOR),
    commentController.createComment);

router.get("/authors/:authorId", commentController.getCommentByCommentId);


router.get(
    "/:commentId",
    commentController.getCommentByCommentId

);

router.patch(
    "/:commentId",
    auth(Role.USER, Role.ADMIN, Role.AUTHOR),
    commentController.updateComment

)

router.delete("/:commentId",
    auth(Role.USER, Role.ADMIN, Role.AUTHOR),
    commentController.deleteComment);

router.put(
    "/:commentId/moderate",
    auth(Role.ADMIN),
    commentController.moderateComment
)

export const commentRoutes = router;


