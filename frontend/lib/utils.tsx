export const addToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null
  }
  
  export const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
  };