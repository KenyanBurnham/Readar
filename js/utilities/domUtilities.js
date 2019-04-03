/**
  grabStringFromDOM.js
  Description: Grabs the input and returns it to the model as a string.
**/
function grabStringFromDOM(idOfInput){
    //Grab input string
    let inputToProcess = document.getElementById(idOfInput).value;
    return inputToProcess.toString();
}
