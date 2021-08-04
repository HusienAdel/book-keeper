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

modalShow.addEventListener("click", showModal);

function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

modalClose.addEventListener("click", () => {
    modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
    e.target.classList.contains("modal-container") ?
        modal.classList.remove("show-modal") :
        false;
});

bookmarkForm.addEventListener("submit", storeBookmark);

function validate(siteName, siteUrl) {
    const expression =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    const regex = new RegExp(expression);
    if (siteUrl.match(regex)) {
        alert("match");
    }

    if (!siteUrl.match(regex)) {
        alert("please privid url ");
    }
}

function storeBookmark(e) {
    e.preventDefault();

    const sitename = websiteNameEl.value;
    let siteUrl = websiteUrlEl.value;

    validate(siteUrl, sitename);

    bookmarkForm.reset();
}