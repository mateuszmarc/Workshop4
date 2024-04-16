[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<a name="readme-top"></a>

<br />
<div align="center">
<h3 align="center">Task manager</h3>

  <p align="center">
    Simple application to manage task using api to communicate with server that stores task data.
    <br />
    <a href="https://github.com/mateuszmarc/Workshop5"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/mateuszmarc/Workshop5">View Demo</a>
    ·
    <a href="https://github.com/mateuszmarc/Workshop5/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/mateuszmarc/Workshop5/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Thoughts and future extensions</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][example]](images/example.png)

As I said before it is just simple task management app created to practise basics of javascript DOM manipulation and server communication using api.
This application allows the user to add task along with specific operations required to finish entire task. 
Api stores tasks and operations under address: [https://todo-api.coderslab.pl](https://todo-api.coderslab.pl).

### Built With

* [![html5][html.com]][html5-url]
* [![javascript][javascript.com]][javascript-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Implementation
This api specifies the way we can communicate with server:

[![API description][api-description]](images/api-description.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You don't need much to use this app but below might help
* simple code editor, for example: [brackets](https://brackets.io/) to open script.js file and assign value to ```apiKey``` variable.

### Installation

1. Get a free API Key at [https://todo-api.coderslab.pl/apikey/create ](https://todo-api.coderslab.pl/apikey/create )
2. Clone the repo
   ```sh
   git clone https://github.com/mateuszmarc/Workshop5.git
   ```
3. Enter your API in `js/script.js` file.
   ```js
   const apiKey = 'ENTER YOUR API';
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
In order to start using app you need to open [index.html](html/index.html) file in any browser. 
#### Displaying all tasks 
Once you open ```index.html``` in browser, all tasks will be displayed. If you open the app for the first time 
you will have listed two task examples.  
[![Tasks example][task-example]](images/example.png)


### Adding the task
Simply enter title of the task and its description.
[![Tasks form][task-form]](images/task-form.png)


After task added it will be displayed below, ready to add operations to.
[![Add task][add-task]](images/add-task.png)


### Closing the task 
Choose the task to close and click 'Finish' button. Task will be displayed as done, so the options to add, delete and update operations won't be available anymore.
[![Close task][close-task]](images/close-task.png)
Also task status will be updated to 'closed' on server side. 

### Deleting the task
Click 'Delete' button associated with task to delete. 
Task will be deleted from the view and from the server.

### Adding operations to the task
Choose the task to add operation to, enter operation description and click 'add' button.
[![Add operation][add-operation]](images/add-operation.png)
New operation will be added to the view and saved on server side. 
Once you create operation you can set the operation time, or delete operation.

### Updating the operations for the task 
If the task itself is not finished you can set the time of particular operation by clicking on buttons.
[![Update operation][update-operation]](images/update-operation.png)
Operation time will be updated on view and on server side.

### Deleting operations from the task 
Click 'delete' button associated with task to delete. 
It will be deleted from server and from the view.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Displaying all tasks
- [x] Adding all tasks
  - [x] Adding operations to the task
  - [x] Updating task operation times 
  - [x] Delete task operations
- [x] Delete task 
- [x] Finish task


See the [open issues](https://github.com/mateuszmarc/Workshop5/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mateusz Marcykiewicz - mmarcykiewicz@gmail.com

Project Link: [https://github.com/mateuszmarc/Workshop5](https://github.com/mateuszmarc/Workshop5)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Thoughts and future extensions
This project helped me to practice DOM manipulation using javascript and communication with api.
In the future, project can be extended by following features:
* Reopening the task
* Specifying accurate time for the operation
* Edit task title and description. 
* Edit operation description
* Add delete task confirmation window.

And adding tests for application is what I will do next for this project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/mateuszmarc/Workshop5.svg?style=for-the-badge
[contributors-url]: https://github.com/mateuszmarc/Workshop5/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mateuszmarc/Workshop5.svg?style=for-the-badge
[forks-url]: https://github.com/mateuszmarc/Workshop5/network/members
[stars-shield]: https://img.shields.io/github/stars/mateuszmarc/Workshop5.svg?style=for-the-badge
[stars-url]: https://github.com/mateuszmarc/Workshop5/stargazers
[issues-shield]: https://img.shields.io/github/issues/mateuszmarc/Workshop5.svg?style=for-the-badge
[issues-url]: https://github.com/mateuszmarc/Workshop5/issues
[license-shield]: https://img.shields.io/github/license/mateuszmarc/Workshop5.svg?style=for-the-badge
[license-url]: https://github.com/mateuszmarc/Workshop5/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mateusz-marcykiewicz/
[product-screenshot]: images/task-example.png
[api-description]: images/api-description.png
[example]: images/example.png
[task-example]: images/example.png
[task-form]: images/task-form.png
[add-task]: images/add-task.png
[close-task]: images/close-task.png
[add-operation]: images/add-operation.png
[update-operation]: images/update-operation.png

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[javascript.com]: https://img.shields.io/badge/javascript-icon?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&color=black
[javascript-url]: https://javascript.com 
[html.com]: https://img.shields.io/badge/html-icon?style=for-the-badge&logo=html5&logoColor=%23E34F26&color=black
[html5-url]: https://html.com/