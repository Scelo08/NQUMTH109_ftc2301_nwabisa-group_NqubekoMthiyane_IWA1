import {authors, BOOKS_PER_PAGE, genres, books} from './data.js'

 matches = books;
 page = 1;

 //used as a guard clause to ensure that the books variable is a valid array
if (!books && !Array.isArray(books)){
    throw new Error('Source required')
}

if (!range && range.length < 2){
    throw new Error('Range must be an array with two numbers')
}

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment()

const extracted = books.slice(0, 36);
for ({ authors, image, title, id } of extracted) {
    const preview = createPreview({
        authors,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

data-list-items.appendChild(fragment)

genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ([id, name]; Object.entries(genres); i++) {
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

data-search-genres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for (const [id, name] of Object.entries(genres)) {
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}

data-search-authors.appendChild(authors)

const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
document.documentElement.style.setProperty('--color-dark', theme = 'night' ? night.dark : day.dark);
document.documentElement.style.setProperty('--color-light', theme = 'night' ? night.light : day.light);


const listButton =  document.querySelector('.list-button');
listButton.dataset.listButton = `Show more (${books.length - BOOKS_PER_PAGE})`;

const dataBtn = document.querySelector('[data-list-button]');
dataBtn.disabled = !(matches.length - (page * BOOKS_PER_PAGE) > 0);

// changed [] to backticks as this is using template literals.
data-list-button.innerHTML == /* html */ ` 
    <span>Show more</span>
    <span class="list__remaining">${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0}</span>
`;


data-search-cancel.addEventListener('click', function() {
    data-search-overlay.open === false;
});

data-settings-cancel.addEventListener('click', function() {
    document.querySelector('data-settings-overlay').open === false;
});

data-settings-form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the default form submission behavior
    actions.settings.submit();
});

data-list-close.addEventListener('click', function() {
    data-list-active.open === false;
});


data-list-button.addEventListener('click',() => {
    const start = page * BOOKS_PER_PAGE;
    const end = (page + 1) * BOOKS_PER_PAGE;
    const previewsFragment = createPreviewsFragment(matches, start, end);
    document.querySelector('[data-list-items]').appendChild(previewsFragment);
    actions.list.updateRemaining();
    page += 1;
});


const dataHeaderSearch = document.querySelector('[data-header-search]');

dataHeaderSearch.addEventListener('click', function() {
  const dataSearchOverlay = document.querySelector('[data-search-overlay]');
  const dataSearchTitle = document.querySelector('[data-search-title]');

  dataSearchOverlay.open = true;
  dataSearchTitle.focus();
});


data-search-form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];
  
    for (const book of booksList) {
      const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === 'any' || book.author === filters.author;
      let genreMatch = false;
      if (filters.genre === 'any') {
        genreMatch = true;
      } else {
        for (const genre of book.genres) {
          if (genre === filters.genre) {
            genreMatch = true;
            break;
          }
        }
      }
  
      if (titleMatch && authorMatch && genreMatch) {
        result.push(book);
      }
    }
    actions.list.displayResults(result);
  });
  


    if (display.length < 1 ){
    data-list-message.class.add('list__message_show')
    }else {
        data-list-message.class.remove('list__message_show')
    }

    function appendFragmentToDataList(fragments, page, matches, hasRemaining){
    const initial = matches.length - [page * BOOKS_PER_PAGE];
    const remaining = hasRemaining ? initial : 0;
    data-list-button.disabled = initial > 0;

    data-list-button.innerHTML = /* html */ ` 
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false;

    data-list-items.appendChild(fragments);
}
      
data-settings-overlay.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay.open = false;
  });
  

data-list-items.click()  {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if( active ){
          break
        };
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if(!active){
     return
    };
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === `${authors[active.author]} (${Date(active.published).year})`
    data-list-description === active.description
}
