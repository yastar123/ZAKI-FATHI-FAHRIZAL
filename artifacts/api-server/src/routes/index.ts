import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import projectImagesRouter from "./project-images";
import setupDbRouter from "./setup-db";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/projects", projectsRouter);
router.use("/project-images", projectImagesRouter);
router.use("/setup-db", setupDbRouter);

export default router;
