import React, { useState } from "react";
import data from "./data/data.json";
import Anecdotes from "./components/Anecdotes";
import AnecdoteWithMostVotes from "./components/AnecdoteWithMostVotes";

const App = () => {
  const anecdotes = data.anecdotes;
  const randomSelection = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(randomSelection);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  let maxVotes = Math.max(...votes);
  let topAnecdoteId = votes.indexOf(maxVotes);

  const handleNextAnecdote = () => {
    setSelected(randomSelection);
  };
  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <Anecdotes
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        handleNextAnecdote={handleNextAnecdote}
        handleVote={handleVote}
      />

      <AnecdoteWithMostVotes
        anecdote={anecdotes[topAnecdoteId]}
        votes={votes[topAnecdoteId]}
      />
    </div>
  );
};
export default App;
