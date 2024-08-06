// Function to save/load local storage and basic todo list functionality

document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('text-input');
  const submitButton = document.querySelector('.input button');
  const itemsList = document.querySelector('.items-list');

  loadTodoList();

  submitButton.addEventListener('click', addItem);
  inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          addItem();
      }
  });

  function addItem() {
      const newItemText = inputField.value.trim();

      if (newItemText === '') return;

      const newItem = createTodoItem(newItemText, false);
      itemsList.appendChild(newItem);

      inputField.value = '';

      saveTodoList();
  }

  function createTodoItem(text, isChecked) {
      const newItem = document.createElement('li');
      const itemText = document.createElement('p');
      itemText.textContent = text;

      if (isChecked) {
          itemText.style.textDecoration = 'line-through';
      }

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.50006 5.5L4.05262 10.7909C3.71387 11.3107 3.69732 11.9772 4.00984 12.5133L7.50006 18.5H18.8588C19.7651 18.5 20.4999 17.7653 20.4999 16.8589V7.14109C20.4999 6.23474 19.7651 5.5 18.8588 5.5H7.50006Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 8.5L17 15.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 15.5L16.9303 8.49996" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
      deleteButton.addEventListener('click', () => {
          newItem.remove();
          saveTodoList();
      });

      const checkButton = document.createElement('button');
      checkButton.innerHTML = '<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
      checkButton.addEventListener('click', () => {
          itemText.style.textDecoration = itemText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
          saveTodoList();
      });

      newItem.appendChild(itemText);
      newItem.appendChild(checkButton);
      newItem.appendChild(deleteButton);

      return newItem;
  }

  function saveTodoList() {
      const items = [];
      itemsList.querySelectorAll('li').forEach(item => {
          const text = item.querySelector('p').textContent;
          const isChecked = item.querySelector('p').style.textDecoration === 'line-through';
          items.push({ text, isChecked });
      });
      localStorage.setItem('todoList', JSON.stringify(items));
  }

  function loadTodoList() {
      const savedItems = JSON.parse(localStorage.getItem('todoList'));
      if (savedItems) {
          savedItems.forEach(item => {
              const newItem = createTodoItem(item.text, item.isChecked);
              itemsList.appendChild(newItem);
          });
      }
  }
});


// Initial bounce on page load
document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('bounce');
            setTimeout(() => {
                letter.classList.remove('bounce');
            }, 500); 
        }, index * 50); 
    });
});

// Script to initiate the bounce effect on mobile with touch
document.addEventListener("DOMContentLoaded", function() {
    const letters = document.querySelectorAll('.letters');
  
    letters.forEach(letter => {
      letter.addEventListener('touchstart', () => {
        letter.classList.add('bounce');
      });
  
      letter.addEventListener('touchmove', () => {
        letter.classList.add('bounce');
      });
  
      letter.addEventListener('touchend', () => {
        setTimeout(() => {
          letter.classList.remove('bounce');
        }, 1000); 
      });
    });
  });
