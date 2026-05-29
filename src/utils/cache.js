const CACHE_PREFIX = "media-cache:";
const MAX_AGE = 1000 * 60 * 60;

const makeCacheKey = (key) =>
  `${CACHE_PREFIX}${key}`;

const parseEntry = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const clearExpiredCache = () => {
  const now = Date.now();

  Object.keys(localStorage).forEach(
    (storageKey) => {
      if (
        !storageKey.startsWith(
          CACHE_PREFIX
        )
      ) {
        return;
      }

      const raw =
        localStorage.getItem(storageKey);

      const parsed = parseEntry(raw);

      if (
        !parsed ||
        now - parsed.timestamp >
          MAX_AGE
      ) {
        localStorage.removeItem(storageKey);
      }
    }
  );
};

const evictOldestCacheEntries = (
  count = 3
) => {
  const cacheEntries = Object.keys(
    localStorage
  )
    .filter((storageKey) =>
      storageKey.startsWith(
        CACHE_PREFIX
      )
    )
    .map((storageKey) => {
      const raw =
        localStorage.getItem(storageKey);
      const parsed = parseEntry(raw);

      return {
        storageKey,
        timestamp:
          parsed?.timestamp ?? 0,
      };
    })
    .sort(
      (a, b) =>
        a.timestamp - b.timestamp
    );

  cacheEntries
    .slice(0, count)
    .forEach((entry) => {
      localStorage.removeItem(
        entry.storageKey
      );
    });
};

export const getCachedData = (key) => {
  const storageKey = makeCacheKey(key);
  const cached =
    localStorage.getItem(storageKey);

  if (!cached) return null;

  const parsed = parseEntry(cached);

  if (!parsed) {
    localStorage.removeItem(storageKey);
    return null;
  }

  const now = Date.now();

  if (
    now - parsed.timestamp > MAX_AGE
  ) {
    localStorage.removeItem(storageKey);
    return null;
  }

  return parsed.data;
};

export const setCachedData = (
  key,
  data
) => {
  const storageKey = makeCacheKey(key);
  const value = JSON.stringify({
    data,
    timestamp: Date.now(),
  });

  try {
    localStorage.setItem(
      storageKey,
      value
    );
  } catch {
    clearExpiredCache();
    evictOldestCacheEntries(5);

    try {
      localStorage.setItem(
        storageKey,
        value
      );
    } catch {
      // Keep app responsive if cache cannot be persisted.
    }
  }
};
