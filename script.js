"use strict";

/*
Table of Contents

#DOM Variables
#Stored Variables
#Stored functions
#Filter Bar Visual
#Filter Bar Clear Btn
#Filter Bar Functionality
#Filter Job Cards Functionality

*/

/* #################### #DOM Variables ####################### */
const filter = document.querySelector(".filter");
const filterItemContainer = document.querySelector(".filter__item__container");
let filterRemove = document.querySelectorAll(".filter__item__remove");
const filterClear = document.querySelector(".filter__clear");
const jobCards = document.querySelectorAll(".item__container");
const itemFilter = document.querySelectorAll(".item__filter");

// Dynamic DOM Variables
let newFilterName, newFilterItem, newFilterRemove;

/* ##################### #Stored Variables ###################### */
let newFilterItems = [];

/* ###################### #Stored Functions ##################### */
const createFilterItemsDOM = function () {
  newFilterItem = document.createElement("button");
  newFilterName = document.createElement("div");
  newFilterRemove = document.createElement("img");
};

const addClassesToFilterItemsDOM = function () {
  newFilterItem.classList.add("filter__item");
  newFilterName.classList.add("filter__item__name");
  newFilterRemove.classList.add("filter__item__remove");
  newFilterRemove.src = "images/icon-remove.svg";
};

const appendItemsToDOM = function () {
  filterItemContainer.appendChild(newFilterItem);
  newFilterItem.appendChild(newFilterName);
  newFilterItem.appendChild(newFilterRemove);
};

const removeFilterFromBar = function () {
  filterRemove.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      // remove filter item from array
      newFilterItems = newFilterItems.filter(
        (filterItem) => filterItem !== item.parentNode.textContent.toLowerCase()
      );
      // remove filter item from DOM
      item.parentNode.remove();
    });
  });
};

const updateFilterRemove = () =>
  (filterRemove = document.querySelectorAll(".filter__item__remove"));

const storeFilterToArray = () =>
  newFilterItems.push(newFilterItem.id.toLowerCase());

/* ################### #Filter Bar Visual ##################### */

// Hide filter if empty
document.addEventListener("mouseup", () => {
  if (!filterItemContainer.hasChildNodes()) filter.classList.add("hidden");
  else filter.classList.remove("hidden");
});

/* ################### #Filter Bar Clear Btn ##################### */

filterClear.addEventListener("mousedown", () => {
  // Remove all children of filter item container
  while (filterItemContainer.firstChild) {
    filterItemContainer.removeChild(filterItemContainer.firstChild);
  }
  // unhide hidden item cards
  jobCards.forEach((job) => job.classList.remove("hidden"));
  // empty filter array
  newFilterItems = [];
});

/* ################## #Filter Bar Functionality ################### */

// Create filter item when item filter clicked
itemFilter.forEach((filterChoice) => {
  filterChoice.addEventListener("mousedown", () => {
    // Add check of filter for if choice already selected
    if (newFilterItems.includes(filterChoice.textContent.toLowerCase())) return;

    // Create new filter items in DOM
    createFilterItemsDOM();

    // Add relevant classes and IDs to new filter items
    newFilterName.textContent = filterChoice.textContent;
    newFilterItem.setAttribute("id", filterChoice.textContent);
    addClassesToFilterItemsDOM();

    appendItemsToDOM();

    updateFilterRemove();

    storeFilterToArray();

    // Filter for individual selection
    jobCards.forEach((job) => {
      if (!job.classList.contains(filterChoice.textContent.toLowerCase()))
        job.classList.add("hidden");
    });

    // Remove filter item when clicked
    removeFilterFromBar();
  });
});

/* ############### #Filter Job Cards Functionality ############### */

document.addEventListener("mouseup", () => {
  jobCards.forEach((card) => {
    let filterTrueCheck = 0;
    if (newFilterItems.length === 0) {
      card.classList.remove("hidden");
      card.classList.add("item__container--desktop");
      return;
    }
    newFilterItems.forEach((item) => {
      if ([...card.classList].includes(item)) filterTrueCheck++;
    });
    if (filterTrueCheck !== newFilterItems.length) {
      card.classList.add("hidden");
      card.classList.remove("item__container--desktop");
    }
    if (filterTrueCheck === newFilterItems.length) {
      card.classList.remove("hidden");
      card.classList.add("item__container--desktop");
    }
  });
});

// document.addEventListener("mouseup", () => {
//   jobCards.forEach((card) => {
//     let filterTrueCheck = 0;
//     if (newFilterItems.length === 0) return card.classList.remove("hidden");
//     newFilterItems.forEach((item) => {
//       if ([...card.classList].includes(item)) filterTrueCheck++;
//     });

//     if (filterTrueCheck !== newFilterItems.length) card.classList.add("hidden");
//     if (filterTrueCheck === newFilterItems.length)
//       card.classList.remove("hidden");
//   });
// });
