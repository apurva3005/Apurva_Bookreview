const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
var request = new XMLHttpRequest();
request.open('GET', 'https://www.goodreads.com/search.xml?key=LMB9ggnbHUvIGi7l3eaA', true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(book=> {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const h1 = document.createElement('h1');
      h1.textContent = book.title;
      const p = document.createElement('p');
      book.show = book.show.substring(0, 300);
      p.textContent = `${book.show}...`;
     container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();