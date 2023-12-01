import { React, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getSong } from '../../api/songApi';
import SongCard from '../../components/songCards';
import { useAuth } from '../../utils/context/authContext';

function ViewAlbumSongs() {
  const [albumDetails, setalbumDetails] = useState([]);

  const { user } = useAuth();

  const getADetails = () => {
    getSong(user.uid).then(setalbumDetails);
  };

  useEffect(() => {
    getADetails();
  });

  console.warn(albumDetails);

  return (
    <div className="text-center my-4">
      <div>
        <Link href="/albums/new" passHref>
          <Button>Add an album</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {albumDetails.map((song) => (
            <SongCard key={song.firebaseKey} Obj={song} onUpdate={getADetails} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumSongs;
