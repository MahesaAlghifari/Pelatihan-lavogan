export function omit<
  T extends object,
  K extends keyof T
>(
  object: T,
  keys: K[]
): Omit<T, K> {
  const clone = {
    ...object,
  };

  keys.forEach((key) => {
    delete clone[key];
  });

  return clone;
}

export function pick<
  T extends object,
  K extends keyof T
>(
  object: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  keys.forEach((key) => {
    result[key] = object[key];
  });

  return result;
}

export function isEmpty(
  object: object
): boolean {
  return Object.keys(object)
    .length === 0;
}