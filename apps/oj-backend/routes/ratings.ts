import { Hono } from "hono";
import { getRatingHistory } from "../controllers/ratings/ratingController";

const ratingRoutes = new Hono();

ratingRoutes.get("/ratings/:platform/:handle", getRatingHistory);

export default ratingRoutes;
