/**
    This is all of the functionality needed to coordinate the modal, button,
     and input box to maintain the screen without reloading
**/

function disabledDomManagement(){
    let element = document.getElementById("inputPlace");
    let button = document.getElementById("submissionButton");
    if(element.value < 2){
        button.setAttribute("disabled", "disabled");
    }else{
        button.removeAttribute("disabled");
    }
}

function modalClose(){
    let output = document.getElementById('outputPlace');
    let children = output.children;
    for (var i = 0; i < children.length; i++) {
        output.removeChild(output.childNodes[i]);
    }
    let input = document.getElementById('inputPlace');
    input.value = "";
    disabledDomManagement();
}

document.getElementById("inputPlace").addEventListener("change", disabledDomManagement);
