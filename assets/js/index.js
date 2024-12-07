window.onload = () => {
    list()
}

const list = () => {
    fetch('../App/Controllers/ContactController.php?action=index', {
        method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then(json => {
            const table = document.querySelector("table").getElementsByTagName('tbody')[0]
            const tfoot = document.querySelector("table").getElementsByTagName('tfoot')[0]
            if(json.length > 0) {                
                tfoot.getElementsByTagName('th')[0].innerHTML = json.length === 1 ? "Último contato registrado" : `Últimos ${json.length} contatos registrados`
                json.forEach(contact => {
                    const row = table.insertRow()
                    const name = row.insertCell()
                    const phone = row.insertCell()
                    const show = row.insertCell()
                    const edit = row.insertCell()
                    const del = row.insertCell()
                    name.innerHTML = contact.name
                    phone.innerHTML = contact.phone                    
                    const showButton = document.createElement("button")
                    const editButton = document.createElement("button")
                    const deleteButton = document.createElement("button")
                    showButton.innerHTML = "Visualizar"
                    editButton.innerHTML = "Editar"
                    deleteButton.innerHTML = "Deletar"
                    editButton.classList.add("warning")
                    deleteButton.classList.add("error")
                    showButton.addEventListener("click", () => {
                        showInformation(contact.id)
                    })
                    editButton.addEventListener("click", () => {
                        editInformation(contact.id)
                    })
                    deleteButton.addEventListener("click", () => {
                        deleteConfirmation(contact.id, contact.name)
                    })
                    show.appendChild(showButton)
                    edit.appendChild(editButton)
                    del.appendChild(deleteButton)
                })
            }
            else {
                const row = table.insertRow()
                const empty = row.insertCell()                
                tfoot.getElementsByTagName('th')[0].innerHTML = `Não há contatos registrados ainda`                
            }
    })
    .catch((error) => {
        console.log(error)
    })
}

function showInformation(id) {
    window.location.href = "show.php?id="+id
}

function editInformation(id) {
    window.location.href = "edit.php?id="+id
}

function deleteConfirmation(id, name) {    
    document.querySelector('#modalDelete').checked = true
    const content = document.querySelector('.content')
    const img = document.createElement("img")
    img.src = ""
    content.innerHTML = ""
    content.innerHTML = "Você quer realmente deletar esse contato?<br><br><b><i>" + name + '</i></b>'
    const delete_id = document.querySelector("#delete_id")
    delete_id.value = id
}

function deleteContact() {
    const id = document.querySelector("#delete_id").value
    const formData = new FormData()
    formData.append("action", "delete")
    formData.append("id", id)
    formData.append("filename", "")
    document.querySelector('#modalDelete').checked = false
    fetch('../App/Controllers/PhotoController.php', {
        body: formData,
        method: 'POST',
        headers: { 'Accept': 'application/json' }        
    })
    .then((res) => res.json())
    .then(json => {        
        fetch('../App/Controllers/ContactController.php', {
            body: formData,
            method: 'POST',
            headers: { 'Accept': 'application/json' }        
        })
        .then((res) => res.json())
        .then(json => {
            window.location.href = ""
        })
        .catch((error) => {
            console.log(error)        
        })
    })
    .catch((error) => {
        console.log(error)        
    })    
}

document.onkeydown = function(e) {
    if (e.key == 'Escape') {
      var mods = document.querySelectorAll('.modal > [type=checkbox]');
      [].forEach.call(mods, function(mod){ mod.checked = false; });
    }
}