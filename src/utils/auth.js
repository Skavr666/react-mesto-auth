function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'))
}

export const BASE_URL = "https://auth.nomoreparties.co";

export function handleRegistration({email, password}) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => handleResponse(res));
}

export function handleLogIn({email, password}) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => handleResponse(res));
}

export function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => handleResponse(res));
}