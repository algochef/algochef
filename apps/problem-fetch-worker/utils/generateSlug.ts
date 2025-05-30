
export const getTitleSlug = (
  platform: string,
  title: string,
  problemCode: string
): string => {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return `${platform.toLowerCase()}-${cleanTitle}-${problemCode}`;
};