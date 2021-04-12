"use strict"

const CTRL_KEY_CODE = 17;
const Z_KEY_CODE = 90;

const TODO_TITLE_CLASS = "todo-title-class";
const FINISH_DATE_CLASS = "finish-date-class";

let keyGenerator = 0;
let lastRemovedElement = null;
let ctrlClicked = false;

/* jQuery */

$(document).ready(() => {
    $(document).on('keydown', ({keyCode}) => {
        if(keyCode === CTRL_KEY_CODE) {
            ctrlClicked = true;
        } else if(keyCode === Z_KEY_CODE && ctrlClicked) {
            lastRemovedElement.appendTo($("ul#todo-list"));
            addOnRemoveClicked(lastRemovedElement.find('button'), lastRemovedElement);
            ctrlClicked = false;
        } else {
            ctrlClicked = false;
        }
    });
});

const addRemoveItemButton = (listItem) => {
    let removeButton = $('<button>x</button>');
    $(listItem).prepend(removeButton);
    
    addOnRemoveClicked(removeButton, listItem);
}

const addOnRemoveClicked = (removeButton, listItem) => {
    $(removeButton).on('click', (event) => {
        event.stopPropagation();
        lastRemovedElement = $(listItem);
        $(listItem).remove();
    });
}

/* js */

const listItemClickHandler = (listItem) => {

    return () => {
        const [finishDateElement] = listItem.getElementsByClassName(FINISH_DATE_CLASS);
    
        listItem.classList.toggle('checked');

        if (listItem.classList.contains('checked')) {
            finishDateElement.textContent = new Date().toDateString();
        } else {
            finishDateElement.textContent = "";
        }
    }
}

const addItem = () => {
    let createItemInputValue = document.getElementById("create-item-input").value;

    if (createItemInputValue == null || createItemInputValue.trim() === "") {
        alert("Item name must not be blank!");
    } else {
        let todoList = document.getElementById("todo-list");

        let listItem = document.createElement("li");
        let taskTitle = document.createElement('div');
        let finishDate = document.createElement('div');

        taskTitle.classList.add(TODO_TITLE_CLASS);
        finishDate.classList.add(FINISH_DATE_CLASS);

        taskTitle.textContent = document.getElementById("create-item-input").value;
        finishDate.classList.add('date');

        listItem.id = keyGenerator++;
        listItem.appendChild(taskTitle);
        listItem.appendChild(finishDate);
        addRemoveItemButton(listItem);

        listItem.addEventListener('click', listItemClickHandler(listItem), false);

        todoList.appendChild(listItem);
    }
}

