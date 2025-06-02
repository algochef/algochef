import { Hono } from "hono";
import problemRoutes from "./routes/problems";

const PORT = process.env.OJ_BACKEND_PORT || 3001;
export const app = new Hono();


app.route('/api/v1/', problemRoutes);


if (import.meta.main) {
    Bun.serve({
        port: PORT,
        fetch: app.fetch
    });
    console.log("Started server at " + PORT)
}