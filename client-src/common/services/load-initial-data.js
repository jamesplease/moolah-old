// Loads the user from the initial state
export default function loadInitialData() {
  const initialDataEl = document.getElementById('initial-data');
  const dataJSON = initialDataEl ? initialDataEl.textContent : '';

  let initialData;
  try {
    initialData = JSON.parse(dataJSON);
  } catch (e) {
    initialData = {};
  }

  return initialData;
}
