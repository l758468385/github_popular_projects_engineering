import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PlayerInputProps {
  label: string;
  onSubmit: (username: string) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ label, onSubmit }) => {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          className="input-light"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button className="dark-btn" type="submit" disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default PlayerInput;
