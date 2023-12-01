import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSong = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Songs.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Songs/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Songs/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Songs.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Songs/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSongDetails = async (firebaseKey) => {
  const song = await getSingleSong(firebaseKey);

  return { ...song };
};

export {
  getSong,
  createSong,
  deleteSong,
  getSingleSong,
  updateSong,
  getSongDetails,
};
