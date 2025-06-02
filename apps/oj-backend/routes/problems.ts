import { Hono } from "hono";
import { getProblems, postProblemDetails } from "../controllers/problemController";


const problemRoutes = new Hono();

problemRoutes.get('/problems', getProblems);
problemRoutes.post('/problem-details', postProblemDetails);


export default problemRoutes;