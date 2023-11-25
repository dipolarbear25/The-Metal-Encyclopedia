/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import Image from 'next/image';
import { deleteAlbum } from '../api/albumApi';

function AlbumCard({ playerObj, onUpdate }) {
  const deleteThisAlbum = () => {
    if (window.confirm(`Would you like to delete ${playerObj.Albumtitle}?`)) {
      deleteAlbum(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  console.warn(playerObj);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <img src={playerObj.Albumlogo} alt="Album Cover" width="200" height="180" />
        <Card.Title>{playerObj.Albumtitle}</Card.Title>
        <p className="card-text bold">Release Date: {playerObj.Albumreleasedate}</p>
        <Link href={`/songs/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/albums/edit/${playerObj.firebaseKey}`} passHref>
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
  playerObj: PropTypes.shape({
    id: PropTypes.number,
    Albumlogo: PropTypes.string,
    Albumreleasedate: PropTypes.string,
    Albumtitle: PropTypes.string,
    Bandname: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AlbumCard;
