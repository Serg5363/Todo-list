const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const completeAllButton = document.getElementById('complete-all');
const deleteCompletedButton = document.getElementById('delete-completed');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoItem(todoText, isCompleted = false) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        todos.isCompleted = checkbox.checked;
        li.classList.toggle('completed');
        saveTodos();
    });

    label.innerText = todoText;
    label.contentEditable = true;
    label.addEventListener('input', () => {
        todo.text = label.innerText;
        saveTodos();
    });

    deleteButton.innerText = 'Удалить';
    deleteButton.addEventListener('click', () => {
        const index = todos.indexOf(todos);
        if (index !== -1) {
            todos.splice(index, 1);
            li.remove();
            saveTodos();
        }
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    if (isCompleted) {
        li.classList.add('completed');
    }

    return li;
}

function renderTodos() {
    todoList.innerHTML = '';

    for (const todo of todos) {
        const li = createTodoItem(todo.text, todo.isCompleted);
        todoList.appendChild(li);
    }
}

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

completeAllButton.addEventListener('click', () => {
    for (const todo of todos) {
        todo.isCompleted = true;
    }
    renderTodos();
    saveTodos();
});

deleteCompletedButton.addEventListener('click', () => {
todos = todos.filter((todo) => !todo.isCompleted);
renderTodos();
saveTodos();
});

renderTodos();
