// Loads the user from the initial state
const initialDataEl = document.getElementById('initial-data');
const dataJSON = initialDataEl.text;

let initialData;
try {
  initialData = JSON.parse(dataJSON);
} catch (e) {
  initialData = {};
}

export default initialData;
