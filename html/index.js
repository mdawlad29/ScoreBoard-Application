// add button dom element
// const incrementEl = document.getElementById("increment");
// const decrementEl = document.getElementById("decrement");
// const matchResultEl = document.getElementById("match-result");
// const matchNameEl = document.getElementById("match_name");
const addMatchEl = document.getElementById("add_another_match");
const resetEl = document.getElementById("reset");
const incrementInput = document.querySelector(".lws-increment");
const decrementInput = document.querySelector(".lws-decrement");
const matchResultEl = document.querySelector(".lws-singleResult");
const matchNameEl = document.querySelector(".lws-matchName");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";

// initial state
const initialState = {
  value: 0,
};

// action creators
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};
const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    const newValue = state.value - action.payload;
    return {
      ...state,
      value: newValue >= 0 ? newValue : 0,
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  matchResultEl.innerText = state.value;
};

// update UI initially
render();

store.subscribe(render);

// Reset Listener
function resetFunction() {
  matchResultEl.innerText = state.value;
}

// Add Another Match
let matchCounter = 2;

incrementInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const enteredValue = parseInt(e.target.value);
    store.dispatch(increment(enteredValue));
    e.target.value = "";
  }
});

decrementInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const enteredValue = parseInt(e.target.value);
    store.dispatch(decrement(enteredValue));
    e.target.value = "";
  }
});

// Your existing addMatch function
function addMatch() {
  const matchContainer = document.querySelector(".match-container");
  const newMatch = matchContainer.firstElementChild.cloneNode(true);
  const matchNameEl = newMatch.querySelector(".lws-matchName");
  const matchResultEl = newMatch.querySelector(".lws-singleResult");
  const incrementInput = newMatch.querySelector(".lws-increment");
  const decrementInput = newMatch.querySelector(".lws-decrement");

  matchNameEl.innerText = "Match " + matchCounter;
  matchCounter++;

  // Initialize the result for the new match to 0
  matchResultEl.innerText = "0";

  incrementInput.value = "";
  decrementInput.value = "";

  matchContainer.appendChild(newMatch);

  // Add event listeners to the new increment and decrement inputs
  incrementInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const enteredValue = parseInt(e.target.value);
      const currentResult = parseInt(matchResultEl.innerText);
      const newResult = currentResult + enteredValue;
      store.dispatch(increment(enteredValue));
      matchResultEl.innerText = newResult;
      e.target.value = "";
    }
  });

  decrementInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const enteredValue = parseInt(e.target.value);
      const currentResult = parseInt(matchResultEl.innerText);
      const newResult = currentResult - enteredValue;
      store.dispatch(decrement(enteredValue));
      matchResultEl.innerText = newResult; // Update the result for the new match
      e.target.value = "";
    }
  });
}
