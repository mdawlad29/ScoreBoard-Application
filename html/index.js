// add button dom element
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const matchResultEl = document.getElementById("match-result");

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

// Increment Listener
incrementEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const enteredValue = parseInt(e.target.value);
    store.dispatch(increment(enteredValue));
    e.target.value = "";
  }
});
// Decrement Listener
decrementEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const enteredValue = parseInt(e.target.value);
    store.dispatch(decrement(enteredValue));
    e.target.value = "";
  }
});
