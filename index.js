const inquirer = require('inquirer');

const department = require('./department');
const role = require('./roles');
const employee = require('./employee');

const cTable = require('console.table');

console.log('checkpoint 1');

const mainQuestions = [
    {   
        type:"list",
        name:"option",
        message:"select an option",
        choices:[
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

const addDepartmentQuestions = [
    {
        name: "departmentName",
        message: "Enter new Department name: "
    }
];

const addDepartmentMenu = async () => {
    var ans = await inquirer.prompt(addDepartmentQuestions);
    department.addDepartment(ans.departmentName);
}

const addRoleMenu = async () => {
    let departments = await department.getDepartments();
    let departmentChoices = [];
    let reverseDepartmentMap = {};
    for (d of departments){
        departmentChoices.push(d.department_name);
        reverseDepartmentMap[d.department_name] = d.id;
    }

    const addRoleQuestions = [
        {
            name: "department",
            message: "Choose department to add role to",
            type: "list",
            choices: departmentChoices,
            filter: (input, ans) => {
                return reverseDepartmentMap[input];
            }
        },
        {
            name: "roleName",
            message: "Enter new role name: "
        },
        {
            name: "salary",
            message: "Add salary for this role: "
        }
    ];
    var ans = await inquirer.prompt(addRoleQuestions);
    console.log(ans);
    role.addRole(ans.roleName, ans.salary, ans.department);
}

const getEmployeeChoices = async () => {
    let employees = await employee.getEmployees();
    let employeeChoices = [];
    let reverseEmployeeMap = {};
    for (e of employees){
        let fullName = `${e.first_name} ${e.last_name}`;
        employeeChoices.push(fullName);
        reverseEmployeeMap[fullName] = e.id;
    }
    return {choices: employeeChoices, reverseMap: reverseEmployeeMap}
}

const getRoleChoices = async () => {
    let roles = await role.getRoles();
    let roleChoices = [];
    let reverseRoleMap = {};
    for (r of roles){
        let roleDesc = `${r.JobTitle} (department: ${r.Department})`;
        roleChoices.push(roleDesc);
        reverseRoleMap[roleDesc] = r.ID;
    }
    return {choices: roleChoices, reverseMap: reverseRoleMap}
}

const addEmployeeMenu = async () => {
    
    let res = await getEmployeeChoices();
    let managerChoices = res.choices;
    let reverseManagerMap = res.reverseMap;
    res = await getRoleChoices();
    let roleChoices = res.choices;
    let reverseRoleMap = res.reverseMap;

    const addEmployeeQuestions = [
        {
            name: "firstName",
            message: "Enter employee first name:"
        },
        {
            name: "lastName",
            message: "Enter employee last name:"
        },
        {
            name: "manager",
            message: "Choose employee manager",
            type: "list",
            choices: managerChoices,
            filter: (input, ans) => {
                return reverseManagerMap[input];
            }
        },
        {
            name: "role",
            message: "Choose employee role",
            type: "list",
            choices: roleChoices,
            filter: (input, ans) => {
                return reverseRoleMap[input];
            }
        }
    ];
    const ans = await inquirer.prompt(addEmployeeQuestions);
    employee.addEmployee(ans.firstName, ans.lastName, ans.role, ans.manager);
}

const updateEmployeeMenu = async () => {
    let res = await getEmployeeChoices();
    let employeeChoices = res.choices;
    let reverseEmployeeMap = res.reverseMap;
    res = await getRoleChoices();
    let roleChoices = res.choices;
    let reverseRoleMap = res.reverseMap;

    const questions = [
        {
            name: "employee",
            message: "Select employee",
            type: "list",
            choices: employeeChoices,
            filter: (input, ans) => {
                return reverseEmployeeMap[input];
            }
        },
        {
            name: "role",
            message: "Select new role",
            type: "list",
            choices: roleChoices,
            filter: (input, ans) => {
                return reverseRoleMap[input];
            }
        }
    ];

    const ans = await inquirer.prompt(questions);
    employee.updateRole(ans.employee, ans.role);
}

console.log('checkpoint 2');

var done = false;

const mainMenu = async () => {
    console.log('checkpoint 4');
    var ans = await inquirer.prompt(mainQuestions)
    console.log('ans:', ans);
    switch(ans.option){
        case "view all departments":
            var res = await department.getDepartments();
            console.table(res);
            break;
        case "view all roles":
            var res = await role.getRoles();
            console.table(res);
            break;
        case "view all employees":
            var res = await employee.getEmployeesFull();
            console.table(res);
            break;
        case "add a department":
            await addDepartmentMenu();
            break;
        case "add a role":
            await addRoleMenu();
            break;
        case "add an employee":
            await addEmployeeMenu();
            break;
        case "update an employee role":
            await updateEmployeeMenu();
            break;
        case "exit":
            done = true;
            break;
    }
}

const runApp = async () => {
    while(!done){
        await mainMenu();
    }
    console.log('Bye!');
}

console.log('checkpoint 3');
runApp();