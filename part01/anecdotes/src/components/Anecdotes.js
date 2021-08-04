import React from "react";
import Button from "./Button";

const Anecdotes = ({ anecdote, votes, handleNextAnecdote, handleVote }) => {
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <h3>Anecdote: </h3>
      {anecdote}
      <br />
      has {votes} votes
      <div>
        <Button onClick={handleNextAnecdote} text="Next Anecdote" />
        <Button onClick={handleVote} text="Vote" />
      </div>
    </div>
  );
};

export default Anecdotes;
