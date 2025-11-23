export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Split accented characters into base char + diacritic
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[đĐ]/g, "d") // Handle special Vietnamese d/D
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}
