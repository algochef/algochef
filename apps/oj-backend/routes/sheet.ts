import { Hono } from "hono";
import { getSheets, getSheetsSections, postAddSheet } from "../controllers/sheetController";
import { setUserAuthHeader, getAuthHeader } from "../controllers/middleware";


const sheetRoutes = new Hono();

sheetRoutes.get('/sheets', getSheets);
sheetRoutes.get('/sheet', setUserAuthHeader, getSheetsSections);
sheetRoutes.post('/add-sheet', getAuthHeader, postAddSheet);


export default sheetRoutes;