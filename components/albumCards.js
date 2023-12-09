/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import Image from 'next/image';
import { deleteAlbumSongs } from '../api/mergedDataApi';

function AlbumCard({ Obj, onUpdate }) {
  const deleteThisAlbum = () => {
    if (window.confirm(`Would you like to delete ${Obj.albumTitle}?`)) {
      deleteAlbumSongs(Obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <img src={Obj.albumLogo} alt="Album Cover" width="200" height="180" />
        <Card.Title>Album name: {Obj.albumTitle}</Card.Title>
        <p className="card-text bold">Release Date: {Obj.albumReleaseDate}</p>
        <p>By: {Obj.bandName}</p>
        <Link href={`/songs/${Obj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/albums/edit/${Obj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAlbum} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AlbumCard.propTypes = {
  Obj: PropTypes.shape({
    id: PropTypes.number,
    albumLogo: PropTypes.string,
    albumReleaseDate: PropTypes.string,
    albumTitle: PropTypes.string,
    bandName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AlbumCard;
