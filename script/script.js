'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

todoData = JSON.parse(localStorage.getItem('local'));

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');

    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    })

    let jsonStr = JSON.stringify(todoData);
    localStorage.setItem('local', jsonStr);

    const btnDeleteItem = li.querySelector('.todo-remove');
    btnDeleteItem.addEventListener('click', function () {
      const removeItem = todoData.indexOf(item);
      todoData.splice(removeItem, 1);
      render();
    })


  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if (headerInput.value !== '') {
    todoData.push(newTodo);
    headerInput.value = '';

  }
  render();
});
render();


