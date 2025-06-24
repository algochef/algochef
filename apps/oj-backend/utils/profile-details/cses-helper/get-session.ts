import * as cheerio from "cheerio";
// import { config } from "dotenv";

// // TODO: Remove this after dealing to verification
// config({ path: './../../.env' })

const CSESUSER = process.env.CSESUSER;
const CSESPASS = process.env.CSESPASS;


export const getCSESSession = async () => {
    try {
        const loginPageRes = await fetch("https://cses.fi/login");
        const cookieHeader = loginPageRes.headers.get("set-cookie");
        const initialSession = cookieHeader?.split(";")[0];
        const $ = cheerio.load(await loginPageRes.text());
        const csrfToken = $('input[name="csrf_token"]').attr("value");
        if (!initialSession || !csrfToken) {
            console.error("Failed to extract initial session or CSRF token.");
            return null;
        }
        const formData = new URLSearchParams();
        formData.append("csrf_token", csrfToken || "");
        formData.append("nick", CSESUSER || "");
        formData.append("pass", CSESPASS || "");
        const newRes = await fetch("https://cses.fi/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": initialSession
            },
            redirect: "manual",
            body: formData.toString(),
        });
        if (newRes.status !== 302 && newRes.status !== 200) {
            console.error("Failed to login", newRes.status);
            return null;
        }
        const status = newRes.status;
        const location = newRes.headers.get('location');
        if (status === 302 && location === "/") {
            console.log("Login successful — using initial session");
            return initialSession;
        }
        return null;
    } catch (err) {
        console.error("Error during login:", err);
        return null;
    }
};