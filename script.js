const myLibrary = [];

function Book( title, author, read, pages) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
}

function addBookToLibrary(title, author, read, pages) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, read, pages)
  myLibrary.push(newBook)
}

function displayBook() {
  const container = document.querySelector(".books-container");
  for (item in myLibrary) {
  const book = document.createElement("div");
  book.classList.add("book");
    for (value in myLibrary[item]) {
      if (myLibrary[item][value] === myLibrary[item].title) {
        const title = document.createElement("div");
        title.classList.add("title")
        title.textContent += (myLibrary[item][value]);
        book.appendChild(title)
      } else if (myLibrary[item][value] === myLibrary[item].author) {
        const author = document.createElement("div");
        author.classList.add("author")
        author.textContent += (myLibrary[item][value]);
        book.appendChild(author)
      } else if (myLibrary[item][value] === myLibrary[item].read) {
        const read = document.createElement("div");
        read.classList.add("read");
        if (myLibrary[item].read) {
          read.textContent += 'Status: Read';
        } else {
          read.textContent += 'Status: Not read yet';
        }
        book.appendChild(read);
      } else if (myLibrary[item][value] === myLibrary[item].pages) {
          const pages = document.createElement("div");
          pages.classList.add("pages")
          pages.textContent += (myLibrary[item][value]);
        book.appendChild(pages)
      }
    }
    container.appendChild(book)
  }
}




addBookToLibrary("Man's Search for Meaning", "Viktor Frankl", true, 250)
addBookToLibrary("Atlas Shrugged", "Ayn Rand", false, 300)
displayBook()


