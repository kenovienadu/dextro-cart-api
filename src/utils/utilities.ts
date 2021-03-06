import { ProductCategory } from "src/interfaces-and-types";

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

export const getUserCartKey = (userId: string) => `CART-${userId}`;

export const generateProductSKU = (title: string, stock: number, category: ProductCategory) => {
  const titlePart = title.slice(0, 3);
  const stockPart = stock;
  const categoryPart = category.slice(0, 3);

  const sku = [titlePart, stockPart, categoryPart].join('/');
  return sku.toUpperCase();
}

export const envIsProd = () => {
  return process.env.NODE_ENV === 'production';
}