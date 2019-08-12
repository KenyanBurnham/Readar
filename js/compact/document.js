let Document = {
    state: [],
    text: [],
    textLog: [],
    body: [],
    words: [],
    wordKeys: [],
    createTimeStamp: function(){
        //creates a timeStamp
        let date = new Date();
        return date.getTime();
    },
    updateState: function(input){
        // get only the text from the input
        let textSnapshot = document.getElementById(input).innerText;
        // save it as a state
        Document.state.push(textSnapshot);
    },
    fetchState: function(){
        //returns last known state
        return Document.state.pop();
    },
}
