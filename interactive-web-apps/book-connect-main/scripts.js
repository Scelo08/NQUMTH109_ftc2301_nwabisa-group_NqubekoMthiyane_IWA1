import {books,authors,genres, BOOKS_PER_PAGE} from './data.js';

/**
 * @typedef {Object} Book
 * @property {string} id - The unique identifier for the book.
 * @property {string} title - The title of the book.
 * @property {string} author - The ID of the author of the book.
 * @property {string} genre - The ID of the genre of the book.
 * @property {string} image - The URL of the book's cover image.
 * @property {number} price - The price of the book.
 */


  const matches = books;
  let page = 1;

 //used as a guard clause to ensure that the books variable is a valid array
if (!books && !Array.isArray(books)){
    throw new Error('Source required')
}

/*** @typedef {Object} PageRange
 * @property {number} start - The start of the range.
 * @property {number} end - The end of the range.
  */

const range = [0, BOOKS_PER_PAGE];
if (!range && range.length < 2){
    throw new Error('Range must be an array with two numbers')
}

/* @typedef {Object} ColorFix
 * @property {Object} night - The colors for the night theme.
 * @property {string} night.dark - The dark color for the night theme.
 * @property {string} night.light - The light color for the night theme.
 * @property {Object} day - The colors for the day theme.
 * @property {string} day.dark - The dark color for the day theme.
  @property {string} day.light - The light color for the day theme.
  */

