let Narrator = {
    state: [],
    setUserEvents: function(){
        if(Resolver.exceptions.length > 0){
            Resolver.markMultiple();
        }
    },
    update: function(){

    },
    initialize: function(target){
        //gets the source and creates a copy of the raw data contained in the source
        let decoupledSource = Decoupler.decouple(target);
        //processes the initial setup and saves the state to Document.
        Paragraphs.process(decoupledSource);
        //Set the user events
        Narrator.setUserEvents;
    },

}
