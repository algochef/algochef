import { Platform } from "@repo/types/contest"
import type { Context } from "hono"
import { z } from "zod"
import { generateSubmissionGraph } from "../../utils/profile-details/generate-submission-graph";



export const getSubmissionGraph = async (c: Context) => {
    const schema = z.object({
        handle: z.string().nonempty(),
        platform: z.nativeEnum(Platform),
        duration: z.string()
    });

    const res = schema.safeParse({
        handle: c.req.query('handle'),
        platform: c.req.query('platform'),
        duration: c.req.query('duration'),
    });

    if (!res.success) {
        return c.json({
            message: "Failed to validate inputs!"
        }, 403);
    }

    const submissions = await generateSubmissionGraph(res.data.handle, res.data.platform, res.data.duration);

    return c.json({
        result: submissions
    })
}