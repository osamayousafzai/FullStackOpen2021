import React, { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleOnClickGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleOnClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleOnclickBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button onClick={handleOnClickGood} text="Good" />
      <Button onClick={handleOnClickNeutral} text="Neutral" />
      <Button onClick={handleOnclickBad} text="Bad" />

      <h1>Statistics</h1>
      <Statistics text="Good" good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
