let Debugger = {
    errors: [],
    interactions: [],
    debugBody: function(){
        console.log(Document.body);
    },
    debriefErrors: function(){
        for (var i = 0; i < this.errors.length; i++) {
           console.error(this.errors[i]);
        }
    },
    debriefInterpreter: function(){
        console.log("Images: " + Interpreter.image);
        console.log("Abstracts: " + Interpreter.abstract);
        console.log("Span Identities:" + Interpreter.spanIdentities);
        console.log("Unresolved: " + Interpreter.unresolved);
    },
    debriefChartographer: function(){
        console.log("SpansToSort.length: " + Chartographer.spanToSort.length);
        console.log("Packer.packagedSpans: " + Packager.packagedSpans);
        for (var i = 0; i < Chartographer.spanToSort.length; i++) {
            console.log(Chartographer.spanToSort[i].identity);
        }
    },
    debugWordsAndSyllables: function(){
        //this is only for a small study
        console.log(Document.words);
        console.log(Document.breaths);
    },
    debriefDocumentDataState: function(){
        console.log(Document.viewDataState());
    },
    submitErrorReport: function(message){
        this.errors.push(message);
    },
}
