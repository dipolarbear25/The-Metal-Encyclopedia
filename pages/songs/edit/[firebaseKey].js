import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSong } from '../../../api/songApi';
import SongForm from '../../../components/forms/songform';

export default function EditAlbum() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSong(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<SongForm obj={editItem} />);
}
