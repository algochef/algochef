import { Hono } from "hono";
import { getCompanyTags, getTopicTags } from "../controllers/tagsController";


const tagRoutes = new Hono();

tagRoutes.get('/companies', getCompanyTags);
tagRoutes.get('/topics', getTopicTags);

export default tagRoutes;