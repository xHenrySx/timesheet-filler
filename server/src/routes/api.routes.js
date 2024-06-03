import { Router } from "express";

const router = Router();
import activitiesRouter from "./activities.routes.js";

router.use("/activities", activitiesRouter);

export default router;