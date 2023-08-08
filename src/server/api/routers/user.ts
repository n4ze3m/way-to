import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

    getSettingsAccessToken: publicProcedure.query(async ({ctx})=> {
        const user = ctx.user;
        const prisma = ctx.prisma;

        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
            });
        }


        const userInfo = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });



        if (!userInfo) {
            throw new TRPCError({
                code: "NOT_FOUND",
            });
        }

        return userInfo.access_token;
    })
});
