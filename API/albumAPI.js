import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAlbum = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Albums.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE Team
const deleteAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Albums/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET SINGLE Team
const getSingleAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Albums/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE Team
const createAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Albums.json`, {
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

// TODO: UPDATE Team
const updateAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Albums/${payload.firebaseKey}.json`, {
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

const getAlbumDetails = async (firebaseKey) => {
  const player = await getSingleAlbum(firebaseKey);

  return { ...player };
};

export {
  getAlbum,
  deleteAlbum,
  createAlbum,
  updateAlbum,
  getAlbumDetails,
  getSingleAlbum,
};
