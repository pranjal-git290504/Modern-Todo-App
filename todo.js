// Todo App JavaScript Code
// Global variable to maintain the whole todolist
let todoList = [];

// Load todos from memory (since localStorage isn't available)
function loadTodos() {
    // In a real environment, this would load from localStorage
    // For now, we'll start with an empty array
}

// Save todos to memory
function saveTodos() {
    // In a real environment, this would save to localStorage
    // localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Initialize the app
loadTodos();
displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value.trim();
    let todoDate = dateElement.value;

    if (todoItem === '') {
        alert('Please enter a todo item!');
        return;
    }

    todoList.push({
        item: todoItem,
        dueDate: todoDate,
        completed: false,
        id: Date.now() // Simple ID generation
    });

    saveTodos();
    inputElement.value = '';
    dateElement.value = '';
    displayItems();

    // Add a subtle animation feedback
    inputElement.style.transform = 'scale(0.98)';
    setTimeout(() => {
        inputElement.style.transform = 'scale(1)';
    }, 100);
}

function displayItems() {
    let containerElement = document.querySelector('#todo-container');
    
    if (todoList.length === 0) {
        containerElement.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <div class="empty-text">No tasks yet!</div>
                <div class="empty-subtext">Add a task above to get started</div>
            </div>
        `;
        return;
    }

    let newHtml = '';
    for (let i = 0; i < todoList.length; i++) {
        let todo = todoList[i];
        let item = todo.item;
        let dueDate = todo.dueDate || 'No due date';
        let completedClass = todo.completed ? 'completed' : '';
        
        // Format date for display
        let displayDate = dueDate;
        if (dueDate !== 'No due date') {
            let date = new Date(dueDate);
            displayDate = date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }

        newHtml += `
            <div class="todo-item ${completedClass}">
                <div class="todo-content">
                    <div class="todo-text">${item}</div>
                    <div class="todo-date">
                        <svg class="date-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                        </svg>
                        ${displayDate}
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" onclick="editTodo(${i})">
                        ✏️ Edit
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${i})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }
    containerElement.innerHTML = newHtml;
}

function editTodo(i) {
    let newItem = prompt("Edit your todo item:", todoList[i].item);
    if (newItem !== null && newItem.trim() !== "") {
        let newDate = prompt("Edit due date (YYYY-MM-DD format):", todoList[i].dueDate);
        todoList[i].item = newItem.trim();
        if (newDate !== null) {
            todoList[i].dueDate = newDate;
        }
        saveTodos();
        displayItems();
    }
}

function deleteTodo(i) {
    if (confirm("Are you sure you want to delete this task?")) {
        todoList.splice(i, 1);
        saveTodos();
        displayItems();
    }
}

// Add some sample todos for demonstration
// if (todoList.length === 0) {
//     todoList = [
//         { item: "Complete project documentation", dueDate: "2025-06-10", completed: false, id: 1 },
//         { item: "Review code changes", dueDate: "2025-06-08", completed: false, id: 2 },
//         { item: "Team meeting at 3 PM", dueDate: "2025-06-07", completed: true, id: 3 }
//     ];
//     displayItems();
// }
