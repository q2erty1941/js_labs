let tasks = []

const createElement = (tag, props = {}, ...children) => {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([key, val]) => {
        if (key.startsWith('on')) {
            el.addEventListener(key.substring(2).toLowerCase(), val);
        } else if (key === 'className') {
            el.className = val;
        } else {
            el.setAttribute(key, val);
        }
    });
    children.forEach(child =>
        typeof child === 'string'
            ? el.appendChild(document.createTextNode(child))
            : el.appendChild(child)
    );
    return el;
};


const createTask = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
});

const updateTask = (task, updates) => ({
    ...task,
    ...updates,
    updatedAt: new Date()
});

const deleteTask = (taskList, id) => taskList.filter(task => task.id !== id);

const toggleComplete = (task) => updateTask(task, { completed: !task.completed });

const sortTasks = (taskList, criterion) => {
    switch (criterion) {
        case 'date':
            return [...taskList].sort((a, b) => b.createdAt - a.createdAt);
        case 'status':
            return [...taskList].sort((a, b) => a.completed - b.completed);
        case 'update':
            return [...taskList].sort((a, b) => b.updatedAt - a.updatedAt);
        default:
            return taskList;
    }
};



const renderTasks = (taskList) => {
    const listContainer = document.getElementById('todo-list');
    listContainer.innerHTML = '';

    taskList.forEach(task => {
        const taskText = createElement('span', {
            contentEditable: true,
            oninput: (e) => {
                task.text = e.target.innerText;
                task.updatedAt = new Date();
            },
            className: task.completed ? 'completed' : ''
        }, task.text);

        const completeBtn = createElement('button', {
            onclick: () => {
                tasks = tasks.map(t => t.id === task.id ? toggleComplete(t) : t);
                renderTasks(tasks);
            }
        }, task.completed ? '↺' : '✓');

        const deleteBtn = createElement('button', {
            onclick: () => {
                tasks = deleteTask(tasks, task.id);
                renderTasks(tasks);
            }
        }, '🗑');

        const card = createElement('div', {
            className: `todo-item${task.completed ? ' completed' : ''}`
        }, taskText, completeBtn, deleteBtn);

        listContainer.appendChild(card);
    });
};

const init = () => {
    const input = document.getElementById('task-input');
    const addBtn = document.getElementById('add-task-btn');

    addBtn.addEventListener('click', () => {
        if (input.checkValidity() && input.value.trim()) {
            tasks = [...tasks, createTask(input.value.trim())];
            input.value = '';
            renderTasks(tasks);
        } else {
            input.reportValidity();
        }
    });

    document.getElementById('sort-by-date').addEventListener('click', () => {
        renderTasks(sortTasks(tasks, 'date'));
    });

    document.getElementById('sort-by-status').addEventListener('click', () => {
        renderTasks(sortTasks(tasks, 'status'));
    });

    document.getElementById('sort-by-update').addEventListener('click', () => {
        renderTasks(sortTasks(tasks, 'update'));
    });

    renderTasks(tasks);
};

document.addEventListener('DOMContentLoaded', init);
