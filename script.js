"use strict";
/*
 
Table of Contents:

#DOM Variables
#Add Book Modal
#Book Card
#Add Book to Library
#Original Book Code

*/

////////////////////////////////////////////////

/* ########## #DOM Variables ############ */
// Banner
const btnAddBook = document.querySelector(".banner__add");
// Book Shelf
const shelf = document.querySelectorAll(".shelf");
const shelfActive = document.querySelector(".shelf__used");
// Add Book Modal
const modalAddBook = document.querySelector(".modal__add-book");
const modalClose = document.querySelector(".modal__close");
const btnAddToLibrary = document.querySelector(".modal__add--btn");
// Book Card
const bookCard = document.querySelector(".book__card");
const bookCardClose = document.querySelector(".card__close");

/* ########## #Add Book Modal ############ */
//Open Modal
const openAddBookModal = function () {
  modalAddBook.classList.remove("hidden");
};
btnAddBook.addEventListener("click", openAddBookModal);

//Close Modal
modalClose.addEventListener("click", () => {
  modalAddBook.classList.add("hidden");
});

/* ########## #Book Card ############ */
//Open Card
// const openBookCard = function () {
//   bookCard.classList.remove("hidden");
// };

// bookSelect.forEach((book) => {
//   book.addEventListener("click", openBookCard);
// });

//Close Card
bookCardClose.addEventListener("click", () => {
  bookCard.classList.add("hidden");
});

/* ########## #Add Book to Library ############ */
btnAddToLibrary.addEventListener("click", () => {
  //create library book visual
  const spine = document.createElement("div");
  const spineTitle = document.createElement("p");
  spineTitle.textContent = document.getElementById("btitle").value;
  spine.classList.add("book");
  spineTitle.classList.add("book__title");
  spine.appendChild(spineTitle);
  shelfActive.appendChild(spine);

  //close window
  modalAddBook.classList.add("hidden");

  //open book card on created book
  const openBookCard = function () {
    bookCard.classList.remove("hidden");
  };

  document.querySelectorAll(".book").forEach((book) => {
    book.addEventListener("click", openBookCard);
  });
});

/* ########## #Original Book Code ############ */
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      read === true ? "finished reading" : "not read yet"
    }`;
  };
}

function addBooktoLibrary(book) {
  return myLibrary.push(book);
}

const theHobbit = new Book("The Hobbit", "Tolkien", 295, true);
const paleFire = new Book("Pale Fire", "Nabokov", 300, true);
const darknessAtNoon = new Book("Darkness at Noon", "Koestler", 170, false);
const fledgling = new Book("Fledgling", "Butler", 230, true);

console.log(theHobbit.info());

addBooktoLibrary(theHobbit);
addBooktoLibrary(paleFire);
addBooktoLibrary(darknessAtNoon);
addBooktoLibrary(fledgling);

let sortedLibrary = myLibrary.sort((a, b) => (a.author > b.author ? 1 : -1));
