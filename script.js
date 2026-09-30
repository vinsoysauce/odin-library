let myLibrary = [];

class Book {
  #bookTitle;
  #bookAuthor;
  #bookRead;
  #bookPages;
  #bookId;

  constructor(bookTitle, bookAuthor, bookRead, bookPages) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }

    this.#bookId = crypto.randomUUID();
    this.#bookTitle = Book.#validateTitle(bookTitle);
    this.#bookAuthor = Book.#validateAuthor(bookAuthor);
    this.#bookRead = Book.#validateRead(bookRead);
    this.#bookPages = Book.#validatePages(bookPages)
  }

  set #bookTitle(title) {
    this.#bookTitle = Book.#validateTitle(title)
  }

  set #bookAuthor(author) {
    this.#bookAuthor = Book.#validateAuthor(author)
  }

  set #bookRead(read) {
    this.#bookRead = Book.#validateRead(read)
  }

  set #bookPages(pages) {
    this.#bookPages = Book.#validatePages(pages)
  }

  get #bookId(id) {
    return this.#bookId;
  }

  get #bookTitle(title) {
    return this.#bookTitle;
  }

  get #bookAuthor(author) {
    return this.#bookAuthor;
  }

  get #bookRead(read) {
    return this.#bookRead;
  }

  get #bookPages(pages) {
    return this.#bookPages;
  }

  static #validateTitle(title) {
    if (typeof title === 'string') {
      let str = this.name.trim();
      if (str.length >= 2) {
        return str;
      }
    }
    throw 'The title must be a string with at least 2 characters';
  }

  static #validateAuthor(author) {
    if (typeof author === 'string') {
      let str = this.author;
      if (str.length >= 2) {
        return str;
      }
    }
    throw 'The author must be a string with at least 2 characters';
  }

  static #validateRead(read) {
    if (typeof read === 'boolean') {
      let bool = this.read;
      if (bool === true || bool === false) {
        return read;
      }
    }
    throw 'The read must be a boolean value between true or false';
  }

  static #validatePages(pages) {
    if (typeof pages === 'number') {
      let num = this.pages;
      if (num >= 1) {
        return num;
      }
    }
    throw 'The pages must be a number value greater than or equal to one';
  }
}


function addBookToLibrary(title, author, read, pages) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, read, pages)
  myLibrary.push(newBook)
  displayBook()
}

Book.prototype.changeRead = function() {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
}

function displayBook() {
  const container = document.querySelector(".books-container");
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  const book = document.createElement("div");
  book.classList.add("book");
  const bookPages = document.createElement("div");
  bookPages.classList.add("bookPages");
  const details  = document.createElement("div");
  details.classList.add("book-details");
  const actions = document.createElement("div");
  actions.classList.add("book-actions");
  const lastBook = myLibrary[myLibrary.length - 1]
  bookCard.dataset.bookId = lastBook.id;
  const read = document.createElement("div");
  read.classList.add("readStatus");
  for (let item in lastBook) {
      if (lastBook[item] === lastBook.title) {
        const title = document.createElement("div");
        title.classList.add("title")
        title.textContent = (lastBook[item]);
        details.appendChild(title)
        book.appendChild(details)
      } else if (lastBook[item] === lastBook.author) {
        const author = document.createElement("div");
        author.classList.add("author")
        author.textContent = (lastBook[item]);
        details.appendChild(author)
        book.appendChild(details)
      } else if (lastBook[item] === lastBook.read) {
        if (lastBook.read) {
          read.textContent = 'Status: Read';
        } else {
          read.textContent = 'Status: Not read yet';
        }
        details.appendChild(read)
        book.appendChild(details)
      } else if (lastBook[item] === lastBook.pages) {
        const removeBook = document.createElement("img");
        removeBook.classList.add("remove-book");
        removeBook.src = "./svg/remove.svg";
        removeBook.addEventListener('click', (event) => {
          myLibrary = myLibrary.filter((book) => book.id !== lastBook.id)
          container.removeChild(bookCard)
          updateTracking()
        })
        const readOrUnread = document.createElement("img");
        readOrUnread.classList.add("readOrUnread");
        if (lastBook.read) {
            readOrUnread.src = "./svg/read.svg";
            bookCard.style.borderLeft = "8px solid #27ae61";
          } else {
            readOrUnread.src = "./svg/unread.svg";
            bookCard.style.borderLeft = "8px solid #2596be";
          }
        readOrUnread.addEventListener('click', (event) => {
          lastBook.changeRead()
          if (lastBook.read) {
            read.textContent = 'Status: Read';
            bookCard.style.borderLeft = "8px solid #27ae61";
            readOrUnread.src = "./svg/read.svg";
          } else {
            read.textContent = 'Status: Not read yet';
            bookCard.style.borderLeft = "8px solid #2596be";
            readOrUnread.src = "./svg/unread.svg";
          }
          updateTracking()
          })
        actions.appendChild(removeBook)
        book.appendChild(actions)
        actions.appendChild(readOrUnread);
        book.appendChild(actions)
        bookPages.textContent = (lastBook[item] + " pages");
      }
    }
    bookCard.appendChild(book);
    bookCard.appendChild(bookPages);
    container.appendChild(bookCard);

  }

function updateTracking() {
  const totalBooks = document.getElementById('total');
  totalBooks.textContent = myLibrary.length;
  const readBooks = document.getElementById('read');
  const numberOfRead = myLibrary.filter((book) => book.read === true);
  readBooks.textContent = numberOfRead.length;
  const unreadBooks = document.getElementById('unread');
  const numberOfUnread = myLibrary.filter((book) => book.read === false);
  unreadBooks.textContent = numberOfUnread.length;
}




const openBtn = document.getElementById("add-book-button");
const closeBtn = document.getElementById("cancel");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
  modal.classList.add("open");
})

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
})


const form = document.getElementById('form')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('book_title').value;
    const author = document.getElementById('book_author').value;
    const read = document.getElementById('book_read').checked;
    const pages = Number(document.getElementById('book_pages').value)
    addBookToLibrary(title, author, read, pages);
    modal.classList.remove("open");
    form.reset();
      updateTracking()
});

addBookToLibrary("The Three Body Problem", "Cixin Liu", false, 416)
addBookToLibrary("The Dark Forest", "Cixin Liu", false, 528)
addBookToLibrary("Death's End", "Cixin Liu", false, 624)
