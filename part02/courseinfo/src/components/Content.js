import React from "react";
import Part  from './Part'

const Content = ({content}) => {
  return (
    <div>
      {content.map(p => <li key={p.id}><Part  exercises={p.exercises} name={p.name}/></li>)}
    </div>
  );
};

export default Content;