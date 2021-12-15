const { v4: uuidv4 } = require('uuid');

export const generateId = (): string => {
  return uuidv4();
};

export const cleanObject = (data: any) => {
  const copy = { ...data };

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const isEmpty = [null, undefined, ''].includes(value);

    if (isEmpty) {
      delete copy[key];
    }
  });

  return copy;
};

export const CatchAndReturnNull = (returnValueOrError: any) => {
  const isReturnValue = [null, 0, '', []].includes(returnValueOrError);

  if (!isReturnValue) { // If Error Is Passed
    console.log(returnValueOrError?.message || returnValueOrError);
    return null;
  }

  return (error) => {
    console.log(error?.message || error);
    return returnValueOrError;
  }
}