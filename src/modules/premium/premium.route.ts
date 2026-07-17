import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { premiumController } from "./premium.controller";
import { auth } from "../../mddlewires/auth";
import { subscriptionGuard } from "../../mddlewires/premiumGuard";

const router = Router()

router.get(
    "/",
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    subscriptionGuard(),
    premiumController.getPremiumContent
)

export const premiumRoutes = router