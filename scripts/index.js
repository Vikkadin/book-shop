import {
    createElement,
    createElementWithId,
    addNewElement,
    addNewImageElement,
    addNewButton,
    addNewElementWithAction,
} from "./elements.js";

let id = 0;
const booksArray = [];
const bagArray = [];

document.addEventListener("DOMContentLoaded", createCatalogPage());

function createCatalogPage() {
    const header = createHeader();
    const main = createMain();
    const body = document.getElementsByTagName("body")[0];
    const footer = createFooter();
    const docFragment = document.createDocumentFragment();
    const wrapper = createElement("div", "content-wrapper");
    wrapper.appendChild(header);
    wrapper.appendChild(main);
    wrapper.appendChild(footer);
    docFragment.appendChild(wrapper);
    body.appendChild(docFragment);
}

function createHeader() {
    const header = createElement("header", "header");
    const div = createElement("div", "header__logo");
    const logo = createElement("div", "header__logo-img");
    const title = createElement("div", "header__title");
    const name = createElement("div", "page-name");
    const bag = createElement("div", "header__bag");
    addNewElement(title, "h1", "", "Books Shop");
    addNewElement(name, "h2", "", "JavaScript");
    div.appendChild(logo);
    div.appendChild(title);
    header.appendChild(div);
    header.appendChild(name);
    header.appendChild(bag);
    return header;
}

function createMain() {
    const main = createElement("main", "main");
    const bag = createBag();
    const catalog = createCatalog();
    const popup = createPopupWindow();
    main.appendChild(bag);
    main.appendChild(catalog);
    addNewElementWithAction(main, "div", "popup-shadow", togglePopup);
    main.appendChild(popup);
    return main;
}

function createCatalog() {
    const section = createElement("section", "catalog");
    section.appendChild(createCards());
    return section;
}

function createCards() {
    const container = createElement("div", "books-container");
    fetch("./scripts/books.json")
        .then((response) => {
            return response.json();
        })
        .then((books) => {
            books.forEach((book) => addCard(book, container));
        });
    return container;
}

function addCard(book, container) {
    book.id = id;
    booksArray.push(book);
    const card = createElementWithId("div", "book-card", id);
    const div = createElement("div", "button-block");
    addNewElement(card, "h4", "book-price", `<span>$ ${book.price}</span>`);
    addNewImageElement(card, "book-cover", book.imageLink, book.title);
    addNewElement(card, "h4", "book-title", book.title);
    addNewElement(card, "h4", "book-author", book.author);
    addNewButton(div, "Show more", togglePopup);
    addNewButton(div, "Add to bag", addToBag);
    card.appendChild(div);
    container.appendChild(card);
    id++;
}

function createBag() {
    const bag = createElement("aside", "shopping-bag");
    addNewElement(bag, "h3", "", "Your bag is empty");
    addNewElement(bag, "div", "bag-line");
    addNewElement(bag, "p", "", "Drop books here");
    return bag;
}

function addToBag(event) {
    const clickedItem = event.target.closest(".book-card");
    if (clickedItem) {
        let book = booksArray.find((el) => el.id === Number(clickedItem.id));
        bagArray.push(book);
        displayShoppingBag();
    }
}

function displayShoppingBag() {
    const bag = document.getElementsByClassName("shopping-bag")[0];
    let total = 0;
    bag.innerHTML = "";
    bagArray.forEach((book) => {
        addItemToBag(book, bag);
        total += Number(book.price);
    });
    addNewElement(bag, "div", "line");
    let totalPrice = createElement("div", "total");
    addNewElement(totalPrice, "h4", "", "Total:");
    addNewElement(totalPrice, "h4", "item__price", `$${total}.00`);
    bag.appendChild(totalPrice);
    const orderBtn = createElement("a", "button", "Confirm");
    orderBtn.setAttribute("href", "./order.html");
    bag.appendChild(orderBtn);
}

function addItemToBag(book, bag) {
    const bookItem = createElement("div", "shopping-bag__item");
    addNewImageElement(bookItem, "item__img", book.imageLink, book.title);
    const titleAndAuthor = createElement("div", "item__title-author");
    addNewElement(titleAndAuthor, "h4", "item__title", book.title);
    addNewElement(titleAndAuthor, "h4", "item__author", book.author);
    bookItem.appendChild(titleAndAuthor);
    addNewElement(bookItem, "h4", "item__price", `$${book.price}`);
    addNewElement(bookItem, "div", "remove");
    bag.appendChild(bookItem);
}