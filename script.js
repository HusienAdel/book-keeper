const modal = document.querySelector("#modal");
// button
const modalShow = document.querySelector("#show-modal");
//close modal
const modalClose = document.querySelector("#close-modal");
// boomark form
const bookmarkForm = document.querySelector("#bookmark-form");
// website name input
const websiteNameEl = document.querySelector("#website-name");
// website url
const websiteUrlEl = document.querySelector("#website-url");
// bookmar container
const bookmarksContainer = document.querySelector("#bookmarks-container");

let bookmarks = {};

modalShow.addEventListener("click", showModal);

function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

modalClose.addEventListener("click", () => {
    modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
    e.target.classList.contains("modal-container")
        ? modal.classList.remove("show-modal")
        : false;
});


function validate(siteName, siteUrl) {
    const expression =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    const regex = new RegExp(expression);

    if (!siteName || !siteUrl) {
        alert("please enter data");
        return false;
    }

    if (!siteUrl.match(regex)) {
        alert("please enter valid  url ");
        return false;
    }
    return true;
}

function fetchBookmarks() {
    if (localStorage.getItem('bookmarks') !== "[]" && localStorage.getItem('bookmarks') !== null) {

        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else  {
        const id ='https://www.egydes.com';
        bookmarks[id] = 
            {
            name: "egydes",
            url: "https://www.egydes.com"
        };
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    }
    buildBookmarks();
}

function storeBookmark(e) {
    e.preventDefault();

    let sitename = websiteNameEl.value.trim();
    let siteUrl = websiteUrlEl.value.trim();

    if (!siteUrl.includes("http://") && !siteUrl.includes("https://")) {
        siteUrl = `https://${siteUrl}`;
    }
    if (!validate(sitename, siteUrl)) {
        return false;
    }

    const bookmark = {
       
        name: sitename,
        url: siteUrl
       
    };

    bookmarks[siteUrl] = bookmark;
    

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    
    bookmarkForm.reset();
}


function buildBookmarks() {
    bookmarksContainer.textContent = '';

    Object.keys(bookmarks).forEach((id) => {

   
        const bookname = bookmarks[id].name,
            bookurl = bookmarks[id].url;
       

        const item = document.createElement("div");
        item.classList.add("item");
        const deleteButton = document.createElement("i");

        deleteButton.className = "far fa-times-circle";

        deleteButton.setAttribute("id", "delete");



        deleteButton.setAttribute('onclick', `deleteBookmark('${id}')`);


        const name = document.createElement("div");
        name.classList.add("name");
        const img = document.createElement("img");
        img.setAttribute(
            "src",
            `https://s2.googleusercontent.com/s2/favicons?domain=${bookurl}`
        );

        const link = document.createElement("a");
        link.setAttribute("href", `${bookurl}`);
        link.setAttribute("target", "_blank");
        link.textContent = bookname;

        name.append(img);
        name.append(link);
        item.append(name);
        item.append(deleteButton);

        bookmarksContainer.appendChild(item);
    });



}


function deleteBookmark(id) {
    
        if (bookmarks[id]) {
            delete bookmarks[id];
        }
   

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}

bookmarkForm.addEventListener("submit", storeBookmark);


fetchBookmarks();