import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
// 写函数不要污染传入的对象
export const clearObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    // 0
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};