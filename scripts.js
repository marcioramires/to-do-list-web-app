const dateContainer = document.querySelector('.date-container')
const inputElement = document.querySelector('.insert-task-input')
const addTaskButton = document.querySelector('.insert-task-button')

const taskListContainer = document.querySelector('.task-list-container')

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
    const inputIsValid = validateInput()

    if (!inputIsValid) {
        return inputElement.classList.add('error')
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-list')

    const item = document.createElement('p')
    item.classList.add('task-item')
    item.innerText = inputElement.value

    item.addEventListener('click', () => handleClick(item))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('fa-regular')
    deleteItem.classList.add('fa-trash-can')
    deleteItem.classList.add('delete-item')

    deleteItem.addEventListener('click', () => handleClickDelete(taskItemContainer, item))

    taskItemContainer.appendChild(item)
    taskItemContainer.appendChild(deleteItem)
    taskListContainer.appendChild(taskItemContainer)

    inputElement.value = ""

    updateLocalStorage()
}

const handleClick = (item) => {
    const tasks = taskListContainer.childNodes;

    for (const task of tasks) {
        if (task.firstChild === item) {
            task.firstChild.classList.toggle('completed')
        }
    }

    updateLocalStorage()
}

const handleClickDelete = (taskItemContainer, item) => {

    const tasks = taskItemContainer.childNodes;

    for (const task of tasks) {
        if (task.firsChild === item.value) {
            taskItemContainer.remove()
        }
    }

    updateLocalStorage()
}

const handleInputChange = () => {
    const inputIsValid = validateInput()

    if (inputIsValid) {
        return inputElement.classList.remove('error')
    }
}

const updateLocalStorage = () => {
    const tasks = taskListContainer.childNodes

    const localStorageTasks = [...tasks].map((task) => {
        const item = task.firstChild
        const isCompleted = item.classList.contains('completed')

        return { description: item.innerText, isCompleted }
    })

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

const refreshTasksFromLocalStorage = () => {

    const date = document.createElement('h1')
    date.innerText = today.toDateString()
    dateContainer.appendChild(date)

    let tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    if (tasksFromLocalStorage === null) { tasksFromLocalStorage = [] }
    else {
        for (const task of tasksFromLocalStorage) {
            const taskItemContainer = document.createElement('div')
            taskItemContainer.classList.add(('task-list'))

            const item = document.createElement('p')
            item.classList.add('task-item')
            item.innerText = task.description

            if (task.isCompleted) {
                item.classList.add('completed')
            }

            item.addEventListener('click', () => handleClick(item))

            const deleteItem = document.createElement('i')
            deleteItem.classList.add('fa-regular')
            deleteItem.classList.add('fa-trash-can')
            deleteItem.classList.add('delete-item')

            deleteItem.addEventListener('click', () => handleClickDelete(taskItemContainer, item))

            taskItemContainer.appendChild(item)
            taskItemContainer.appendChild(deleteItem)
            taskListContainer.appendChild(taskItemContainer)
        }
    }

}

refreshTasksFromLocalStorage()

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('change', () => handleInputChange())
