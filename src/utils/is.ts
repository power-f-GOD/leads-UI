export const isNumber = (subject: any) => {
  if (typeof subject === 'string' && subject.trim() === '') return false;

  return typeof Number(subject) === 'number' && !isNaN(subject);
};

export const isObject = (subject: any) => {
  if (typeof subject === 'object' && !!subject && !Array.isArray(subject)) {
    return true;
  }

  return false;
};

export const isEmptyObject = <T = any>(subject: Record<string, T>) => {
  if (!isObject(subject)) {
    throw Error(
      `Subject, ${subject}, is not an object. Function expects an object as param.`
    );
  }

  let count = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _key in subject) {
    count++;
    if (count) return false;
  }

  return true;
};

export const isDefined = <T>(value: T) => {
  return value !== undefined && value !== null;
};
