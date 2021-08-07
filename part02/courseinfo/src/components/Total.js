import React from "react";

const Total = ({ parts }) => {

  let sum2 = parts.reduce( (acc, cur) => { return acc + cur.exercises}, 0); 

  return (
    <div>
      <h3>Total of {sum2} exercises</h3>
    </div>);
};

export default Total;