import { prismaClient } from "@repo/db/client";
import { SheetTheme } from "@repo/types/problem";
import type { Context } from "hono";
import { z } from "zod";
import { createSlug } from "../../utils/create-slug";

export const postAddSheet = async (c: Context) => {
  // TODO: Add logic to create unique slug
  const sheetSchema = z.object({
    title: z.string().nonempty("Sheet title can't be empty!"),
    description: z.string().optional(),
    theme: z
      .nativeEnum(SheetTheme)
      .describe("Invalid theme selected!")
      .optional()
      .default(SheetTheme.EMERALD),
    sections: z.array(
      z.object({
        title: z.string().nonempty("Section title can't be empty!"),
        problems: z.array(
          z.object({
            problemId: z.number(),
            order: z.number(),
          }),
        ),
        order: z.number(),
      }),
    ),
  });
  const user = c.get("user");
  if (!user || !user.id) {
    return c.json(
      {
        message: "Unauthorized!",
      },
      401,
    );
  }
  const res = sheetSchema.safeParse(await c.req.json());
  if (!res.success) {
    c.status(403);
    return c.json({
      message: "Validation Failed!",
    });
  }
  await prismaClient.sheet.create({
    data: {
      title: res.data.title,
      description: res.data.description,
      slug: createSlug(res.data.title),
      theme: res.data.theme,
      createdBy: {
        connect: {
          id: user.id,
        },
      },
      section: {
        create: res.data.sections.map((sec) => ({
          order: sec.order,
          title: sec.title,
          problems: {
            create: sec.problems.map((prob) => ({
              problem: {
                connect: {
                  id: prob.problemId,
                },
              },
            })),
          },
        })),
      },
    },
  });
  return c.json({
    res: res.data,
  });
};
