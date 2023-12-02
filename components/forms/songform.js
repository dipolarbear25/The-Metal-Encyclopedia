import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSong, updateSong, createSong } from '../../api/songApi';

const intialState = {
  title: '',
  lyrics: '',
};

function SongForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [, setSong] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getSong(user.uid).then(setSong);
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
      updateSong(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSong(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateSong(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Song Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the song title."
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Lyrics</Form.Label>
          <Form.Control
            type="url"
            placeholder="Please paste the lyrics here"
            name="lyrics"
            value={formInput.lyrics}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Song' : 'Submit Song'}
        </Button>
      </Form>
    </>
  );
}

SongForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    lyrics: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SongForm.defaultProps = {
  obj: intialState,
};

export default SongForm;
