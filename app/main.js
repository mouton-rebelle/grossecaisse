/** @jsx hJSX */
import Rx from 'rx';
import Cycle from '@cycle/core';
import {hJSX, makeDOMDriver} from '@cycle/dom';
import {questions} from './data/questions';


const question$ = Rx.Observable.range(0,10);

function intent(DOM)
{
  return {
    gameStarted : DOM.select('#start').events('click').map(ev => true),
    pickAnswer  : DOM.select('.answer').events('click').map(ev => ev.details),
    nextQuestion: DOM.select('#next').events('click').map(ev => 1)

  };
}

function model(actions)
{
  console.log(actions);
  return Rx.Observable.combineLatest(
    actions.gameStarted.startWith(false),
    actions.pickAnswer.startWith(null),
    actions.nextQuestion.startWith(0).scan( (x, y) => x+y),
    ( started, answered, questionId ) => {
      return {
        started,
        answered,
        question: questions[questionId]
      };
    }
  );
}

function view(state)
{
  return state.map(({started, answered, question}) => {
    console.log(question);
    if (!started)
    {
      return <button id="start">start</button>;
    } else {
      return (
        <div>
          <h2>{question.text}</h2>
          <button className="answer">pickAnswer</button>
          <button id="next">next</button>
        </div>);
    }
  });

}

// function main(responses) {
//   let requests = {
//     DOM: responses.DOM.select('.start, .next').events('click').map(ev => 1)
//       .startWith(-1)
//       .scan( (x, y) => {
//         console.log(x, y);
//         return x+y;
//       })
//       .map( v => v > 5 ? -1 : v )
//       .map(counter =>
//         {
//           if (counter>=0)
//           {
//             return (<div>
//               <h2>{counter}</h2>
//               <button className="next" type='button'>next</button>
//             </div>);
//           } else {
//             return <button className="start" type='button'>start</button>;
//           }
//         }
//       )
//   };
//   return requests;
// }

function main({DOM}) {
  return {
    DOM: view(model(intent(DOM)))
  };
}

let drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);