const addFieldButton = document.getElementById("add-field");
const removeFieldButton = document.getElementById("remove-field");
const fieldsContainer = document.getElementById("fields-container");
const sumResult = document.getElementById("sum");
const averageResult = document.getElementById("average");
const minResult = document.getElementById("min");
const maxResult = document.getElementById("max");

addInputField();

function calculateStatistics() {
  const inputFields = document.querySelectorAll(".input-field");
  const values = [];

  inputFields.forEach((field) => {
    if (field.value !== "") {
      values.push(parseFloat(field.value));
    }
  });

  if (values.length > 0) {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    sumResult.textContent = sum;
    averageResult.textContent = average.toFixed(2);
    minResult.textContent = min;
    maxResult.textContent = max;
  } else {
    sumResult.textContent = 0;
    averageResult.textContent = 0;
    minResult.textContent = 0;
    maxResult.textContent = 0;
  }
}

addFieldButton.addEventListener("click", addInputField);
fieldsContainer.addEventListener("input", calculateStatistics);
removeFieldButton.addEventListener("click", removeInputField);

function addInputField() {
  const inputField = document.createElement("input");
  inputField.type = "number";
  inputField.className = "input-field";
  fieldsContainer.appendChild(inputField);
}

function removeInputField() {
  const inputFields = document.querySelectorAll(".input-field");
  const lastInputField = inputFields[inputFields.length - 1];
  if (inputFields.length > 0 && lastInputField.value === "") {
    fieldsContainer.removeChild(lastInputField);
  }
}
