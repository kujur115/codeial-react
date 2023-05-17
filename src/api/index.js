// import { LOCALSTORAGE_TOKEN_KEY, API_URLS } from '../utils';

// const customFetch = async (url, { body, ...customConfig }) => {
//   const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

//   const headers = {
//     'content-type': 'application/json',
//     Accept: 'application/json',
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const config = {
//     ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     },
//   };

//   if (body) {
//     config.body = JSON.stringify(body);
//   }

//   try {
//     const response = await fetch(url, config);
//     const data = await response.json();

//     if (data.success) {
//       return {
//         data: data.data,
//         success: true,
//       };
//     }
//     throw new Error(data.message);
//   } catch (error) {
//     console.log('error', error);
//     return {
//       message: error.message,
//       success: false,
//     };
//   }
// };

// export const getPosts = (page = 1, limit = 5) => {
//   // fetch();

//   return customFetch(API_URLS.posts(page, limit), { method: 'GET' });
// };

import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
      // 'Access-Control-Allow-Credentials': 'true',
    },
  };

  if (body) {
    // config.body = getFormBody(body);
    config.body = JSON.stringify(body);
  }
  console.log('config', config);
  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
    // mode: 'no-cors',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
    // mode: 'no-cors',
  });
};

export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
    // mode: 'no-cors',
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
    // mode: 'no-cors',
  });
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
    // mode: 'no-cors',
  });
};

export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
    // mode: 'no-cors',
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
    // mode: 'no-cors',
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
    // mode: 'no-cors',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
    // mode: 'no-cors',
  });
};

export const createComment = async (content, postId) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id: postId,
      content,
    },
    // mode: 'no-cors',
  });
};

export const toggleLike = (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: 'POST',
    // mode: 'no-cors',
  });
};

export const searchUsers = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: 'GET',
    // mode: 'no-cors',
  });
};
