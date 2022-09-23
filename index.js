let listsContainer = document.querySelector('#lists')
let newlistform = document.querySelector('.newlistform')
let newlistinput = document.querySelector('.newlistinput')
let deletelist = document.querySelector('.deletelist')
let todolistdisplay = document.querySelector('.todolistdisplay')
let todotitle = document.querySelector('.todotitle')
let todolist = document.querySelector('.todolist')
let tasks = document.querySelector('.tasks')

const LOCAL_STORAGE_LIST_KEY = 'list.list'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'list.SelectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
listsContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listid
    saveandrender()
  }
})

deletelist.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveandrender()
})

newlistform.addEventListener('submit', e => {
  e.preventDefault()
  const listname = newlistinput.value
  if (listname == null || listname === '') return
  const list = createlist(listname)
  newlistinput.value = null
  lists.push(list)
  saveandrender()
})

function createlist(name) {
  return {id: Date.now().toString(), name: name, tasks: []}
}

function saveandrender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render() {
  clearElement(listsContainer)
  renderlists()
  const selectedList = lists.find(list.id === selectedListId)
  if (selectedListId == null) {
    tododisplay.style.display = 'flex'
    todotitle.innerText = selectedList.name
  } else {
    tododisplay.style.display = ''
  }
}

function renderlists() {
  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listid = list.id
    listElement.classList.add('listname')
    listElement.innerText = list.name
    if (list.id === selectedListId) 
    {listElement.classList.add('active-list')
    }
    listsContainer.appendChild(listElement)
  }) 
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()