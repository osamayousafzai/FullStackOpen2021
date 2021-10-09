import React from "react";
import { connect } from "react-redux";
import { addNewAnecdote, showNotification } from "../actions";

const AnecdoteForm = (props) => {
  const formCreateNewAnecdote = async (e) => {
    e.preventDefault();
    const new_anecdote = e.target.newAnecdote.value;
    e.target.newAnecdote.value = "";
    props.addNewAnecdote(new_anecdote);
    props.showNotification(`You added for "${new_anecdote}"`, 2);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={formCreateNewAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
const mapDispatchToProps = {
  addNewAnecdote,
  showNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
