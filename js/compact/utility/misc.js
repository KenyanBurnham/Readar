/**============================================================================
      Creates random ID

      Originator: Simon Breiter
      Source: https://codepen.io/simonbreiter/pen/gRpRJj
=============================================================================**/
function createKey(){
      // Random number from 0 to length
      const randomNumber = (length) => {
          return Math.floor(Math.random() * length)
      }
      // Generate Pseudo Random String
      const generateID = (length) => {
          const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let text = "";
          for (let i = 0; i < length; i++) {
              text += possible.charAt(randomNumber(possible.length));
          }
          return text;
      }
      return generateID(20);
}

//Creates a timestamp (for later)
function createTimeStamp(){
    //creates a timeStamp
    let date = new Date();
    return date.getTime();
}


//Sets a display message for the console
function log() {
    setTimeout(console.log.bind(console, "%c Hello, I see you're interested in my code. If you would like to contact the developer feel free to contact me at: kenyan@kenyanburnham.com %c", "background: #007bff;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px;", ""));
}
log();
