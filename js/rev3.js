function handleNewPaste(event){
    console.log(event);
    
}

function handleNewKey(event){
    // Whether character is shifted or not
    shiftKey = event.shiftKey;
    // Specific name via method
    code = event.code;
    // Specific character
    key = event.key;
    //Time stamp when entered
    timeStamp = event.timeStamp;
    console.log(event);
}
