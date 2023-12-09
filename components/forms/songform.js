import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateSong, createSong } from '../../api/songApi';
import { getAlbum } from '../../api/albumApi';

const intialState = {
  albumid: '',
  title: '',
  lyrics: '',
};

function SongForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [albums, setAlbums] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getAlbum(user.uid).then(setAlbums);
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
      updateSong(formInput).then(() => router.push(`/songs/${formInput.albumid}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSong(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateSong(patchPayload).then(() => {
          router.push(`/songs/${formInput.albumid}`);
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
            type="text"
            placeholder="Please paste the lyrics here"
            name="lyrics"
            value={formInput.lyrics}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Select
          name="albumid"
          onChange={handleChange}
          value={formInput.albumid}
          required
        >
          <option value="">Select An Album</option>

          {
          albums.map((album) => (
            <option
              key={album.firebaseKey}
              value={album.firebaseKey}
            >
              {album.albumTitle}
            </option>
          ))
        }
        </Form.Select>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Song' : 'Submit Song'}
        </Button>
      </Form>
    </>
  );
}

SongForm.propTypes = {
  obj: PropTypes.shape({
    albumid: PropTypes.string,
    title: PropTypes.string,
    lyrics: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SongForm.defaultProps = {
  obj: intialState,
};

export default SongForm;
