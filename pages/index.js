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

  console.warn(Album);

  useEffect(() => {
    getAllTheAlbum();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>
        Welcome, {user.displayName}!
      </h1>
      <div>
        <Link href="/albums/new" passHref>
          <Button>Add an album</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {Album.map((album) => (
            <AlbumCard key={album.firebaseKey} Obj={album} onUpdate={getAllTheAlbum} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
