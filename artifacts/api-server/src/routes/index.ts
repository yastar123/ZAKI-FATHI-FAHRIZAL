import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import projectImagesRouter from "./project-images";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/projects", projectsRouter);
router.use("/project-images", projectImagesRouter);

export default router;
