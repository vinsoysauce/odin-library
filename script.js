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

function Book(author, title, pages) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    
}

function addBookToLibrary() {

}


function displayBookToLibrary() {
    const container = document.querySelector('.card-container');
    for (let book in myLibrary) {
        const card = document.createElement("div");
        card.classList.add("content");
        for (let value in myLibrary[book]){
            const items = document.createElement("div");
            items.classList.add("items")
            items.textContent += myLibrary[book][value];
            card.appendChild(items)
            
        }
        container.appendChild(card);
    }
}




displayBookToLibrary()






// const container = document.querySelector('.card-container');
// const content = document.createElement("div");
// content.classList.add("content");