const inquirer = require('inquirer');

const questions = [
    {   
        "type":"list",
        "name":"option",
        "message":"select an option",
        "choices":[
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role"
        ]
    }
];


const showMenu = () => {
    inquirer.prompt(questions)
    .then(ans => console.log(ans.option));
}


showMenu();