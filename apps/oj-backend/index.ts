import { Hono } from "hono";
import { cors } from "hono/cors";
import problemRoutes from "./routes/problems";
import { config } from "dotenv";

config({path: './../../.env'})

const PORT = process.env.OJ_BACKEND_PORT || 3001;
export const app = new Hono();

app.use(cors());
app.route('/api/v1/', problemRoutes);


if (import.meta.main) {
    Bun.serve({
        port: PORT,
        fetch: app.fetch
    });
    console.log("Started server at " + PORT)
}