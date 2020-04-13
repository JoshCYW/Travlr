import {
    get as localStorageGet,
    remove as localStorageRemove,
    set as localStorageSet
  } from "local-storage";
  import { Cookies } from "react-cookie";
  
  function isLocalStorageAvailable() {
    try {
      const x = "__storage_test__";
      const isAvailable = localStorageSet(x, x);
      localStorageRemove(x);
      return isAvailable;
    } catch (e) {
      return false;
    }
  }
  
  const useLocalStorage = isLocalStorageAvailable();
  const cookies = new Cookies();
  
  function get(key) {
    return useLocalStorage ? localStorageGet(key) : cookies.get(key);
  }
  
  function set(key, value) {
    if (useLocalStorage) {
      return localStorageSet(key, value);
    }
    return cookies.set(key, value);
  }
  
  function remove(key) {
    if (useLocalStorage) {
      return localStorageRemove(key);
    }
    return cookies.remove(key);
  }
  
  export default {
    get,
    set,
    remove
  };
  