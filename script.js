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




let bookmarks = [];

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

    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    } else {
        bookmarks = [{


            name: 'egydes',
            url: 'https://www.egydes.com',
        }, ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();


}


function storeBookmark(e) {
    e.preventDefault();

    const sitename = websiteNameEl.value;
    let siteUrl = websiteUrlEl.value;

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

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    ShowBookmarks();
    bookmarkForm.reset();
}

fetchBookmarks();


function buildBookmarks() {
    bookmarks.forEach((bookmark) => {



        const item = document.createElement('div');
        item.classList.add('item');
        const deleteButton = document.createElement('i');

        deleteButton.className = 'far fa-times-circle';

        deleteButton.setAttribute('id', 'delete');
        const name = document.createElement('div');
        name.classList.add('name');
        const img = document.createElement('img');
        img.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`);

        const link = document.createElement('a');
        link.setAttribute('href', `${bookmark.url}`);
        link.setAttribute('target', '_blank');
        link.textContent = bookmark.name;


        name.appendChild(img);
        name.appendChild(link);
        item.appendChild(name);
        item.appendChild(deleteButton);

        bookmarksContainer.appendChild(item);









    })
}

const deleteButtons = document.querySelectorAll('#delete');

deleteButtons.forEach((delbt) => {



    delbt.addEventListener('click', (e) => {
        let key = e.target.parentElement.querySelector('a').textContent;
        let value = e.target.parentElement.querySelector('a').getAttribute('href');
        localStorage.removeItem('bookmarks', JSON.stringify({ name: key, url: value }));

        e.target.parentElement.remove();

    });

})