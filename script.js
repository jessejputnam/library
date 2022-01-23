"use strict";
/*
 
Table of Contents:

#DOM Variables
#Stored Variables
#Stored Functions
#Add Book Modal
#Book Card
#Add Book to Library
#Original Book Code

*/

////////////////////////////////////////////////

/* ###################### #DOM Variables ######################### */
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
const bookCardRemove = document.querySelector(".card__remove");
let bookCardHiddenId = document.querySelector(".hidden__id");
let bookCardTitle = document.querySelector(".card__title");
let bookCardAuthor = document.querySelector(".card__author");
let bookCardPages = document.querySelector(".card__pages");
let bookCardRead = document.querySelector(".card__slider");

/* ###################### #Stored Variables ###################### */
let myLibrary = [];
let bookIdNum = 0;

/* ##################### #Stored Functions ######################### */
function Book(title, author, pages, read) {
  this.bookid = `book${bookIdNum}`;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      read === "1" ? "finished reading" : "not read yet"
    }`;
  };
}

function addBooktoLibrary(book) {
  return myLibrary.push(book);
}

const openBookCard = function () {
  bookCard.classList.remove("hidden");
};

const addInvalidEntry = function () {
  document.getElementById("btitle").classList.add("invalid__entry");
  document.getElementById("bauthor").classList.add("invalid__entry");
  document.getElementById("bpages").classList.add("invalid__entry");
};

const resetModal = function () {
  document.getElementById("btitle").classList.remove("invalid__entry");
  document.getElementById("bauthor").classList.remove("invalid__entry");
  document.getElementById("bpages").classList.remove("invalid__entry");

  document.getElementById("btitle").value = "";
  document.getElementById("bauthor").value = "";
  document.getElementById("bpages").value = "";
  document.getElementById("bread").value = "0";
};

/* #################### #Add Book Modal ###################### */
//Open Modal
const openAddBookModal = function () {
  modalAddBook.classList.remove("hidden");
};
btnAddBook.addEventListener("click", openAddBookModal);

//Close Modal
modalClose.addEventListener("click", () => {
  resetModal();
  modalAddBook.classList.add("hidden");
});

/* #################### #Book Card ########################### */

//Close Card
bookCardClose.addEventListener("click", (e) => {
  for (let item of myLibrary) {
    //allow change of "read" status on close
    if (
      item.bookid ===
      e.target.parentNode.querySelector(".hidden__id").textContent
    ) {
      item.read = e.target.parentNode.querySelector(".card__slider").value;
    }
  }
  //close card
  bookCard.classList.add("hidden");
});

//Remove Book from Library
bookCardRemove.addEventListener("click", function (e) {
  //remove element from library array
  myLibrary = myLibrary.filter(
    (obj) =>
      obj.bookid !==
      e.target.parentNode.querySelector(".hidden__id").textContent
  );

  //remove element from DOM
  document
    .getElementById(
      e.target.parentNode.querySelector(".hidden__id").textContent
    )
    .remove();
  bookCard.classList.add("hidden");
});

/* ####################### #Add Book to Library ##################### */

btnAddToLibrary.addEventListener("click", () => {
  //add book to library array
  let getTitle = document.getElementById("btitle").value;
  let getAuthor = document.getElementById("bauthor").value;
  let getPages = document.getElementById("bpages").value;
  let getRead = document.getElementById("bread").value;

  //disallow empty fields
  if (getTitle === "") {
    document.getElementById("btitle").classList.add("invalid__entry");
    return;
  }
  if (getTitle !== "") {
    document.getElementById("btitle").classList.remove("invalid__entry");
  }
  if (getAuthor === "") {
    document.getElementById("bauthor").classList.add("invalid__entry");
    return;
  }
  if (getAuthor !== "") {
    document.getElementById("bauthor").classList.remove("invalid__entry");
  }
  if (getPages === "") {
    document.getElementById("bpages").classList.add("invalid__entry");
    return;
  }
  if (getPages !== "") {
    document.getElementById("bpages").classList.remove("invalid__entry");
  }

  let libBookEntry = new Book(getTitle, getAuthor, getPages, getRead);

  addBooktoLibrary(libBookEntry);

  //create library book visual
  const spine = document.createElement("div");
  const spineTitle = document.createElement("p");
  spineTitle.textContent = document.getElementById("btitle").value;
  spine.classList.add("book");
  spine.setAttribute("id", `book${bookIdNum}`);
  bookIdNum++;
  spineTitle.classList.add("book__title");
  spine.appendChild(spineTitle);
  shelfActive.appendChild(spine);

  //close window
  modalAddBook.classList.add("hidden");
  document.getElementById("btitle").classList.remove("invalid__entry");
  document.getElementById("bauthor").classList.remove("invalid__entry");
  document.getElementById("bpages").classList.remove("invalid__entry");

  //reset modal
  resetModal();

  //open book card on created book
  document.querySelectorAll(".book").forEach((book) => {
    book.addEventListener("click", function () {
      for (let item of myLibrary) {
        if (item.bookid === book.id) {
          bookCardHiddenId.textContent = item.bookid;
          bookCardTitle.textContent = item.title;
          bookCardAuthor.textContent = item.author;
          bookCardPages.textContent = `${item.pages} pages`;
          bookCardRead.value = item.read;
        }
        openBookCard();
      }
    });
  });
});
