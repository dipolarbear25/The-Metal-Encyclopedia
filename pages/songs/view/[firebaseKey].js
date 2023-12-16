import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSongDetails } from '../../../api/mergedDataApi';

export default function ViewPlayer() {
  const [songDetails, setsongDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getADetails = () => {
    getSongDetails(firebaseKey).then(setsongDetails);
  };

  useEffect(() => {
    getADetails();
  });

  return (
    <>
      <div className="viewTxt">
        <h5>
          song name: {songDetails.title}
          <br /> <br /> lyrics: {songDetails.lyrics}
          <br />
          <br />
          <br />
          <iframe width="560" height="315" src={songDetails.YTLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </h5>
      </div>
    </>
  );
}
