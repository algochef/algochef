import express from "express";
import { router as contestRouter } from "./routes/contestRoutes";

const app = express();

const PORT = process.env.BACKEND_PORT || 3001;

// TODO: Add CORS

app.use(contestRouter);

app.listen(PORT, async () => {
    console.log("Backend running at ", PORT);
})