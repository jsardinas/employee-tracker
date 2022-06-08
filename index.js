const inquirer = require('inquirer');

const department = require('./department');
const role = require('./roles');
const employee = require('./employee');

console.log(department);

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
            "update an employee role",
            "exit"
        ]
    }
];

var done = false;

const showMenu = async () => {

    var ans = await inquirer.prompt(questions)

    switch(ans.option){
        case "view all departments":
            department.showDepartments();
            break;
        case "view all roles":
            role.showRoles();
            break;
        case "view all employees":
            employee.showEmployees();
            break;
        case "add a department":
            department.addDepartment('aaaa');
            break;
        case "add a role":
            role.addRole('qwww', 101000, 1);
            break;
        case "add an employee":
            employee.addEmployee('pepito', 'diaz', 1, 1);
            break;
        case "update an employee role":
            employee.updateRole(6,1);
        case "exit":
            done = true;
            break;
    }
}

const runApp = async () => {
    while(!done){
        await showMenu();
    }
    console.log('Bye!');
}

runApp();