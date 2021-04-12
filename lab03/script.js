"use strict"

const TODO_TITLE_CLASS = "todo-title-class";
const FINISH_DATE_CLASS = "finish-date-class";

let keyGenerator = 0;

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

const createTextChildView = (parentView, text, styleClass) => {
    let childElement = document.createElement('span'); //TODO remove span
    let childElementText = document.createTextNode(text);

    childElement.classList.add(styleClass); //TODO replace with push 

    parentView.appendChild(childElement);
    childElement.appendChild(childElementText);
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

        listItem.appendChild(taskTitle);
        listItem.appendChild(finishDate);

        listItem.addEventListener('click', listItemClickHandler(listItem), true);

        todoList.appendChild(listItem);
    }
}

