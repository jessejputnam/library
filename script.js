"use strict";

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

console.log(theHobbit.read);
console.log(theHobbit.info());
