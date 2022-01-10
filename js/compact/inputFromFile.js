//https://developer.mozilla.org/en-US/docs/Web/API/FileReader

Inputer = {
    initiate: function(input){
        let file = input.files[0];

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
          //console.log(reader.result);
          let target = document.getElementById('inputTarget');
          target.innerHTML = reader.result;
        };

        reader.onerror = function() {
          console.log(reader.error);
        };
    },
};
