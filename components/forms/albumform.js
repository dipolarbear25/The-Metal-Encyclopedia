import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createAlbum, updateAlbum, getAlbum } from '../../API/albumAPI';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  Albumtitle: '',
  Albumlogo: '',
  Bandname: '',
  Albumreleasedate: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [, setPlayers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getAlbum(user.uid).then(setPlayers);
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
          <Form.Label>first name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player first name"
            name="Albumtitle"
            value={formInput.Albumtitle}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player last name"
            name="Albumlogo"
            value={formInput.Albumlogo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Bandname</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter player Bandname"
            name="Bandname"
            value={formInput.Bandname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Albumreleasedate</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player Albumreleasedate"
            name="Albumreleasedate"
            value={formInput.Albumreleasedate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update player' : 'Submit player'}
        </Button>
      </Form>
    </>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    image: PropTypes.string,
    last_name: PropTypes.string,
    weight: PropTypes.string,
    height: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: intialState,
};

export default PlayerForm;
