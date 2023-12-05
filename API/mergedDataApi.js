import { deleteAlbum, getSongAlbum } from './albumApi';
import { deleteSong, getSingleSong } from './songApi';

const getSongDetails = async (firebaseKey) => {
  const song = await getSingleSong(firebaseKey);

  return { ...song };
};

const deleteAlbumSongs = (firebaseKey) => new Promise((resolve, reject) => {
  getSongAlbum(firebaseKey).then((albumSongsArray) => {
    const deleteSongPromises = albumSongsArray.map((song) => deleteSong(song.firebaseKey));

    Promise.all(deleteSongPromises).then(() => {
      deleteAlbum(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getSongDetails,
  deleteAlbumSongs,
};
