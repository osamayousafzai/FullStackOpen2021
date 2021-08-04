import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <Statistic text="Good" value={good} />
            </tr>
            <tr>
              <Statistic text="Neutral" value={neutral} />
            </tr>
            <tr>
              {" "}
              <Statistic text="Bad" value={bad} />
            </tr>
            <tr>
              <Statistic text="All" value={all} />
            </tr>
            <tr>
              <Statistic text="Average" value={average} />
            </tr>
            <tr>
              <Statistic text="Positive" value={positive + " %"} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return <p>No Feedback Given</p>;
};

export default Statistics;
