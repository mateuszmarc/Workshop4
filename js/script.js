document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "557eefe2-d52f-4386-a63f-3582e64b94a4";
    const hostAddress = "https://todo-api.coderslab.pl";
    const mainElement = document.querySelector("main");

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

    // function to get all tasks
    function getTasks() {
        const getTasksUrl = hostAddress + "/api/tasks"
        return fetchDataFromApi(getTasksUrl);
    }


    // tage creation generic functions
    function createTagElement(tagType, parentElement, className) {
        const element = document.createElement(tagType);
        element.className = className;
        parentElement.appendChild(element);
        return element;
    }

    function createTagElementWithText(tagType, parentElement, className, innerText) {
        const element = createTagElement(tagType, parentElement, className);
        element.innerText = innerText;
        return element;
    }

    //  tag creation functions begin

    function renderTask(task) {
        let taskId = task.id;
        console.log(taskId);
        let taskTitle = task.title;
        let taskDescription = task.description;
        let taskStatus = task.status;

        const section = createTagElement("section", mainElement, "mt-5 shadow");
        const headerDiv = createTagElement("div", section, 'card-header d-flex justify-content-between align-items-center')
        const headerLeftDiv = createTagElement("div", headerDiv, "");
        createTagElementWithText("h5", headerLeftDiv, "", taskTitle);
        createTagElementWithText("h6", headerLeftDiv, "card-subtitle text-muted", taskDescription);
        const headerRightDiv = createTagElement("div", headerDiv, "");

        if (taskStatus === "open") {
            const finishButton = createTagElementWithText("button", headerRightDiv, 'btn btn-dark btn-sm js-task-open-only', "Finish");
        }

        const deleteButton = createTagElementWithText("button", headerRightDiv, 'btn btn-outline-danger btn-sm ml-2', "Delete");
        const ulElement = createTagElement("ul", section, "");

        displayOperations(taskId, ulElement, taskStatus);
    }


    function displayTasks() {
        getTasks()
            .then(function (response) {
                response.data.forEach(function (task) {
                    renderTask(task);
                })
            })
    }

    // renderOperations helper functions begin
    function formatTime(time) {
        let hours = Math.floor(time / 60);
        if (hours === 0) {
            return time + "m";
        }

        let minutes = time - (hours * 60);
        return hours + "h " + minutes + "m";
    }
    // renderOperation helper functions end

    // function to get Operations for specific task
    function apiListOperationsForTask(taskId) {
        const url = hostAddress + "/api/tasks/" + taskId + "/operations";
        return fetchDataFromApi(url);
    }

    // main displayOperations function
    function displayOperations(taskId, operationListTag, taskStatus) {
        apiListOperationsForTask(taskId)
            .then(function (json) {
                return json.data;
            })
            .then(function (data) {
                data.forEach(function (operation) {
                    renderOperation(operationListTag, operation, taskStatus);
                })
            })
    }

    function renderOperation(operationListTag, data, taskStatus) {
        let timeSpent = formatTime(data.timeSpent);
        const li = createTagElement("li", operationListTag, "list-group-item d-flex justify-content-between align-items-center");
        const descriptionDiv = createTagElement("div", li, "");
        const time = createTagElementWithText("time", li, "badge badge-success badge-pill ml-2", timeSpent);
    }

    displayTasks();

    apiListOperationsForTask("cdfb6501-5d6a-4fb7-9eac-859e1fa8695c")
        .then(function (json) {
            console.log(json.data);
        });

})