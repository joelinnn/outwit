import React from 'react';

export const CurrentPlayer = ({ turn }) => {
  const player = turn % 2 === 0 ? 'Player 1' : 'Player 2';
  return (
    <div id='currentPlayer'>
      <h3>Current Player:</h3>

    </div>
  );
}