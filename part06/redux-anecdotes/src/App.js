import React, { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { initialAnecdotes } from "./actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  );
};

export default App;
