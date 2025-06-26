import { Hono } from "hono";

import { getProblems } from "../controllers/problem/getProblems";
import { postAddProblem } from "../controllers/problem/postAddProblem";
import { postProblemDetails } from "../controllers/problem/postProblemDetails";

const problemRoutes = new Hono();

problemRoutes.get("/problems", getProblems);
problemRoutes.post("/add-problem", postAddProblem);
problemRoutes.post("/problem-details", postProblemDetails);

export default problemRoutes;
