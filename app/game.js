/** @jsx hJSX */

import {hJSX} from '@cycle/dom';

export default function(responses)
{
  console.log(responses);
  let where = responses.props.where;
  return <h2>the game {where}</h2>;
};