import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Anecdote from "./Anecdote";
import { addVote, showNotification } from "../actions";

const AnecdoteList = (props) => {
  const handleButtonVote = (e) => {
    const id = e.target.value;
    const votedAnecdote = props.anecdotes.filter((i) => i.id === id);
    props.addVote(votedAnecdote);
    props.showNotification(`You voted for "${votedAnecdote[0].content}"`, 2);
  };

  const anecdotesSorted = _.orderBy(props.anecdotes, ["votes"], ["desc"]);

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotesSorted.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleButtonVote={handleButtonVote}
            voteCount={anecdote.votes}
          />
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  };
};

const mapDispatchToProps = {
  addVote,
  showNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
