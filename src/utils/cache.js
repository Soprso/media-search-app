export const getCachedData = (
  key
) => {
  const cached =
    localStorage.getItem(key);

  if (!cached) return null;

  const parsed =
    JSON.parse(cached);

  const now = Date.now();

  const MAX_AGE =
    1000 * 60 * 60;

  if (
    now - parsed.timestamp >
    MAX_AGE
  ) {
    localStorage.removeItem(key);
    return null;
  }

  return parsed.data;
};

export const setCachedData = (
  key,
  data
) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
};