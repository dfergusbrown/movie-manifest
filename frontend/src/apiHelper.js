const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * @typedef {Object} MediaItem
 * @property {number} id
 * @property {string} upc
 * @property {string} title
 * @property {number} year
 * @property {'movie'|'tv_series'} type
 * @property {'DVD'|'Blu-ray'|'4K'|'Digital'} format
 * @property {?string} poster_url
 * @property {string} added_by
 * @property {string} created_at
 */

/**
 * Internal helper - handles fetch + JSON parsing + error normalization so every exported function doesn't repeat the same boilerplate
 * @param {string} path
 * @param {RequestInit} [options]
 */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Request failed ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export async function getAllMovies() {
  return request("/movies");
}

export async function getOneMovie(id) {
  return request(`/movies/${id}`);
}

export async function addMovie(movie) {
  return request(`/movies`, {
    method: "POST",
    body: JSON.stringify(movie),
  });
}

export async function editMovieData(id, fields) {
  return request(`/movies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });
}

export async function deleteOneMovie(id) {
  return request(`/movies/${id}`, {
    method: "DELETE",
  });
}

export async function lookupByUPC(upc) {
  return request(`/movies/lookup/${upc}`);
}
