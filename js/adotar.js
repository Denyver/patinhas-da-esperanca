api_link_adocao = "https://rjk1iz8p9b.execute-api.sa-east-1.amazonaws.com/dev/adocao";
api_pets_adocao = "https://t4xsvxdh48.execute-api.sa-east-1.amazonaws.com/dev/getAllAdoptions";
api_change_adoption_status = "https://t4xsvxdh48.execute-api.sa-east-1.amazonaws.com/dev/adpotion_status"


function postAdotar(nome, email, telefone, cpf, pet_id) {
    console.log("Fetch")
    fetch(api_link_adocao,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "telefone": telefone,
                "cpf": cpf,
                "nome": nome,
                "pet_id": pet_id
            })
        }
    ).then(response => response.json())
        .then(code => {
            alert('Cadastrado!')
        })
}

function changeStatusAdotar(pet_id, pet_status, id, status) {
    console.log("Fetch")
    fetch(api_change_adoption_status,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pet_id": pet_id,
                "pet_status": pet_status,
                "id": id,
                "status": status
            })
        }
    ).then(response => response.json())
        .then(code => {
           
        })
}

function getStatusAdocao() {
    console.log("Fetch")
    fetch(api_pets_adocao,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            
        }
    ).then(response => response.json())
        .then(code => {
            let pets = code.pets;
            console.log(pets);
            let adocao = adocao_att(code.processo, pets)
            cards_de_adocao(adocao);
        })
}


function adotar() {
    let id = document.getElementById('pet_id');
    let pet_id = id.getAttribute('class');
    let nome = document.getElementById('ad_nome').value;
    let email = document.getElementById('ad_email').value;
    let cpf = document.getElementById('ad_cpf').value;
    let telefone = document.getElementById('ad_telefone').value;
    console.log(nome, email, cpf, telefone);
    postAdotar(nome, email, telefone, cpf, pet_id)
}

function status_adocao() {
    
}

function cards_de_adocao(processo) {
    tam = processo.length;
    status_box = document.getElementById('status_box');

    for (i = 0; i < tam; i++){
        let pedido = processo[i];
        if (pedido.status == 'Aguardando') {
            const div = document.createElement("div");
            const bta = document.createElement('button');
            const btc = document.createElement('button');
            bta.setAttribute('id', "button_aceitar");
            bta.textContent = "Aceitar";
            bta.addEventListener("click", (event) => {
                dv = document.getElementById(pedido.id_adocao);
                changeStatusAdotar(pedido.pet_id, "Adotado", pedido.id_adocao, "Aceito");
                dv.remove();
            });
            btc.setAttribute('id', "button_recusar");
            btc.textContent = "Recusar";
            btc.addEventListener("click", (event) => {
                dv = document.getElementById(pedido.id_adocao);
                changeStatusAdotar(pedido.pet_id, "Livre", pedido.id_adocao, "Recusado");
                dv.remove();
            });
            
            div.setAttribute("id", pedido.id_adocao);
            div.setAttribute("class", "card_adoption");
            //div.setAttribute("style", "display: block;");
            div.addEventListener("click", (event) => {
                console.log(event.target.id);
              });

            div.innerHTML = `
            <img class="status_img" alt="" src="${pedido.img}">
            <h2>Identificação: <span class="size_valor">${pedido.id_adocao}</span></h3></h2>
            <h3>ID do PET: <span class="size_valor">${pedido.pet_id}</span></h3></h3>
            <h3>Nome do Pet: <span class="size_valor">${pedido.pet_nome}</span></h3>
            <h3>Nome do Adotante: <span class="size_valor">${pedido.nome}</span></h3></h3>
            <h3>CPF do Adotante: <span class="size_valor">${pedido.id_adocao}</span></h3></h3>
            <h3>Email do Adotante: <span class="size_valor">${pedido.email}</span></h3></h3>
            <h3>Telefone do Adotante: <span class="size_valor">${pedido.telefone}</span></h3></h3>
            
            `;
            div.appendChild(bta);
            div.appendChild(btc);
            status_box.appendChild(div);
        }
    }
}

function find_pet(id, pets) {
    tam = pets.length;
    for (i = 0; i < tam; i++){
        pet = pets[i];
        if (pet.id == id) {
            return pet;
        }
    }
}

function adocao_att(pedidos, pets) {
    tam = pedidos.length;
    for (i = 0; i < tam; i++){
        pedido = pedidos[i];
        console.log(pedido);
        pet = find_pet(pedido.pet_id, pets);
        pedido['pet_nome'] = pet.nome;
        pedido['img'] = pet.img;
    }
    return pedidos;
}

