import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createAlbum, updateAlbum, getAlbum } from '../../api/albumApi';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  albumTitle: '',
  albumLogo: '',
  bandName: '',
  albumReleaseDate: '',
};

function AlbumForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [, setAlbum] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getAlbum(user.uid).then(setAlbum);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateAlbum(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAlbum(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAlbum(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Album Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the albums title."
            name="albumTitle"
            value={formInput.albumTitle}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Album cover</Form.Label>
          <Form.Control
            type="url"
            placeholder="Please give a URL of this albums cover"
            name="albumLogo"
            value={formInput.albumLogo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Band name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter band name"
            name="bandName"
            value={formInput.bandName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Album release date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the albums release date"
            name="albumReleaseDate"
            value={formInput.albumReleaseDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Album' : 'Submit Album'}
        </Button>
      </Form>
    </>
  );
}

AlbumForm.propTypes = {
  obj: PropTypes.shape({
    albumTitle: PropTypes.string,
    albumLogo: PropTypes.string,
    bandName: PropTypes.string,
    albumReleaseDate: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AlbumForm.defaultProps = {
  obj: intialState,
};

export default AlbumForm;
