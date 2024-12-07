window.onload = () => {
    const id = document.querySelector("#id_edit").value
    editInformation(id)
    loadPhotos(id)
    document.querySelector("#photo").value = null
}

const editInformation = (id) => {
    fetch('../App/Controllers/ContactController.php?action=show&id='+id, {
        method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then(json => {
            if(json !== null) {
                const name = document.getElementsByName("name")[0]
                name.value = json.name
                const phone = document.getElementsByName("phone")[0]
                phone.value = json.phone
                const email = document.getElementsByName("email")[0]
                email.value = json.email
                const annotations = document.getElementsByName("annotations")[0]
                annotations.value = json.annotations
            }
            else {
                window.location.href = "index.php"
            }
    })
    .catch((error) => {
        console.log(error)        
    })
}

const editForm = document.querySelector(".edit-form")
editForm.addEventListener("submit", (e) => {
    e.preventDefault()    
    const formData = new FormData()
    formData.append("action", "update")
    formData.append("id", editForm.id_edit.value)
    formData.append("name", editForm.name.value)
    formData.append("phone", editForm.phone.value)
    formData.append("email", editForm.email.value)
    formData.append("annotations", editForm.annotations.value)
    fetch('../App/Controllers/ContactController.php', {
        body: formData,
        method: 'POST',
        headers: { 'Accept': 'application/json' }
    })
    .then((res) => res.json())
    .then(json => {
        if(json) {
            window.location.href = "show.php?id="+editForm.id_edit.value
        }
        else {
            const message = document.querySelector(".edit-message")
            message.innerHTML = "Erro ao tentar editar contato, verifique se o e-mail já foi registrado"
            message.style.display = "block"
        }
    })
    .catch((error) => {
        console.log(error)        
    })
})

const loadPhotos = (contact_id) => {
    fetch('../App/Controllers/PhotoController.php?action=list&contact_id='+contact_id, {
        method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then(json => {            
            if(json !== null) {
                const cards = document.querySelector(".images-cards")
                for(let i = 0; i < json.length; i++) {
                    addImage(json[i].filename, cards, json[i].id)
                }
                if(json.length >= 5) {
                    document.querySelector("#sendPhotoButton").disabled = true
                }
            }
            else {
                message.innerHTML = "Erro ao tentar carregar fotos"
                message.style.display = "block"
            }            
    })
    .catch((error) => {
        console.log(error)        
    })
}

const photoForm = document.querySelector(".photo-form")
photoForm.addEventListener("submit", (e) => {
    e.preventDefault()    
    const formData = new FormData()
    formData.append("action", "store")
    formData.append("contact_id", photoForm.contact_id.value)
    formData.append("photo", photoForm.photo.files[0])
    const message = document.querySelector(".photo-message")
    if(photoForm.photo.files[0] !== undefined) {        
        fetch('../App/Controllers/PhotoController.php', {
            body: formData,
            method: 'POST',
            headers: { 'Accept': 'application/json' }        
        })
        .then((res) => res.json())
        .then(json => {
            if(json !== "" && json !== null) {
                const cards = document.querySelector(".images-cards")
                addImage(json, cards, null)
                message.style.display = "none"
            }
            else {
                message.innerHTML = "Erro ao enviar foto (arquivo deve ser do tipo JPG ou PNG e ter no máximo 1MB de tamanho)"
                message.style.display = "block"
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else {
        message.innerHTML = "Selecione uma foto para enviar"
        message.style.display = "block"
    }
})

const addImage = (image, cards, id) => {
    const div = document.createElement("div")
    const article = document.createElement("article")
    article.classList.add("card")
    article.id = "article" + id
    const img = document.createElement("img")
    img.src = "../../assets/public/uploads/" + image
    img.style.height = "200px"
    const footer = document.createElement("footer")
    const button = document.createElement("button")
    button.classList.add("error")
    button.innerHTML = "Deletar"
    if(id !== null) {
        button.addEventListener("click", () => {
            showModal(id, image)
        })
    }
    else {
        button.disabled = true
        button.classList.remove("error")
        button.innerHTML = "Deletar"
        button.classList.add("tooltip-top")
        button.setAttribute("data-tooltip", "Disponível ao recarregar página")        
    }
    div.appendChild(article)
    article.appendChild(img)
    footer.appendChild(button)
    article.appendChild(footer)
    cards.appendChild(div)
    checkLimitPhotos()
}

const showModal = (id, filename) => {
    document.querySelector("#modal_1").checked = true
    document.querySelector("#photo_delete_id").value = id
    document.querySelector("#photo_filename").value = filename
}

const deletePhoto = () => {
    const id = document.querySelector("#photo_delete_id").value
    const filename = document.querySelector("#photo_filename").value
    const formData = new FormData()
    formData.append("action", "delete")
    formData.append("id", id);
    formData.append("filename", filename)
    fetch('../App/Controllers/PhotoController.php', {
        body: formData,
        method: 'POST',
        headers: { 'Accept': 'application/json' }        
    })
    .then((res) => res.json())
    .then(json => {
        if(json) {
            const card = document.querySelector(`#article${id}`)
            card.remove()
            checkLimitPhotos()
        }
        else {
            const message = document.querySelector(".photo-message")
            message.innerHTML = "Erro ao tentar deletar foto"
            message.style.display = "block"
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

const checkLimitPhotos = () => {
    const all_cards = document.querySelectorAll(".images-cards article")
    if(all_cards.length >= 6) {
        document.querySelector("#sendPhotoButton").disabled = true
    }
    else {
        document.querySelector("#sendPhotoButton").disabled = false
    }
}