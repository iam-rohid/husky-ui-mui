import { useEffect, useState } from "react";

function useLocalstorage<T>(
  initValue: T,
  key: string
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initValue);

  useEffect(() => {
    if (typeof window !== undefined) {
      const lsValue = localStorage.getItem(key);
      if (lsValue) {
        setValue(JSON.parse(lsValue) as T);
      } else {
        localStorage.setItem(key, JSON.stringify(initValue));
        setValue(initValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, changeValue];
}

export default useLocalstorage;
