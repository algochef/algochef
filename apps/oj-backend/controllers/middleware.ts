import type { Context, Next } from "hono";
import { jwtVerify} from "jose";


const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)

export const getAuthHeader = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({
            message: 'Unauthorized!'
        }, 401)
    }
    const token = authHeader.slice(7);
    try {
        const { payload } = await jwtVerify(token, secret);
        c.set('user', payload);
        await next();
    }
    catch (err) {
        return c.json({ message: 'Invalid or expired token!' }, 403)
    }
}


export const setUserAuthHeader = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        await next();
        return;
    }
    const token = authHeader.slice(7);
    try {
        const { payload } = await jwtVerify(token, secret);
        c.set('user', payload);
        console.log(payload);
    }
    catch (err) {
        
    }
    await next();
}