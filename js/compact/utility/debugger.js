let Debugger = {
    debugBody: function(){
        console.log(Document.body);
    },
    debriefInterpreter: function(){
        console.log("Images: " + Interpreter.image);
        console.log("Abstracts: " + Interpreter.abstract);
        console.log("Span Identities:" + Interpreter.spanIdentities);
        console.log("Unresolved: " + Interpreter.unresolved);
    },
}
