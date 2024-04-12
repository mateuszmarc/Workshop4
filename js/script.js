document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "557eefe2-d52f-4386-a63f-3582e64b94a4";
    const hostAddress = "https://todo-api.coderslab.pl";
    const mainElement = document.querySelector("main");

    // Add task form elements
    const taskAddingForm = document.querySelector(".js-task-adding-form");
    const taskNameInput = taskAddingForm.firstElementChild.firstElementChild;
    const taskDescriptionInput = taskAddingForm.firstElementChild.nextElementSibling.firstElementChild;
    clearFormInput(taskNameInput, taskDescriptionInput);

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
    function createOperationAddingForm(section, listTag, taskId, taskStatus) {
        const formContainerDiv = createTagElement("div", section, "card-body");
        const formElement = createTagElement("form", formContainerDiv);
        const inputDiv = createTagElement("div", formElement, "input-group");
        const inputTag = createTagElement("input", inputDiv, "form-control");
        inputTag.type = "text";
        inputTag.placeholder = "Operation description";
        inputTag.minLength = "5";
        inputTag.required = true;
        const buttonDivWrapper = createTagElement("div", inputDiv, "input-group-append");
        const addOperationButton = createTagElement("button", buttonDivWrapper, "btn btn-info", "Add");
        // return formElement;

        formElement.addEventListener("submit", function (event) {
            event.preventDefault();
            let description = inputTag.value;
            if (validateInput(description)) {
                addOperation(description, taskId, taskStatus, section, listTag);
                inputTag.value = "";
            }
        });

        return formContainerDiv;
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
            const formDivWrapper = createOperationAddingForm(section, ulElement, taskId, taskStatus);
            const finishButton = createTagElement("button", headerRightDiv, 'btn btn-dark btn-sm js-task-open-only', "Finish");
            finishButton.addEventListener("click", function(event) {
                event.preventDefault();
                updateTask(taskId, taskTitle, taskDescription, "closed", formDivWrapper, finishButton, section);
            })
        }

        const deleteButton = createTagElement("button", headerRightDiv, 'btn btn-outline-danger btn-sm ml-2', "Delete");
        deleteButton.addEventListener("click", function(event) {
            event.preventDefault();
            deleteTask(taskId, section);
        });
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
                data.sort(function(a, b) {
                    return new Date(a.addedDate) - new Date(b.addedDate);
                })
                data.forEach(function (operation) {
                    renderOperation(operationListTag, sectionTag, operation, taskStatus);
                })
            })
    }

    // function that is used in main displayOperations() function
    function renderOperation(operationListTag, sectionTag, data, taskStatus) {
        let timeSpentInMinutes = data.timeSpent;
        let timeSpent = formatTime(timeSpentInMinutes);
        let description = data.description;
        let operationId = data.id;
        const li = createTagElement("li", operationListTag, "list-group-item d-flex justify-content-between align-items-center");
        const descriptionDiv = createTagElement("div", li, "", description);
        const time = createTagElement("time", descriptionDiv, "badge badge-success badge-pill ml-2", timeSpent);
        if (taskStatus !== "closed") {
            const buttonDiv = createTagElement("div", li);
            const subtractMinutesButton = createTagElement("button", buttonDiv, "btn btn-outline-danger btn-sm mr-2", "-15m");
            if (timeSpentInMinutes < 15) {
                subtractMinutesButton.setAttribute("disabled", true);
            }

            const addMinutesButton = createTagElement("button", buttonDiv, "btn btn-outline-success btn-sm mr-2", "+15m");
            const addHourButton = createTagElement("button", buttonDiv, "btn btn-outline-success btn-sm mr-2", "+1h");
            const deleteButton = createTagElement("button", buttonDiv, "btn btn-outline-danger btn-sm", "Delete");
            
            subtractMinutesButton.addEventListener("click", function (event) {
                event.preventDefault();
                if (formatTimeToMinutes(time.innerText) >= 15) {
                    updateOperationTime(time, operationId, description, -15, subtractMinutesButton);
                }
            });

            addMinutesButton.addEventListener("click", function (event) {
                event.preventDefault();
                updateOperationTime(time, operationId, description, 15);
            })

            addHourButton.addEventListener("click", function (event) {
                event.preventDefault();
                updateOperationTime(time, operationId, description, 60);
            })

            deleteButton.addEventListener("click", function(event){
                event.preventDefault();
                deleteOperation(operationId, li);
            })
        }
    }


    displayTasks();

