import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const JSONValue = localStorage.getItem(key);

    if (JSONValue) {
      return JSON.parse(JSONValue);
    }

    if (typeof initialValue === "function") {
      return initialValue();
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
