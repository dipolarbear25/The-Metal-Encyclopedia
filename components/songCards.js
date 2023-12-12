/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSong } from '../api/songApi';

function SongCard({ Obj, onUpdate }) {
  const deleteThisSong = () => {
    if (window.confirm(`Would you like to delete ${Obj.title}?`)) {
      deleteSong(Obj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Card.Header>{Obj.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {Obj.lyrics}
          </p>
          <Link href={`/songs/view/${Obj.firebaseKey}`} passHref>
            <Button variant="info">VIEW</Button>
          </Link>
          <Link href={`/songs/edit/${Obj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisSong} className="m-2">
            DELETE
          </Button>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

SongCard.propTypes = {
  Obj: PropTypes.shape({
    albumid: PropTypes.string,
    lyrics: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SongCard;
