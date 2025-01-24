var volumes = ["I", "II", "III", "IV", "V"];

function SaveToLocalStorage(books) { localStorage.setItem('books', JSON.stringify(books)); }

function GetLocalStorage() {
    var books = JSON.parse(localStorage.getItem('books'));
    if (books) return books;
    else {
        var books = {
            undefined: {
                I: false,
                II: false,
                III: false,
                IV: false,
                V: false
            }
        }
        SaveToLocalStorage(books);
        return books;
    }
}

function GetBookKeysFromElementId(elementId) {
    var elementId = elementId.split('_');
    var name = elementId[0];
    var volume = elementId[1];

    return { name, volume };
}

function GetElementFromBookVolume(bookName, bookVolume) {
    var elementId = bookName + '_' + bookVolume;
    return document.getElementById(elementId);
}

function CreateBookEntry(bookName) {
    var books = GetLocalStorage();
    books[bookName] = {
        I: false,
        II: false,
        III: false,
        IV: false,
        V: false
    }
    SaveToLocalStorage(books);
}

function UpdateSkillBook(elementId, bool) {
    var book = GetBookKeysFromElementId(elementId);
    console.log(book);
    
    var books = GetLocalStorage();
    var bookInfo = books[book.name];
    var bookElement = document.getElementById(book.name + '_' + book.volume);
    console.log(bookInfo);
    if (bookInfo) {
        bookInfo[book.volume] = bool;
        ApplyColorToBookTable(bookElement);
        SaveToLocalStorage(books);
    }
    else {
        CreateBookEntry(book.name);
        UpdateSkillBook(elementId, bool);
    }
}

function ApplyColorToBookTable(bookElement) {
    var elementBG = bookElement.parentElement;
    var hasBook = bookElement.checked;
    if (hasBook) elementBG.className = "hasBook";
    else elementBG.className = "";
}

function UpdateBooksTable() {
    var books = GetLocalStorage();

    var booksTables = document.getElementsByClassName("BooksTable")[0];
    var skills = booksTables.getElementsByClassName("SkillName");

    var existingCategories = Object.keys(books);

    for (let i = 0; i < skills.length; i++) {
        var skillName = skills[i].innerText;
        if (existingCategories.includes(skillName)) {
            volumes.forEach(volume => {
                var bookElement = GetElementFromBookVolume(skillName, volume)
                bookElement.checked = books[skillName][volume];
                ApplyColorToBookTable(bookElement);
            });
        }
    }
}

function ResetBookStorage() {
    console.log("Cleaning all books from storage!");
    var books = GetLocalStorage();
    var categories = Object.keys(books);
    categories.forEach(category => {
        volumes.forEach(vol => {
            books[category][vol] = false;
        });
    });
    SaveToLocalStorage(books);
    UpdateBooksTable();
}