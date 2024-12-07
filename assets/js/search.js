const searchInput = document.querySelector("#searchInput")
searchInput.addEventListener("keydown", (e) => {
    const name = searchInput.value.trim()
    if(name !== "" && e.keyCode === 13) {
        fetch('../App/Controllers/ContactController.php?action=search&name='+name, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }        
        })
        .then((res) => res.json())
        .then(json => {
            if(json) {
                const table = document.querySelector("table")
                const tbody = document.querySelector("table").getElementsByTagName('tbody')[0]
                const tfoot = document.querySelector("table").getElementsByTagName('tfoot')[0]                
                if(json.length > 0) {
                    table.classList.add("primary")
                    table.classList.remove("error")
                    tbody.innerHTML = ""
                    tfoot.getElementsByTagName('th')[0].innerHTML = 
                        json.length === 1 ? "Pesquisa retornou 1 contato" : `Pesquisa retornou ${json.length} contatos`
                    json.forEach(contact => {
                        const row = tbody.insertRow()
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
                        showButton.innerHTML = "Ver"
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
                    tbody.innerHTML = ""
                    const row = tbody.insertRow()
                    const cell = row.insertCell()
                    table.classList.add("error")
                    table.classList.remove("primary")
                    tfoot.getElementsByTagName('th')[0].innerHTML = `Não houve resultados para essa pesquisa`
                }
            }            
        })
        .catch((error) => {
            console.log(error)        
        })
    }
})