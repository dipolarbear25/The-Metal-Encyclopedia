/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import Image from 'next/image';
import { deleteSong } from '../api/songApi';

function SongCard({ Obj, onUpdate }) {
  const deleteThisSong = () => {
    if (window.confirm(`Would you like to delete ${Obj.title}?`)) {
      deleteSong(Obj.firebaseKey).then(() => onUpdate());
    }
  };
  // console.warn(Obj);
  return (
    <Card>
      <Card.Header>{Obj.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {Obj.lyrics}
          </p>
          <Button variant="danger" onClick={deleteThisSong} className="m-2">
            DELETE
          </Button>
          <Link href={`/songs/edit/${Obj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

SongCard.propTypes = {
  Obj: PropTypes.shape({
    albumid: PropTypes.number,
    lyrics: PropTypes.string,
    songid: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SongCard;
