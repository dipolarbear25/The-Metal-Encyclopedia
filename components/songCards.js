/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import Image from 'next/image';
import { deleteSong } from '../api/songApi';

function SongCard({ Obj, onUpdate }) {
  // eslint-disable-next-line no-unused-vars
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
            {' '}
            {Obj.lyrics}{' '}
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
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
