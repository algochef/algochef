import { prismaClient } from "@repo/db/client";
import type { Context } from "hono";

export const getSheets = async (c: Context) => {
  const sheets = await prismaClient.sheet.findMany();

  return c.json({
    sheets,
  });
};