const colorFix = {
    night : {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    day : {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
}

const fragment = document.createDocumentFragment()
let extracted = books.slice(0, BOOKS_PER_PAGE)

/**
 * 
 * @typedef {Object} PreviewProps
 * @property {string} author - The ID of the author of the book.
* @property {string} id - The unique identifier for the book.
* @property {string} image - The URL of the book's cover image.
* @property {string} title - The title of the book.
*
 */

const createPreview = (props) => {
    const {author, id, image, title} = props

    const element = document.createElement("button");
    element.classList.add("preview");
    element.dataset.preview = id;
    element.innerHTML = /* html */ `
    <img 
        class="preview__image" 
        src="${image}" 
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
    `;

    return element
};

for (const booksIndex of extracted) {
    const preview = createPreview(booksIndex)
    fragment.appendChild(preview)
}

const itemsList = document.querySelector("[data-list-items]").appendChild(fragment);

//Genres search Fragment.

const genresFragment = document.createDocumentFragment();
const genresOption = document.createElement('option');
genresOption.value = 'any';
genresOption.innerText = 'All Genres';
genresFragment.appendChild(genresOption)

for (const [id]of Object.entries(genres)) {
    const genresOption = document.createElement('option')
    genresOption.value = id
    genresOption.innerText = genres[id]
    genresFragment.appendChild(genresOption)
};

 const genresDropDown = document.querySelector("[data-search-genres]").appendChild(genresFragment);

//Authors Fragment

const authorsFragment = document.createDocumentFragment();
const authorsOption = document.createElement('option');
authorsOption.value = 'any';
authorsOption.innerText = 'All Authors';
authorsFragment.appendChild(authorsOption);

for (const [id] of Object.entries(authors)) {
    const authorsOption = document.createElement('option')
    authorsOption.value = id
    authorsOption.innerText = authors[id]
    authorsFragment.appendChild(authorsOption)
};

const authorsList = document.querySelector(["data-search-authors"]).appendChild(authorsFragment)

//Theme Settings.

document.querySelector('[data-settings-theme]').value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'day' : 'night'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'day' : 'night'

document.documentElement.style.setProperty('--color-dark', colorFix[v].dark); //The document.documentElement property selects you the html element (root element)
document.documentElement.style.setProperty('--color-light', colorFix[v].light);


const settingsCancel = document.querySelector('[data-settings-cancel]')
const settings = document.querySelector('[data-settings-overlay]')

/** * @typedef {Object} RemainingProps
 * The number of books remaining to be loaded. */

const updateRemaining = () => {
    const remaining = books.length - (BOOKS_PER_PAGE * page)
    return remaining;
}

const remaining = matches.length - page * BOOKS_PER_PAGE;
    showmoreButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;

/*@typedef {Object} SettingsButton
 * @property {HTMLButtonElement} settingsCancel - The button to cancel settings.
 * @property {HTMLDivElement} settings - The settings overlay.
 * */
const showSettings = (event) => {
    event.preventDefault()
    settings.showModal()

    settingsCancel.addEventListener('click', () => {
        settings.close()
    })
}

settingsButton.addEventListener('click', showSettings)

/* @typedef {Object} ShowMoreProps
 The click event. */

const showMore = (event) => {
    event.preventDefault()
    page += 1
    const remaining = updateRemaining()
    const hasRemaining = remaining > 0 ? remaining : 0

    const rangeStart = (page - 1) * BOOKS_PER_PAGE
    const rangeEnd = books.length - remaining
    extracted = books.slice(rangeStart, rangeEnd)

    if (hasRemaining > 0) {
        for (const booksIndex of extracted) {
            const preview = createPreview(booksIndex)
            fragment.appendChild(preview)
        }
        
        document.querySelector("[data-list-items]").appendChild(fragment);

        const previewList = document.querySelectorAll('.preview')
        const previewArray = Array.from(previewList)
        for (const preview of previewArray) {
            preview.addEventListener('click', activePreview)
        }
    }
    
    showmoreButton.innerHTML = /* html */ `
    <span>Show more </span>
    <span class="list__remaining">
        (${hasRemaining})
    </span>
    `; 
};

showmoreButton.addEventListener("click", showMore) 

/*@typedef {Object} OptionsButton
 * @property {HTMLButtonElement} optionsButton - The button to open the options menu.
 * @property {HTMLDivElement} optionsMenu - The options menu.
 * @property {HTMLButtonElement} optionsCancel - The button to cancel the options menu.
 * */

const optionsButton = document.querySelector('[data-header-search]')
const optionsMenu = document.querySelector('[data-search-overlay]')
const optionsCancel = document.querySelector('[data-search-cancel]')

/* @typedef {Object} ShowOptionsMenuProps
 * @property {MouseEvent} event - The click event.
*/

const showOptionsMenu = (event) => { // event listerner for formsubmit
    event.preventDefault()
    optionsMenu.showModal()

    optionsCancel.addEventListener('click', () => {  // event
        optionsMenu.close()
    })
}

optionsButton.addEventListener('click', showOptionsMenu)

/*@typedef {Object} DataSearchButton
 * @property {HTMLButtonElement} datasearchButton - The button to submit the search form.
 * @property {HTMLFormElement} dataSearchForm - The search form. */

const datasearchButton = document.querySelector('[data-search-overlay] [type="submit"]')
const dataSearchForm = document.querySelector('[data-search-form]')


dataSearchForm.addEventListener('submit'), (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
}

for (const book of books) {
    const titleMatch = filters.title.trim() !== '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
    const genreMatch = filters.genre !== 'any' && book.genres.includes(filters.genre)
    const authorMatch = filters.author !== 'any' && book.author.includes(filters.author)

    if (titleMatch || authorMatch || genreMatch) {
        result.push(book)
    }
}
const dataListItems = document.querySelector('[data-list-items]')
const dataListButton = document.querySelector('[data-list-button]')
const dataListMessage = document.querySelector('[data-list-message]')



    if (display.length < 1 ){
    data-list-message.class.add('list__message_show')
    }else {
        data-list-message.class.remove('list__message_show')
    }

    function appendFragmentToDataList(fragments, page, matches, hasRemaining){
    const initial = matches.length - [page * BOOKS_PER_PAGE];
    const remaining = hasRemaining ? initial : 0;
    data-list-button.disabled ; initial > 0;

    data-list-button.innerHTML ; /* html */ ` 
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open ; false;

    data-list-items.appendChild(fragments);
}

if (result.length === 0) {
    dataListItems.innerHTML = ''
    showmoreButton.disabled = true 
    dataListMessage.classList.add('list__message_show')

    const remaining = result.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;
} else {
    dataListMessage.classList.remove('list__message_show')
    dataListItems.innerHTML = ''

    const searchStartIndex = (page - 1) * BOOKS_PER_PAGE
    const searchEndIndex = searchStartIndex + BOOKS_PER_PAGE

    const searchBookFragment = document.createDocumentFragment()
    const searchBookExtracted = result.slice(searchStartIndex, searchEndIndex)
};


for (const preview of searchBookExtracted) {
    const showPreview = createPreview(preview)
    searchBookFragment.appendChild(showPreview)
}

dataListItems.appendChild(searchBookFragment)

const remainingBook = result.length - page * BOOKS_PER_PAGE;
dataListButton.innerHTML = /* HTML */ `
<span>Show more</span>
<span class="list__remaining"> (${remainingBook > 0 ? remainingBook : 0})</span>
`;

dataListButton.disabled = remainingBook <= 0;


dataListButton.addEventListener('click', () => {
    page++;

    const moreSearchStartIndex = (page - 1) * BOOKS_PER_PAGE
    const moreSearchEndIndex = moreSearchStartIndex + BOOKS_PER_PAGE

    const moreSearchBookExtracted = result.slice(moreSearchStartIndex, moreSearchEndIndex)

    const moreSearchBookFragment = document.createDocumentFragment()

    for (const preview of moreSearchBookExtracted) {
        const showPreview = createPreview(preview)
        moreSearchBookFragment.appendChild(showPreview)
    }

    dataListItems.appendChild(moreSearchBookFragment);

    const remaining = result.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;

    dataListButton.disabled = remaining <= 0;
})


window.scrollTo({ top: 0, behavior: 'smooth' });

datasearchButton.close()
alert('button was clicked')
dataSearchForm.reset()


const settingsSave = document.querySelector('[data-settings-overlay] [type="submit"]')
const settingsData = document.querySelector('[data-settings-form]')

const saveTheme = (event) => { 
    event.preventDefault()
    const formData = new FormData(settingsData)
    const result = Object.fromEntries(formData)

    document.documentElement.style.setProperty('--color-dark', colorFix[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', colorFix[result.theme].light);
    
    settings.close()
}

settingsSave.addEventListener('click', saveTheme)

const summary = document.querySelector('[data-list-active]')
const summaryClose = document.querySelector('[data-list-close]')
const summaryBackground = document.querySelector('[data-list-blur]')
const summaryImage = document.querySelector('[data-list-image]')
const summaryTitle = document.querySelector('[data-list-title]')
const summarySubtitle = document.querySelector('[data-list-subtitle]')
const summaryDescription = document.querySelector('[data-list-description]')

const activePreview = (event) => {
    event.preventDefault()
    let active

    const bookPreview = event.target.closest('.preview')
    const bookPreviewId = bookPreview.getAttribute('data-preview');
    
    for (const book of books) {
        if (active) break

        if (book.id === bookPreviewId) {
            active = book
        }
    }

    if (!active) return

    const { title, image, description, published, author } = active
    summary.showModal()
    summaryBackground.src = image
    summaryImage.src = image
    summaryTitle.innerText = title
    summarySubtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`
    summaryDescription.innerText = description
    
    summaryClose.addEventListener('click', () => {
        summary.close()
    })
}

const previewList = document.querySelectorAll('.preview')
const previewArray = Array.from(previewList)
for (const preview of previewArray) {
    preview.addEventListener('click', activePreview)
}

      
