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
        </h5>
      </div>
    </>
  );
}