//     Add task functionality
//     addTask() helper methods

    function clearFormInput(...input) {
        input.forEach(function (element) {
            element.value = "";
        })

    }

    function validateInput(...inputValues) {
        inputValues.forEach(function (input) {
            if (!input || input.length < 5) {
                return false;
            }
        })
        return true;
    }

    function sendPostReqToAddTask(taskName, taskDescription) {
        const url = hostAddress + "/api/tasks";
        return fetch(url, {
            method: "POST",
            headers: {
                Authorization: apiKey, 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskName,
                description: taskDescription,
                status: 'open',
            })
        })
            .then(function (response) {
                if (!response.ok) {
                    console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                } else {
                    return response;
                }
            })
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function addTask() {
        let taskName = taskNameInput.value;
        let taskDescription = taskDescriptionInput.value;
        if (validateInput(taskName, taskDescription)) {
            clearFormInput(taskNameInput, taskDescriptionInput);
            sendPostReqToAddTask(taskName, taskDescription)
                .then(function (json) {
                    renderTask(json.data);
                });
        }
    }

    taskAddingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

//     Delete functionality
    function apiDeleteTask(taskId){
        const url = hostAddress + "/api/tasks/" + taskId;
        return fetch(url, {
            method: "DELETE",
            headers : {
                Authorization: apiKey,
            }
        })
            .then(function(response) {
                if (!response.ok) {
                    console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                } else {
                    return response;
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function (json) {
                return json.data.raw.affectedRows;
            })
    }

    function deleteTaskFromView(section) {
        section.remove();
    }

    function deleteTask(taskId, taskSection) {
        const result = apiDeleteTask(taskId);
        result.then(function (rowsAffected) {
            if (rowsAffected) {
                deleteTaskFromView(taskSection);
            }
        })
    }

//     Add operation functionality

    function apiAddOperation(taskId, operationDescription) {
        const url = hostAddress + "/api/tasks/" + taskId + "/operations";
        return fetch(url, {
            method: "POST",
            headers: {Authorization: apiKey, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                description: operationDescription,
                timeSpent: 0
            })
        })
            .then(function (response) {
                if (!response.ok) {
                    console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                } else {
                    return response;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function addOperation(operationDescription, taskId, taskStatus, section, listTag) {
        apiAddOperation(taskId, operationDescription)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                const data = json.data;
                renderOperation(listTag, section, data, taskStatus);
            });
    }

//     Update operation time functionality
    function formatTimeToMinutes(time) {
        let timeParts = time.substring(0, time.length - 1).split("h");
        if (timeParts.length > 1) {
            return Number.parseInt(timeParts[0]) * 60 + Number.parseInt(timeParts[1]);
        }
        return Number.parseInt(time);
    }


    function updateOperationTime(timeTag, operationId, operationDescription, timeToAdd, subtractMinutesButton) {
        let operationTimeInMinutes = formatTimeToMinutes(timeTag.innerText);
        console.log(operationTimeInMinutes);
        let updatedTime = operationTimeInMinutes + timeToAdd;
        console.log(updatedTime);
        const apiResponse = apiUpdateOperation(operationId, updatedTime, operationDescription);
        apiResponse.then(function (response) {
            return response;
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                let retrievedTime = json.data.timeSpent;
                if (retrievedTime < 15) {
                    subtractMinutesButton.setAttribute("disabled", true);
                }
                timeTag.innerText = formatTime(retrievedTime);

            })

    }

    function apiUpdateOperation(operationId, updatedTime, operationDescription) {
        const url = hostAddress + "/api/operations/" + operationId;
        return fetch(url, {
            method: "PUT", headers: {
                Authorization: apiKey, 'Content-Type': 'application/json'
            }, body: JSON.stringify({description: operationDescription, timeSpent: updatedTime})
        })
            .then(function (response) {
                if (!response.ok) {
                    console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                } else {
                    return response;
                }
            }).catch(function (error) {
                console.log(error);
            })
    }

//     Delete operation functionality
    function apiDeleteOperation(operationId) {
        const url = hostAddress + "/api/operations/" + operationId;

        return fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: apiKey
            }
        })
            .then(function(response) {
                if (!response.ok) {
                    console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                } else {
                    return response;
                }
            })
            .then(function(response) {
                return response.json();
            })
    }

    function deleteOperation(operationId, liElementTag) {
        apiDeleteOperation(operationId)
            .then(function(json) {
                if (!json.error) {
                    liElementTag.remove();
                }
            })
    }

//     Finish task functionality
    function apiUpdateTask(taskId, taskTitle, taskDescription, taskStatus) {
        const url = hostAddress + "/api/tasks/" + taskId;

        return fetch(url, {
            method: "PUT",
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskTitle,
                description: taskDescription,
                status: taskStatus
            })
        })
            .then(function(response) {
                if (!response.ok) {
                    console.log('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                } else {
                    return response;
                }
            })
            .then(function(response) {
                return response.json();
            })
    }

    function updateTask(taskId, taskTitle, taskDescription, taskStatus, formDiv, finishButton, section) {
        apiUpdateTask(taskId, taskTitle, taskDescription, taskStatus)
            .then(function(json) {
                if (json.data.status === "closed") {
                    finishButton.remove();
                    formDiv.remove()
                    const operations = section.querySelectorAll("ul li");
                    operations.forEach(function (operation) {
                        operation.firstElementChild.nextElementSibling.remove();
                    })
                }
            });
    }

})