import React, { useState, useEffect } from 'react';
import { battle } from '@/utils';
import Card from './Card';
import ProfileList from './ProfileList';
import Loading from './Loading';
import { Link, useSearchParams } from 'react-router-dom';

export default function Results() {
  const [searchParams] = useSearchParams();
  const playerOne = searchParams.get('playerOne');
  const playerTwo = searchParams.get('playerTwo');

  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    battle([playerOne, playerTwo])
      .then((players) => {
        setWinner(players[0]);
        setLoser(players[1]);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.warn('Error fetching results:', error);
        setError('Error fetching data. Try again');
        setLoading(false);
      });
  }, [playerOne, playerTwo]);

  if (loading === true) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </>
  );
}
