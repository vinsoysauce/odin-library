const myLibrary = [];

function Book( title, author, pages, read) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

function displayBook() {
  for (book in myLibrary) {
    
  }
}


addBookToLibrary("Man's Search for Meaning", "Viktor Frankl", 450, true)
addBookToLibrary("Atlas Shrugged", "Ayn Rand", 300, false)
console.log(myLibrary[0])


