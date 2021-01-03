import swal from 'sweetalert';

class App {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('list_todos')) || [];

        this.btnAddTodo = document.getElementById('btn-add-todo');
        this.btnDeleteAllTodos = document.getElementById('btn-clear-todos');
        
        this.registerEvents();
        this.renderTodos();
    }

    registerEvents() {
        this.btnAddTodo.onclick = () => this.addTodo();
        this.btnDeleteAllTodos.onclick = () => this.deleteAllTodos();
    }

    addTodo() {
        let todoTextInput = document.querySelector('.add-todo input').value;

        if (!todoTextInput.length) {
            swal('Please, write a to-do.');
            return;
        };
    
        this.todos.push(todoTextInput);

        this.renderTodos();
        this.saveToStorage();
        this.clearInput();
    }

    renderTodos() {
        const listElement = document.querySelector('.todos-list ul');
        listElement.innerHTML = '';
    
        for (const todo of this.todos) {
            const todoElement = document.createElement('li');
            const todoText = document.createTextNode(todo);
            const linkElement = document.createElement('a');
            const linkText = document.createTextNode('Delete');
            const pos = this.todos.indexOf(todo);
    
            linkElement.setAttribute('href', '#');
            linkElement.onclick = () => this.deleteTodo(`${pos}`);
    
            linkElement.appendChild(linkText);
            todoElement.appendChild(todoText);
            todoElement.appendChild(linkElement);
            listElement.appendChild(todoElement);
        }
    }

    saveToStorage() {
        localStorage.setItem('list_todos', JSON.stringify(this.todos));
    };

    clearInput() {
        document.querySelector('.add-todo input').value = '';
    }

    deleteTodo(pos) {
        swal({
            text: "Are you sure you want to delete this to-do?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.todos.splice(pos, 1);

                this.renderTodos();
                this.saveToStorage();
                
                swal("To-do deleted!", {
                    icon: "success",
                });
            } else {
                swal("Don't worry, your to-do is still here :)");
            }
        });
    }

    deleteAllTodos() {
        swal({
            title: "Are you sure you want to delete all tasks?",
            text: "Once deleted, you will not be able to recover",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.clear();
                this.todos.length = 0;
                document.getElementsByTagName('ul')[0].innerHTML = '';
                
                swal({
                    title: "Done!",
                    text: "All tasks has been deleted!",
                    icon: "success",
                });
            } else {
                swal("Your tasks are still here :)");
            }
          });
    }
}

new App();