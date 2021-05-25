let Debugger = {
    errors: [],
    interactions: [],
    debugBody: function(){
        console.log(Document.body);
    },
    debriefErrors: function(){
        for (var i = 0; i < this.errors.length; i++) {
           console.log(this.errors[i]);
        }
    },
    debriefInterpreter: function(){
        console.log("Images: " + Interpreter.image);
        console.log("Abstracts: " + Interpreter.abstract);
        console.log("Span Identities:" + Interpreter.spanIdentities);
        console.log("Unresolved: " + Interpreter.unresolved);
    },
    submitErrorReport: function(message){
        this.errors.push(message);
    },
}
