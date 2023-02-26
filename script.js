const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const completeAllButton = document.getElementById('complete-all');
const deleteCompletedButton = document.getElementById('delete-completed');

// Загрузите существующие задачи из локального хранилища
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Функция для сохранения задач в локальном хранилище
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Функция для создания нового элемента todo
function createTodoItem(todoText, isCompleted = false) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteButton = document.createElement('button');

    // Установите checkbox
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        todos.isCompleted = checkbox.checked;
        li.classList.toggle('completed');
        saveTodos();
    });

    // Настройте label
    label.innerText = todoText;
    label.contentEditable = true;
    label.addEventListener('input', () => {
        todo.text = label.innerText;
        saveTodos();
    });

    // Настройте кнопку удаления
    deleteButton.innerText = 'Удалить';
    deleteButton.addEventListener('click', () => {
        const index = todos.indexOf(todos);
        if (index !== -1) {
            todos.splice(index, 1);
            li.remove();
            saveTodos();
        }
    });

    // Добавьте элементы в li
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    // Добавьте завершенный класс, если это необходимо
    if (isCompleted) {
        li.classList.add('completed');
    }

    return li;
}

// Функция для отображения задач на странице
function renderTodos() {
    // Удалите существующие элементы todo
    todoList.innerHTML = '';

    // Создайте новый элемент todo для каждого todo в массиве
    for (const todo of todos) {
        const li = createTodoItem(todo.text, todo.isCompleted);
        todoList.appendChild(li);
    }
}

// Прослушиватель событий для добавления нового todo
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todo = { text: todoText, isCompleted: false };
        todos.push(todo);
        const li = createTodoItem(todoText);
        todoList.appendChild(li);
        todoInput.value = '';
        saveTodos();
    }
});

// Прослушиватель событий для завершения всех задач
completeAllButton.addEventListener('click', () => {
    for (const todo of todos) {
        todo.isCompleted = true;
    }
    renderTodos();
    saveTodos();
});

// Прослушиватель событий для удаления завершенных задач
deleteCompletedButton.addEventListener('click', () => {
todos = todos.filter((todo) => !todo.isCompleted);
renderTodos();
saveTodos();
});

// Визуализировать первоначальный список задач
renderTodos();