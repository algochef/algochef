import { Hono } from "hono";
import { getLeetcodeRatingHistory } from "../controllers/ratings/leetcodeRatingController";
import { getCodechefRatingHistory } from "../controllers/ratings/codechefRatingController";

const ratingRoutes = new Hono();

ratingRoutes.get("/ratings/leetcode/:handle", getLeetcodeRatingHistory);
ratingRoutes.get("/ratings/codechef/:handle", getCodechefRatingHistory);

export default ratingRoutes;
