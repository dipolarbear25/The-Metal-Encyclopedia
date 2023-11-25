/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAlbum } from '../api/albumApi';
import { useAuth } from '../utils/context/authContext';
import AlbumCard from '../components/albumCards';

function Home() {
  const [Album, setAlbum] = useState([]);

  const { user } = useAuth();

  const getAllTheAlbum = () => {
    getAlbum(user.uid).then(setAlbum);
  };

  useEffect(() => {
    getAllTheAlbum();
  }, []);

  console.warn(Album);

  return (
    <div className="text-center my-4">
      <h1>
        Welcome, {user.displayName}!
      </h1>
      <div>
        <Link href="/" passHref>
          <Button>Add an album</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {Album.map((album) => (
            <AlbumCard key={album.firebaseKey} playerObj={album} onUpdate={getAllTheAlbum} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
