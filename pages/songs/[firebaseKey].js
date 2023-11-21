/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAlbumDetails } from '../../API/albumAPI';

export default function ViewAlbum() {
  const [, setAlbumDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getADetails = () => {
    getAlbumDetails(firebaseKey).then(setAlbumDetails);
  };

  useEffect(() => {
    getADetails();
  });

  return (
    <>
      <div className="viewTxt">
        {/* <h5>
          Song name: {AlbumDetails.first_name} {AlbumDetails.last_name}
          <br /> position: {AlbumDetails.position}
        </h5>
        <h5>Height: {AlbumDetails.height}</h5>
        <h5>weight: {AlbumDetails.weight}</h5> */}
      </div>
    </>
  );
}
