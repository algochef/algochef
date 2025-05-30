import { Router } from "express";
import type { Request, Response } from "express";



export const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "hello"
    });
})
