import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAlbum } from '../../../api/albumApi';
import AlbumForm from '../../../components/forms/albumform';

export default function EditAlbum() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAlbum(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<AlbumForm obj={editItem} />);
}
