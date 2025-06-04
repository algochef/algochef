import { Hono } from "hono";
import { getProblems, postAddProblem, postProblemDetails } from "../controllers/problemController";


const problemRoutes = new Hono();

problemRoutes.get('/problems', getProblems);
problemRoutes.post('/add-problem', postAddProblem);
problemRoutes.post('/problem-details', postProblemDetails);


export default problemRoutes;