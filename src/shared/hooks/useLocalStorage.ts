import { useCallback, useState } from "react";

import { localStorageService } from "@/shared/lib/browser/storage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    return (
      localStorageService.get<T>(key) ??
      initialValue
    );
  });

  const setStorageValue = useCallback(
    (newValue: T) => {
      setValue(newValue);

      localStorageService.set(key, newValue);
    },
    [key]
  );

  const remove = useCallback(() => {
    localStorageService.remove(key);

    setValue(initialValue);
  }, [key, initialValue]);

  return {
    value,
    setValue: setStorageValue,
    remove,
  };
}