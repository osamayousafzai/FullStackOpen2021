import React from "react";

const AnecdoteWithMostVotes = ({ anecdote, votes }) => {
  if (votes > 0) {
    return (
      <div>
        <h1>Anecdote With Most Votes</h1>
        {anecdote}
        <h3> Votes: {votes}</h3>
      </div>
    );
  }
  return "";
};

export default AnecdoteWithMostVotes;
