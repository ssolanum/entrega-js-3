const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskClick);

document.addEventListener('DOMContentLoaded', loadTasks);

//para agregar un task
function addTask() {
    const taskText = taskInput.value.trim();
    
    // verificar que el usuario no deje el imput vacio
    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    //crear un objeto task
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);

    //vaciar el input
    taskInput.value = '';
}

// eliminar o tachar tasks
function handleTaskClick(e) {
    if (e.target.classList.contains('delete-button')) {
        //eliminar el task
        const taskId = e.target.parentElement.getAttribute('data-id');
        deleteTask(taskId);
    } else if (e.target.tagName === 'LI') {
        //tachar o destachar el task
        const taskId = e.target.getAttribute('data-id');
        toggleTaskCompletion(taskId);
    }
}


function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(addTaskToDOM);
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.setAttribute('data-id', task.id);
    li.classList.toggle('completed', task.completed);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}


function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// para eliminar task
function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.querySelector(`[data-id="${taskId}"]`).remove();
}

function toggleTaskCompletion(taskId) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id == taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.querySelector(`[data-id="${taskId}"]`).classList.toggle('completed');
    }
}
