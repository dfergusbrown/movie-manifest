/**
 * Transforms a raw upcitemdb API response into our internal Product shape.
 * Returns null if there's no usable match.
 * @param {*} raw
 * @returns
 */
export function mapUpcItemDbResponse(raw) {
  if (raw?.code !== "OK" || !raw.items?.length) {
    return null;
  }

  const item = raw.items[0]; // later: could add logic to pick the "best" match if total > 1

  return {
    title: item.title ?? "",
    upc: item.upc ?? "",
    brand: item.brand ?? "",
    posterUrl: item.images?.[0] ?? null, // consistent field name regardless of source
    allImages: item.images ?? [],
    source: "upcitemdb",
  };
}
