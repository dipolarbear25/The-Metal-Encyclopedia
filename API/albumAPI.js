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

const getSongAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Songs.json?orderBy="albumid"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getAlbumDetails = async (albumfirebaseKey) => {
  const album = await getSingleAlbum(albumfirebaseKey);
  const song = await getSongAlbum(albumfirebaseKey);

  return { ...album, song };
};
export {
  getAlbum,
  deleteAlbum,
  createAlbum,
  updateAlbum,
  getAlbumDetails,
  getSingleAlbum,
  getSongAlbum,
};
