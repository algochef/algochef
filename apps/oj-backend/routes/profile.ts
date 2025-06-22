import { Hono } from "hono";
import { getAuthHeader } from "../controllers/middleware";
import { getProfile, getVerifyHandle, postAddAHandle } from "../controllers/profileController";


const profileRoutes = new Hono();

profileRoutes.get('/profile/:username', getProfile);
profileRoutes.post('/profile/add-handle', getAuthHeader, postAddAHandle);
profileRoutes.get('/profile/verify/:username', getAuthHeader, getVerifyHandle);



export default profileRoutes;