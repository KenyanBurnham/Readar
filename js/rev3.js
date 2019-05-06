let Document = {
    text: [],
    eventLog: [],
    textLog: [],


    debugText: function(){
        console.log(this.text);
    },
    debugTextLog: function(){
        console.log(this.textLog);
    },
    debugEventLog: function(){
        console.log(this.eventLog);
    },
}

function handleNewPaste(event){
    // Stop data actually being pasted
    event.stopPropagation();
    event.preventDefault();
    // Get pasted data via clipboard API
    let clipboardData = event.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    console.log(pastedData);
    console.log(event.target.selectionStart);

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

    Document.eventLog.push(event);
    Document.text.push(event.key);
    Document.textLog.push(event.key);
}
