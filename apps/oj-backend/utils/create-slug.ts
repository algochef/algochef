import slugify from "slugify"

export const createSlug = (str: string) => {
    return slugify(str, {
        lower: true,
        locale: 'en',
        strict: true
    });
}