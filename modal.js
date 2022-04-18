// Модальные окна
//Edit
const editModal = () => {
sendRequest(indexUsersUrl)
    .then(
        users => {
            if(users.length > 0) {
                let temp = ''

                users.forEach((user) => {
                    const modal = document.createElement('div')
                    modal.classList.add('modal_fade')
                    modal.insertAdjacentHTML('afterbegin',`
<div class="modal fade" id="editUser${user.id}"  tabindex="-1" aria-labelledby="editUserLabel" aria-hidden="true" name="editModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editUserLabel">Edit user</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
<!--            &lt;!&ndash;                Форма для заполнения&ndash;&gt;-->
            <form role="form" class="form-horizontal" name="editForm" id="editUser/${user.id}">
                <div class="container d-flex justify-content-center text-center">
            <div class="modal-body">
                <div class="row justify-content-center">
                        <div class="form-group w-50 pb-3">
                            <label for="id/editUser/${user.id}"><b>ID</b></label>
                            <input class="form-control" readonly value="${user.id}" name="id" id="id/editUser/${user.id}">
                            <br>
                            <label for="name/editUser/${user.id}"><b>First name</b></label>
                            <input class="form-control" value="${user.firstName}" name="firstName" id="name/editUser/${user.id}">
                            <br>
                            <label for="lName/editUser/${user.id}"><b>Last name</b></label>
                            <input class="form-control" value="${user.lastName}" name="lastName" id="lName/editUser/${user.id}">
                            <br>
                            <label for="age/editUser/${user.id}"><b>Age</b></label>
                            <input class="form-control" value="${user.age}" name="age" id="age/editUser/${user.id}">
                            <br>
                            <label for="email/editUser/${user.id}"><b>Email</b></label>
                            <input type="email" class="form-control" value="${user.email}" name="email" id="email/editUser/${user.id}">
                            <br>
                            <label for="password/editUser/${user.id}"><b>Password</b></label>
                            <input type="password" class="form-control" value="${user.password}" name="password" id="password/editUser/${user.id}">
                            <br>
                            <!--                                        Добавить выбор роли-->
                            <select multiple class="form-control" id="roles/editUser/${user.id}" size="2" name="roles">
                                
                            </select>
                        </div>
                </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-primary" value="Edit">
            </div>
            </form>
        </div>
    </div>
</div>
                    `)
                    document.body.appendChild(modal)
                })
            }
        })
}
//Delete
const deleteModal = () => {
    sendRequest(indexUsersUrl)
        .then(
            users => {
                if(users.length > 0) {
                    let temp = ''

                    users.forEach((user) => {
                        const delModal = document.createElement('div')
                        delModal.classList.add('modal_fade')
                        delModal.insertAdjacentHTML('afterbegin',`
<div class="modal fade" id="deleteUser${user.id}"  tabindex="-1" aria-labelledby="deleteUserLabel" aria-hidden="true" name="deleteModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteUserLabel">Delete user</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
<!--            &lt;!&ndash;                Форма для заполнения&ndash;&gt;-->
            <form role="form" class="form-horizontal" name="deleteForm" id="deleteUser/${user.id}">
                <div class="container d-flex justify-content-center text-center">
            <div class="modal-body">
                <div class="row justify-content-center">
                        <div class="form-group w-50 pb-3">
                            <label for="id/deleteUser/${user.id}"><b>ID</b></label>
                            <input class="form-control" readonly value="${user.id}" name="id" id="id/deleteUser/${user.id}">
                            <br>
                            <label for="name/deleteUser${user.id}"><b>First name</b></label>
                            <input class="form-control" readonly value="${user.firstName}" name="firstName" id="name/deleteUser${user.id}">
                            <br>
                            <label for="lName/deleteUser${user.id}"><b>Last name</b></label>
                            <input class="form-control" readonly value="${user.lastName}" name="lastName" id="lName/deleteUser${user.id}">
                            <br>
                            <label for="age/deleteUser${user.id}"><b>Age</b></label>
                            <input class="form-control" readonly value="${user.age}" name="age" id="age/deleteUser${user.id}">
                            <br>
                            <label for="email/deleteUser${user.id}"><b>Email</b></label>
                            <input type="email" class="form-control" readonly value="${user.email}" name="email" id="email/deleteUser${user.id}">
                            <br>
                            <label for="password/deleteUser${user.id}"><b>Password</b></label>
                            <input type="password" class="form-control" readonly value="${user.password}" name="password" id="password/deleteUser${user.id}">
                            <br>
                            <!--                                        Добавить выбор роли-->
                            <select multiple class="form-control" readonly id="role/deleteUser${user.id}" size="2" name="roles">
                                
                            </select>
                        </div>
                </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-primary" value="Delete">
            </div>
            </form>
        </div>
    </div>
</div>
                    `)
                        document.body.appendChild(delModal)
                    })
                }
            })
}