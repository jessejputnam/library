"use strict";

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
console.log(fledgling.info());

addBooktoLibrary(theHobbit);
addBooktoLibrary(paleFire);
addBooktoLibrary(darknessAtNoon);
addBooktoLibrary(fledgling);

let sortedLibrary = myLibrary.sort((a, b) => (a.author > b.author ? 1 : -1));

console.table(sortedLibrary);
