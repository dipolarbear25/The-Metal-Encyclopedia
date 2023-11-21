import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSong = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team.json?orderBy="uid"&equalTo="${uid}"`, {
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
const deleteSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team/${firebaseKey}.json`, {
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
const getSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team/${firebaseKey}.json`, {
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
const createSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team.json`, {
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
const updateSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team/${payload.firebaseKey}.json`, {
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
  const player = await getSingleSong(firebaseKey);

  return { ...player };
};

export {
  getSong,
  createSong,
  deleteSong,
  getSingleSong,
  updateSong,
  getSongDetails,
};
