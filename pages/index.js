import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

  return (
    <div className="text-center my-4">
      <h1>
        Hello {user.displayName}!
      </h1>
    </div>
  );
}

export default Home;
