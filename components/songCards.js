/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import { Card, CardHeader } from 'react-bootstrap/Card';
import { CardBody } from 'react-bootstrap';
// import Link from 'next/link';
// import Image from 'next/image';
// import { deleteAlbum } from '../api/albumApi';

function SongCard({ Obj }) {
  // const deleteThisSong = () => {
  //   if (window.confirm(`Would you like to delete ${Obj.title}?`)) {
  //     deleteAlbum(Obj.firebaseKey).then(() => onUpdate());
  //   }
  // };

  return (
    <Card>
      <CardHeader>{Obj.title}</CardHeader>
      <CardBody>
        <blockquote className="blockquote mb-0">
          <p> {Obj.lyrics} </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </CardBody>
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
  // onUpdate: PropTypes.func.isRequired,
};

export default SongCard;
