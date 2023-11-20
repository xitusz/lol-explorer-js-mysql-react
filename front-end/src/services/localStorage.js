export const getItemFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setItemToLocalStorage = (key, element) => {
  if (!key) {
    throw new Error("key must be provided");
  }

  if (typeof key !== "string") {
    throw new Error("key must be a string");
  }

  try {
    localStorage.setItem(key, JSON.stringify(element));
  } catch (e) {
    throw new Error("element must be serializable");
  }
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    throw new Error("key must be provided");
  }

  if (typeof key !== "string") {
    throw new Error("key must be a string");
  }

  localStorage.removeItem(key);
};
