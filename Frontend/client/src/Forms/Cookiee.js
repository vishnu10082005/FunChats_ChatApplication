import Cookies from 'js-cookie';

// Function to set cookies
export const setAuthCookies = (useruid) => {
  Cookies.set('useruid', useruid, { expires: 7 }); 
  Cookies.set('login', true, { expires: 7 });
};

// Function to clear cookies (for logout)
export const clearAuthCookies = () => {
  Cookies.remove('useruid');
  Cookies.remove('login');
};

// Function to get cookies (if needed)
export const getAuthCookies = () => {
  return {
    useruid: Cookies.get('useruid'),
    login: Cookies.get('login'),
  };
};
