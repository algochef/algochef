import { Hono } from "hono";
import { getAuthHeader } from "../controllers/middleware";
import { getProfile } from "../controllers/profile/getProfile";
import { postAddAHandle } from "../controllers/profile/postAddHandle";
import { getVerifyHandle } from "../controllers/profile/getVerifyHandle";
import { getSubmissionGraph } from "../controllers/profile/getSubmissionGraph";

const profileRoutes = new Hono();

profileRoutes.get("/profile/submission-graph", getSubmissionGraph);
profileRoutes.get("/profile/:username", getProfile);
profileRoutes.post("/profile/add-handle", getAuthHeader, postAddAHandle);
profileRoutes.get("/profile/verify/:username", getAuthHeader, getVerifyHandle);

export default profileRoutes;
