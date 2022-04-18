const indexUsersUrl ="/api/users"
const adminDataUrl ="/api/admin"
const indexRolesURL = "/api/roles"



// GET
function sendRequest (url) {
    return fetch(url)
        .then(response => {
            return response.json()
        })
}

// заполняем шапку
sendRequest(adminDataUrl)
    .then(data => {

        let adminRoles = ''
        if (data.authorities.length > 0) {
            for (const role of data.authorities) {
                adminRoles += role.roleName
                adminRoles += " "
            }
        } else {
            adminRoles += "No role"
        }
        document.getElementById('adminName').innerHTML = data.name
        document.getElementById('adminRoles').innerHTML = adminRoles
    })


// Заполняем таблицу
const fillTable = () => {sendRequest(indexUsersUrl)
    .then(
        users => {
            console.log(users)

            if(users.length > 0) {
                let temp = ''

                users.forEach((user) => {
                    temp += '<tr>'
                    temp += '<td>' + user.id + '</td>'
                    temp += '<td>' + user.firstName + '</td>'
                    temp += '<td>' + user.lastName + '</td>'
                    temp += '<td>' + user.age + '</td>'
                    temp += '<td>' + user.email + '</td>'

                    let roles = ''
                    if(user.roles.length > 0) {
                        user.roles.forEach((role) => {
                            roles += role.roleName
                            roles += ' '
                    })
                    } else {
                        roles = 'No roles yet'
                    }

                    temp += '<td>' + roles + '</td>'
                    temp += '<td>' +
                                '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#editUser' + user.id + '">Edit</button>'
                            '</td>'
                    temp += '<td>' +
                        '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteUser' + user.id + '">Delete</button>'
                    '</td>'
                    temp += '</tr>'

                })
                document.getElementById('usersIndex').innerHTML = temp
            }
        }
    )
    .catch(err => console.log(err))
}
fillTable()
editModal()
deleteModal()

// POST
//Add roles
setTimeout(() => {
sendRequest(indexRolesURL)
    .then(data => {
        if (data.length > 0) {
            let temp = ''
            for (const role of data) {
                temp += `<option value="${role.id}">${role.roleName}</option>`
            }
            document.getElementsByName('roles').forEach(e => e.innerHTML = temp)
        }
    })
    .catch(err => console.log(err))
}, 800)

//Show the role
document.getElementById('roles').addEventListener('change', function(e) {
    e.preventDefault()
    console.log('You selected: ', this.value);
});

//Creat user
const createUser = () => {
    fetch(indexUsersUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: document.getElementById('name').value,
            lastName: document.getElementById('lname').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            roles: [{id: document.getElementById('roles').value}] //to add many roles check it: https://www.techiedelight.com/get-selected-values-multi-select-dropdown-javascript/
        })
    })
        .then(response => {
            fillTable()
            editModal()
            deleteModal()
            return response
        })
        .catch(error => console.error(error))
};

let userForm = document.getElementById('newUserForm');
userForm.addEventListener('submit', function (e) {
    e.preventDefault()
    createUser()
})

//Edit user
const editUser = (id) => {
    fetch(indexUsersUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('id/' + id).value,
            firstName: document.getElementById('name/' + id).value,
            lastName: document.getElementById('lName/' + id).value,
            age: document.getElementById('age/' + id).value,
            email: document.getElementById('email/' + id).value,
            password: document.getElementById('password/' + id).value,
            roles: [{id: document.getElementById('roles/' + id).value}] //to add many roles check it: https://www.techiedelight.com/get-selected-values-multi-select-dropdown-javascript/
        })
    })
        .then(response => {
            fillTable()
            return response
        })
        .catch(error => console.error(error))
};

setTimeout(() => { // устанавливается, тк модальное окно создается скриптом и не успевает прогрузиться до ф-ии
    const forms = document.getElementsByName('editForm')
    for(let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function (e){
            e.preventDefault()
            const userId = forms[i].getAttribute('id')
            console.log(userId)
            editUser(userId)
        })
    }
}, 800)

//Delete user
const deleteUser = (id) => {
    fetch(indexUsersUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('id/' + id).value
        })
    })
        .then(response => {
            fillTable()
            return response
        })
        .catch(error => console.error(error))
};

setTimeout(() => {
    const forms = document.getElementsByName('deleteForm')
    for(let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function (e){
            e.preventDefault()
            const userId = forms[i].getAttribute('id')
            console.log(userId)
            deleteUser(userId)
        })
    }
}, 800)