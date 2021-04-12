"use strict"

const CTRL_KEY_CODE = 17;
const Z_KEY_CODE = 90;

const TODO_TITLE_CLASS = "todo-title-class";
const FINISH_DATE_CLASS = "finish-date-class";

const MODAL_CONTAINER_ID = "modal-delete-item-container";
const MODAL_DECLINE_DELETE_BUTTON_ID = "modal-decline-delete-button";
const MODAL_CONFIRM_DELETE_BUTTON_ID = "modal-confirm-delete-button";
const TODO_LIST_ID = "todo-list";
const CREATE_ITEM_INPUT_ID = "create-item-input";

let keyGenerator = 0;
let lastRemovedElement = null;
let elementToRemove = null;
let ctrlClicked = false;

/* jQuery */

$(document).ready(() => {
    $(document).on('keydown', ({keyCode}) => {
        if(keyCode === CTRL_KEY_CODE) {
            ctrlClicked = true;
        } else if(keyCode === Z_KEY_CODE && ctrlClicked) {
            lastRemovedElement.appendTo($("ul#" + TODO_LIST_ID));
            addOnRemoveClicked(lastRemovedElement.find('button'), lastRemovedElement);
            ctrlClicked = false;
        } else {
            ctrlClicked = false;
        }
    });

    $("#" + MODAL_DECLINE_DELETE_BUTTON_ID).on('click', () => {
        elementToRemove = null;
        $("#" + MODAL_CONTAINER_ID).addClass('hidden');
    });

    $("#" + MODAL_CONFIRM_DELETE_BUTTON_ID).on('click', () => {
        lastRemovedElement = elementToRemove;
        elementToRemove.remove();  
        elementToRemove = null;    
        $("#" + MODAL_CONTAINER_ID).addClass('hidden');
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
        elementToRemove = $(listItem);
        $("#" + MODAL_CONTAINER_ID).removeClass('hidden');
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
    let createItemInputValue = document.getElementById(CREATE_ITEM_INPUT_ID).value;

    if (createItemInputValue == null || createItemInputValue.trim() === "") {
        alert("Item name must not be blank!");
    } else {
        let todoList = document.getElementById(TODO_LIST_ID);

        let listItem = document.createElement("li");
        let taskTitle = document.createElement('div');
        let finishDate = document.createElement('div');

        taskTitle.classList.add(TODO_TITLE_CLASS);
        finishDate.classList.add(FINISH_DATE_CLASS);

        taskTitle.textContent = createItemInputValue;
        finishDate.classList.add('date');

        listItem.id = keyGenerator++;
        listItem.appendChild(taskTitle);
        listItem.appendChild(finishDate);
        addRemoveItemButton(listItem);

        listItem.addEventListener('click', listItemClickHandler(listItem), false);

        todoList.appendChild(listItem);
    }
}

