document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "557eefe2-d52f-4386-a63f-3582e64b94a4";
    const hostAddress = "https://todo-api.coderslab.pl";
    const mainElement = document.querySelector("main");

    // Display tasks with operations

    // Functions responsible for interaction with api
    // fetch data - generic function that returns data in json format based on url passed
    function fetchDataFromApi(apiUrl) {
        return fetch(apiUrl, {
            headers: {
                method: 'get',
                Authorization: apiKey,
            }
        }).then(function (response) {
            if (!response.ok) {
                console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            } else {
                return response;
            }
        })
            .then(function (response) {
                return response.json();
            });
    }

    // get all tasks
    function getTasks() {
        const getTasksUrl = hostAddress + "/api/tasks"
        return fetchDataFromApi(getTasksUrl);
    }

    // function to get Operations for specific task
    function apiListOperationsForTask(taskId) {
        const url = hostAddress + "/api/tasks/" + taskId + "/operations";
        return fetchDataFromApi(url);
    }
    // End of functions responsible for interaction with api


    //  tag creation functions begin

    // tag creation generic function
    function createTagElement(tagType, parentElement, className = "", innerText = "") {
        const element = document.createElement(tagType);
        element.className = className;
        element.innerText = innerText;
        parentElement.appendChild(element);
        return element;
    }

    // form creation function used in renderTask() function
    function createOperationAddingForm(parentElement) {
        const formContainerDiv = createTagElement("div", parentElement, "card-body");
        const formElement = createTagElement("form", formContainerDiv);
        const inputDiv = createTagElement("div", formElement, "input-group");
        const inputTag = createTagElement("input", inputDiv, "form-control");
        inputTag.type = "text";
        inputTag.placeholder = "Operation description";
        inputTag.minLength = "5";

        const buttonDivWrapper = createTagElement("div", inputDiv, "input-group-append");
        const addOperationButton = createTagElement("button", buttonDivWrapper, "btn btn-info", "Add");
    }

    // main function combining creation of tasks with operations for given task
    function displayTasks() {
        getTasks()
            .then(function (response) {
                response.data.forEach(function (task) {
                    renderTask(task);
                })
            })
    }

    // helper function for displayTasks() function
    function renderTask(task) {
        let taskId = task.id;
        let taskTitle = task.title;
        let taskDescription = task.description;
        let taskStatus = task.status;

        const section = createTagElement("section", mainElement, "card mt-5 shadow-sm");
        const headerDiv = createTagElement("div", section, 'card-header d-flex justify-content-between align-items-center')
        const headerLeftDiv = createTagElement("div", headerDiv);
        createTagElement("h5", headerLeftDiv, "", taskTitle);
        createTagElement("h6", headerLeftDiv, "card-subtitle text-muted", taskDescription);
        const headerRightDiv = createTagElement("div", headerDiv);

        const ulElement = createTagElement("ul", section, "list-group list-group-flush");

        displayOperations(taskId, section, ulElement, taskStatus);

        if (taskStatus === "open") {
            const finishButton = createTagElement("button", headerRightDiv, 'btn btn-dark btn-sm js-task-open-only', "Finish");
            createOperationAddingForm(section);

        }

        const deleteButton = createTagElement("button", headerRightDiv, 'btn btn-outline-danger btn-sm ml-2', "Delete");


    }

    // renderOperations() helper functions begin
    function formatTime(time) {
        let hours = Math.floor(time / 60);
        if (hours === 0) {
            return time + "m";
        }

        let minutes = time - (hours * 60);
        return hours + "h " + minutes + "m";
    }


    // main displayOperations() function which is used in renderTask() function
    function displayOperations(taskId, sectionTag, operationListTag, taskStatus) {
        apiListOperationsForTask(taskId)
            .then(function (json) {
                return json.data;
            })
            .then(function (data) {
                data.forEach(function (operation) {
                    renderOperation(operationListTag, sectionTag, operation, taskStatus);
                })
            })
    }

    // function that is used in main displayOperations() function
    function renderOperation(operationListTag, sectionTag, data, taskStatus) {
        let timeSpent = formatTime(data.timeSpent);
        let description = data.description;
        const li = createTagElement("li", operationListTag, "list-group-item d-flex justify-content-between align-items-center");
        const descriptionDiv = createTagElement("div", li, "", description);
        const time = createTagElement("time", descriptionDiv, "badge badge-success badge-pill ml-2", timeSpent);
        if (taskStatus !== "closed") {
            const buttonDiv = createTagElement("div", li);
            const addMinutesButton = createTagElement("button", buttonDiv, "btn btn-outline-success btn-sm mr-2", "+15m");
            const addHourButton = createTagElement("button", buttonDiv, "btn btn-outline-success btn-sm mr-2", "+1h");
            const deleteButton = createTagElement("button", buttonDiv, "btn btn-outline-danger btn-sm", "Delete");
        }
    }


    displayTasks();


})