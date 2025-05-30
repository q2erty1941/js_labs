const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

let draggedTask = null;


tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
        draggedTask = task;
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        draggedTask = null;
        task.classList.remove('dragging');
    });
});

columns.forEach(column => {
    const dropZone = document.createElement('div');
    dropZone.classList.add('drop-zone');
    column.appendChild(dropZone);

    column.addEventListener('dragover', e => {
        e.preventDefault();
        if (draggedTask) {
            column.classList.add('drag-over');
            dropZone.classList.add('show'); // Показуємо зону скидання
        }
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
        dropZone.classList.remove('show'); // Приховуємо зону скидання
    });

    dropZone.addEventListener('drop', () => {
        column.classList.remove('drag-over');
        dropZone.classList.remove('show');
        if (draggedTask) {
            column.appendChild(draggedTask);
        }
    });

    column.addEventListener('drop', () => {
        column.classList.remove('drag-over');
        dropZone.classList.remove('show');
        if (draggedTask) {
            column.appendChild(draggedTask);
        }
    });
});
