import { useCallback, useState } from "react";

import { sessionStorageService } from "@/shared/lib/browser/storage";

export function useSessionStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    return (
      sessionStorageService.get<T>(key) ??
      initialValue
    );
  });

  const setStorageValue = useCallback(
    (newValue: T) => {
      setValue(newValue);

      sessionStorageService.set(key, newValue);
    },
    [key]
  );

  const remove = useCallback(() => {
    sessionStorageService.remove(key);

    setValue(initialValue);
  }, [key, initialValue]);

  return {
    value,
    setValue: setStorageValue,
    remove,
  };
}