const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmars-container')

let bookmarks = []

// Show Modal, Focus on Input

function showModal() {
  modal.classList.add('show-modal')
  websiteNameEl.focus()
}

// Validate Form

function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const regex = new RegExp(expression)
  if (!nameValue || !urlValue) {
    alert('Please submit value for both fields')
    return false
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address')
    return false
  }
  // Valid
  return true
}

// Build Bookmarks DOM

function buildBookmarks() {
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark
    console.log(name, url)
  })
}

// Modal Event Listener
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => {
  modal.classList.remove('show-modal')
})
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false
})

// Fetch Bookmarks
function fetchBookMarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  } else {
    // Create bookamrks array in localStorage
    bookmarks = [
      {
        name: 'Kevin Portfolio',
        url: 'https://ks603.github.io/Portfolio/',
      },
    ]
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  buildBookmarks()
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault()
  const nameValue = websiteNameEl.value
  let urlValue = websiteUrlEl.value
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `http://${urlValue}`
  }
  if (!validate(nameValue, urlValue)) {
    return false
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  }
  bookmarks.push(bookmark)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  fetchBookMarks()
  bookmarkForm.reset()
  websiteNameEl.focus()
}

// Event listener
bookmarkForm.addEventListener('submit', storeBookmark)

// On Load, Fetch Bookmarks

fetchBookMarks()
