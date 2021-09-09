class Quote {
    constructor(author, quote) {
        this.author = author
        this.quote = quote

    }
    pushQuote() {
        document.querySelector('.carousel-inner').innerHTML +=
            `<div class="carousel-item">
            <p class="quote-content">${this.quote}</p>
            <p class="quote-author">-${this.author}</p>
            </div>`
    }
}
//API
function getQuotes() {
    let filterValue = document.querySelector('input').value
    console.log(filterValue)

    fetch(`https://type.fit/api/quotes`)
        .then(response => response.json())
        .then(data => {
            data.forEach(newData => {


                if (filterValue == newData.author) {
                    let author = newData.author
                    let quote = newData.text//muss man noch ändern 


                    let newQuotes = new Quote(author, quote)
                    newQuotes.pushQuote()
                }

            })

        });
}
//==================Funktion für die RandomColor=================================
function getRandomInt(min, max) { //Random Number Generator
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6',  //Array mit Farben 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


function changeColor() {
    let randomColor = getRandomInt(0, colorArray.length); //nimmt eine zufällige Farbe
    document.body.style.backgroundColor = colorArray[randomColor];
    document.querySelector('.carousel-item').style.color = colorArray[randomColor];

}
