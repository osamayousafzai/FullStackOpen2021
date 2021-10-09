import React from "react";
import { connect } from "react-redux";
import { filter } from "../actions";

const Filter = (props) => {
  const handleChange = (e) => {
    const text = e.target.value;
    props.filter(text);
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <>
      <h2>Filter</h2>
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  filter,
};

export default connect(null, mapDispatchToProps)(Filter);
