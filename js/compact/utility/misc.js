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
