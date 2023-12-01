import './popup.css';

const math = require('mathjs');

const input = document.getElementById('equation');
const output = document.getElementById('output');
const form = document.getElementById('form');

form.onsubmit = (e) => {
  e.preventDefault();
  calculate();
};

function calculate() {
  const result = math.evaluate(input.value);
  output.innerHTML = result;

  chrome.storage.local.set({ equation: input.value, result }).then(() => {
    console.log(' Value is set to ', result);
  });
}

(function () {
  chrome.storage.local.get(['equation', 'result']).then((result) => {
    const eq = result['equation'];
    const res = result['result'];

    input.value = eq || '';
    output.innerHTML = res || '';
  });
})();
