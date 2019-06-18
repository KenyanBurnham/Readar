let messageText = "This does something.";

var addMessage = firebase.functions().httpsCallable('addMessage');
addMessage({text: messageText}).then(function(result) {
  // Read result of the Cloud Function.
  var sanitizedMessage = result.data.text;
}).catch(function(error) {
  // Getting the Error details.
  var code = error.code;
  var message = error.message;
  var details = error.details;
  // ...
});
