import { Hono } from "hono";

import { setUserAuthHeader, getAuthHeader } from "../controllers/middleware";
import { getSheets } from "../controllers/sheet/getSheets";
import { getSheetsSections } from "../controllers/sheet/getSheetSections";
import { postAddSheet } from "../controllers/sheet/postAddSheet";

const sheetRoutes = new Hono();

sheetRoutes.get("/sheets", getSheets);
sheetRoutes.get("/sheet", setUserAuthHeader, getSheetsSections);
sheetRoutes.post("/add-sheet", getAuthHeader, postAddSheet);

export default sheetRoutes;
