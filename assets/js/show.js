window.onload = () => {
    const id = document.querySelector("#id_show").value
    showInformation(id)
    showPhotos(id)
}

const showInformation = (id) => {
    fetch('../App/Controllers/ContactController.php?action=show&id='+id, {
        method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then(json => {            
            if(json !== null) {                
                const name = document.querySelector("#name")
                name.innerHTML = json.name
                const phone = document.querySelector("#phone")
                phone.innerHTML = "Telefone: " + json.phone
                const email = document.querySelector("#email")
                email.innerHTML = "E-mail: " + json.email
                const annotations = document.querySelector("#annotations")
                annotations.innerHTML = 
                    json.annotations !== "" ? json.annotations : "Não há anotações para esse contato"
            }
            else {
                window.location.href = "index.php"
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const showPhotos = (contact_id) => {
    fetch('../App/Controllers/PhotoController.php?action=list&contact_id='+contact_id, {
        method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then(json => {            
            const tabs = document.getElementsByClassName("tabs")[0]
            if(json !== null && json.length > 0) {                
                if(json.length === 2) {
                    tabs.classList.add("two")
                }
                if(json.length === 3) {
                    tabs.classList.add("three")
                }
                if(json.length === 4) {
                    tabs.classList.add("four")
                }
                if(json.length === 5) {
                    tabs.classList.add("five")
                }
                const row = document.createElement("div")
                row.classList.add("row", "center")
                for(let i = 0; i < json.length; i++) {
                    const radio = document.createElement("input")
                    radio.setAttribute("type", "radio")
                    radio.setAttribute("checked", "checked")
                    radio.name = "tabGroupC"
                    radio.id = "tabC-" + json[i].id
                    tabs.append(radio)
                }
                tabs.append(row)
                for(let i = 0; i < json.length; i++) {
                    const div = document.createElement("div")
                    const img = document.createElement("img")
                    img.style.height = "500px"
                    img.style.width = "100%"
                    img.src = "../../assets/public/uploads/" + json[i].filename
                    div.append(img)
                    row.append(div)              
                }
                for(let i = 0; i < json.length; i++) {
                    const label = document.createElement("label")
                    label.htmlFor = "tabC-" + json[i].id
                    const img = document.createElement("img")
                    img.src = "../../assets/public/uploads/" + json[i].filename
                    img.style.width = "100px"
                    img.style.height = "100px"
                    label.append(img)
                    tabs.append(label)
                }
            }
            else {
                const label = document.createElement("label")
                label.classList.add("label", "warn", "full", "flex", "center")
                label.style.fontSize = "32px"
                label.innerHTML = "Não há fotos para esse contato ainda"
                tabs.appendChild(label)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}