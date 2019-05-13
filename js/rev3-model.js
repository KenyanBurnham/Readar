let Document = {
    text: [],
    eventLog: [],
    textLog: [],
    body: [],
    edges: [],
    errorLog: [],
    createTimeStamp: function(){
        //creates a timeStamp
        let date = new Date();
        return date.getTime();
    },
    createEdge: function(edgeValue, edgeMessage){
        //Creates a list of all edge cases accounted for
        let Edge = {
            id: createKey(),
            value: edgeValue,
            timeStamp: Document.createTimeStamp,
            message: edgeMessage,
        }
        Document.edges.push(Edge);
    },
    errorRecord: function(name, message, location){
        let CustomError = {
            customeMessage: "Error occured at: " + Document.createTimeStamp() + " in " + location + ".",
            errorName: name,
            errorRecord: message,
        }
        Document.errorLog.push(CustomError);
    },

    debugText: function(){
        console.log(this.text);
    },
    debugTextLog: function(){
        console.log(this.textLog);
    },
    debugEventLog: function(){
        console.log(this.eventLog);
    },
    debugError: function(){
        if(Document.errorLog.length > 0){
            Document.errorLog.forEach(function(error){
                console.log(error);
            });
        }else{
            console.log("No errors.");
        }
    },
    updateKeyboard: function(){
        //this.textLog.forEach(function(){
        //https://codepen.io/gschier/pen/VKgyaY
        //    console.log("I'll use this to create a heat map of keys later.");
        //});
    },
    bodyDebug: function(){
        console.log(Document.body);
    },
    reset: function(){

    }
}
