let numberListElement = document.getElementById("number-list"); // ol list of numbers
let operationListElement = document.getElementById("operations"); // ul list of operations
let screenElement = document.getElementById("screen"); // screen element
let screenContent = screenElement.innerText;
let operationsRegex = /[+\-x/]/; // regex including main operations

numberListElement.addEventListener("click", (event) => {
    // check if user did'nt select all numbr
    if (event.target.nodeName === "LI") {
    let liContent = event.target.textContent;
    screenElement.innerText += liContent; // add the number selected by user to screen
    return;
  }
});

operationListElement.addEventListener("click", (event) => {
  let operation = event.target.textContent;
  screenContent = screenElement.textContent;
  if (!screenContent) {
    return; // check not to start with operations
  }

  if (operation.toLowerCase() === "clear") {
    screenElement.innerHTML = "";
    return; // no need to check the rest of statements
  }

  if (
    event.target.nodeName === "LI" && // i added the event on ul element; i want a single operation
    operationsRegex.test(operation) && // check that operation is not equal sign
    !operationsRegex.test(screenContent.slice(-1)) // prevent adding to operation next to each other
  ) {
    screenElement.textContent += operation;
    return
  }

  if (operation == ".") {
    screenElement.textContent += operation;
    return
  }




  if (operation === "=") {
    let operations = screenContent.match(/[+\-x/]/g); // get all operations on the screen
    let numbers = screenContent.split(/[+\-x/]/); // get all numbers on the screen
    if (!operations) return // if there is no operation screen remain the same

    // in this logic i start  calculating from left of the screen;
    // i iterate on numbers; my numbers list lenght is operations.lenght+1;
    // my acc parameter is first number and my curr is second with index 1;
    // the result of first calculation returns in acc; for the second operation the result will be the left operand and next value the right one untill the end of numbers 

    let result = numbers.reduce((acc, curr, i) => {
      switch (operations[i - 1]) {
        case "+":
          return Number(acc) + Number(curr);
        case "-":
          return Number(acc) - Number(curr);
        case "x":
          return Number(acc) * Number(curr);
        case "/":
          return Number(acc) / Number(curr);
      }
    });

    screenElement.innerHTML = result; // show the result of operation on the screen
  }
});
