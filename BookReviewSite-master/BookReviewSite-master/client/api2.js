function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('book');
const url = 'https://www.goodreads.com/search.xml?key=LMB9ggnbHUvIGi7l3eaA&q=Ender%27s+Game';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let book = data.results;
  return book.map(function(author) {
    let li = createNode('li'),
        
    
        span = createNode('span');
   
        
    span.innerHTML = `${book.tittle} `;
    
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});   