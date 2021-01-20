let Document = {
    state: [],
    text: [],
    textLog: [],
    body: [],
    words: [],
    wordKeys: [],
    breaths: [],
    averageBreath: 0,
    createTimeStamp: function(){
        //creates a timeStamp
        let date = new Date();
        return date.getTime();
    },
    updateDataState: function(input){
        // get only the text from the input
        let textSnapshot = document.getElementById(input).innerText;
        // save it as a state
        this.state.push(textSnapshot);
    },
    fetchDataState: function(input){
        //Let's make sure we have the most recent version
        this.updateDataState(input);
        //returns last known state
        return this.state.pop();
    },
    fetchDOMState: function(input){
        // get the text and HTML from the input
        return document.getElementById(input).innerHTML;
    },
}
