import React from "react";

const Anecdote = ({ anecdote, handleButtonVote, voteCount }) => {
  return (
    <>
      <li>
        {anecdote.content} {<br />}has {voteCount} votes
        <button onClick={handleButtonVote} value={anecdote.id}>
          vote
        </button>
      </li>
    </>
  );
};

export default Anecdote;
