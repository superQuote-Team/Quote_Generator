class Quote {
  constructor(author, quote) {
    this.author = author;
    this.quote = quote;
  }
  pushQuote() {
    document.querySelector(
      ".carousel-inner"
    ).innerHTML += `<div class="carousel-item">
            <p class="quote-content">${this.quote}</p>
            <p class="quote-author">-${this.author}</p>
            </div>`;
  }
}

//Event Handler für Enter key
document.querySelector("input").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getQuotes();
  }
});

//API
function getQuotes() {
  let filterValue = document.querySelector("input").value;
  console.log(filterValue);

  fetch(`https://type.fit/api/quotes`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((newData) => {
        if (filterValue == newData.author) {
          let author = newData.author;
          let quote = newData.text; //muss man noch ändern

          let newQuotes = new Quote(author, quote);
          newQuotes.pushQuote();
        }
      });
    });
}
//==================Funktion für die RandomColor=================================
function getRandomInt(min, max) {
  //Random Number Generator
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#00B3E6", //Array mit Farben
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

function changeColor() {
  let randomColor = getRandomInt(0, colorArray.length); //nimmt eine zufällige Farbe
  document.body.style.backgroundColor = colorArray[randomColor];

}

//to get generate random quote and change random color
function randomQuote() {
  changeColor();
  randomQuoteGenerator();
}

//random Quote
function randomQuoteGenerator() {
  fetch(`https://type.fit/api/quotes`)
    .then((response) => response.json())
    .then((data) => {
      let randomQuoteIndex = getRandomInt(0, data.length);
      data[randomQuoteIndex];
      console.log(data[randomQuoteIndex]);

      let quote = data[randomQuoteIndex].text;
      let author = data[randomQuoteIndex].author;
      console.log(quote);
      console.log(author);

      document.querySelector(
        ".carousel-inner"
      ).innerHTML = `<div class="carousel-item active">
                <p class="quote-content">${quote}</p>
                <p class="quote-author">-${author}</p>
                </div>`;
    });
}

//default set on random Quote onload
document.body.onload = function () {
  randomQuote();
};

//to fit long quote into the
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
function getAuthor(){
  fetch(`https://type.fit/api/quotes`)
  .then(response => response.json())
  .then(data => {
      data.forEach(newData => {
      if(newData.author==null){

      }
      else if (authorArray.includes (newData.author)) { //wenn der autor schon im Array ist => macher nichts
      } 
      else {
        
        authorArray.push(newData.author) // wenn der author noch nicht im Array ist pushe ihn in den Array
      }
    
      })

  });
}
getAuthor() //Hier wird der Array der Authoren generiert
autocomplete(document.getElementById("myInput"), authorArray);