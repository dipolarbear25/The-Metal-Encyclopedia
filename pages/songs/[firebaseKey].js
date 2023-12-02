import { React, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import SongCard from '../../components/songCards';
import { getAlbumDetails } from '../../api/albumApi';

function ViewAlbumSongs() {
  const [albumDetails, setalbumDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getADetails = () => {
    getAlbumDetails(firebaseKey).then(setalbumDetails);
  };

  useEffect(() => {
    getADetails();
  }, []);

  return (
    <div className="text-center my-4">
      <div>
        <Link href="/songs/new" passHref>
          <Button>Add a song</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {albumDetails.song?.map((album) => (
            <SongCard key={album.firebaseKey} Obj={album} onUpdate={getADetails} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumSongs;
