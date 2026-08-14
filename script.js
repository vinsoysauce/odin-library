const myLibrary = [
    {
        title: "The Three-Body Problem",
        author: "Cixin Liu",
        pages: 400
    },
    {
        title: "The Dark Forest",
        author: "Cixin Liu",
        pages: 512
    },
    {
        title: "Death's End",
        author: "Cixin Liu",
        pages: 608
    }, 
];

function Book(author, title, cover, pages) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID;
    this.title = title;
    this.author = author;
    this.cover = cover;
    this.pages = pages;
    
}

function addBookToLibrary() {

}

function displayBookToLibrary() {
    for (let book in myLibrary) {
        console.log(myLibrary[book])
    }
}

displayBookToLibrary()