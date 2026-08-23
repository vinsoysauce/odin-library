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
  this.info = function(){
    if (this.read) {
        return `${this.title} by ${this.author}, ${this.pages}, finished reading`
    } else {
        return `${this.title} by ${this.author}, ${this.pages}, not read yet`
    }
  }
}

function addBookToLibrary(title, author, read, pages) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, read, pages)
  myLibrary.push(newBook)
  displayBook()
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
  for (const item in lastBook) {
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
        const read = document.createElement("div");
        read.classList.add("read");
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
        removeBook.src = "/svg/remove.svg";
        removeBook.addEventListener('click', (event) => {
          container.removeChild(bookCard)
        })
        const readOrUnread = document.createElement("img");
        readOrUnread.classList.add("readOrUnread");
        readOrUnread.src = "/svg/read.svg";
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
});

addBookToLibrary("The Three Body Problem", "Cixin Liu", false, 416)
addBookToLibrary("The Dark Forest", "Cixin Liu", false, 528)
addBookToLibrary("Death's End", "Cixin Liu", false, 624)

