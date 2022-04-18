const set = (key, value) => {
  if (typeof window !== 'undefined')
    window.localStorage.setItem(key, value);
};
const get = (key) => {
  if (typeof window !== 'undefined')
    return window.localStorage.getItem(key);
};

const remove = (key) => {
  if (typeof window !== 'undefined')
    window.localStorage.removeItem(key);
};

const LocalStorage = {
  set,
  get,
  remove,
};

export default LocalStorage;
