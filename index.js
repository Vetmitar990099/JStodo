let listsContainer = document.querySelector('#lists')
let newlistform = document.querySelector('.newlistform')
let newlistinput = document.querySelector('.newlistinput')
let deletelist = document.querySelector('.deletelist')
let todolistdisplay = document.querySelector('.todolistdisplay')
let todotitle = document.querySelector('.todotitle')
let todolist = document.querySelector('.todolist')
let tasks = document.querySelector('.tasks')
let tasktemplate = document.getElementById('tasktemplate')
let newtaskform = document.querySelector('.newtaskform')
let newtaskinput = document.querySelector('.newtaskinput')
let deletecompletedtask = document.querySelector('.deletecompletedtask')

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

todolist.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
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

deletecompletedtask.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveandrender()
})

newtaskform.addEventListener('submit', e => {
  e.preventDefault()
  const taskname = newtaskinput.value
  if (taskname == null || taskname === '') return
  const task = createtask(taskname)
  newtaskinput.value = null
 const selectedList = lists.find(list => list.id === selectedListId)
 selectedList.tasks.push(task)
  saveandrender()
})

function createlist(name) {
  return {id: Date.now().toString(), name: name, tasks: []}
}

function createtask(name) {
  return {id: Date.now().toString(), name: name, complete: false}
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
  let selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null) {
    todolistdisplay.style.visibility = 'hidden'
  } else {
    todolistdisplay.style.visibility = 'visible'
    todotitle.innerText = selectedList.name
    clearElement(todolist)
    rendertasks(selectedList)
  }
}

function rendertasks(selectedList){
  selectedList.tasks.forEach(tasks => {
    const taskelement = document.importNode(tasktemplate.content, true)
    const checkbox = taskelement.querySelector('input')
    checkbox.id = tasks.id
    checkbox.checked = tasks.complete
    const label = taskelement.querySelector('label')
    label.htmlFor = tasks.id
    label.append(tasks.name)
    todolist.appendChild(taskelement)
  }) 
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