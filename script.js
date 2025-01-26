// Store books in an array
const myLibrary = [];

// Creating a Book Object
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Show Books in the DOM
function displayBooks() {
  const libraryDisplay = document.querySelector("#library-display");
  libraryDisplay.textContent = ""; // Delete previous ad

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("p");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const readStatus = document.createElement("p");
    readStatus.textContent = `Status: ${book.read ? "Read" : "Not read"}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1); // Delete Book
      displayBooks(); 
    });

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = book.read
      ? "Mark as unread"
      : "Mark as read";

    toggleReadButton.addEventListener("click", () => {
      myLibrary[index].read = !myLibrary[index].read;
      displayBooks(); 
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(toggleReadButton);

    libraryDisplay.appendChild(bookCard);
  });
}

// Add a book
function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // Refresh the display
}

// Predefined books
addBookToLibrary("The Best Man", "Denis Michalski", 333, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);




// Add New Book 
const form = document.querySelector("#new-book-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector("#read").checked;

     if (pages <= 0) {
       alert("Please enter a valid number of pages.");
       return;
     }

    addBookToLibrary(title, author, pages, readStatus);

    form.reset();
});

// Store in LocalStorage
function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibrary() {
  const storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (storedLibrary) {
    storedLibrary.forEach((book) => myLibrary.push(book));
  }
}

// Call loadLibrary() on page load
loadLibrary();
displayBooks();


// Initial display
displayBooks();