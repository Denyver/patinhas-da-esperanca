let images = document.querySelectorAll(".img-responsive"); 
const api_link_adotar = "https://4uspryly5g.execute-api.sa-east-1.amazonaws.com/dev/animais";  //"https://albg97q39i.execute-api.sa-east-1.amazonaws.com/dev";

images.forEach(img => {
    img.addEventListener("mousemove", mouseMoving);//Evento que registra uma ação
    img.addEventListener("mouseout", mouseOut);
})

function mouseMoving(event){//Function é um bloco de código
    const imgatual = event.target
    imgatual.classList.add("activate");

    images.forEach(img => {
        if(img.classList.contains("activate")){
            img.classList.remove("filterImg");
        }
    })
}

function mouseOut(){
    images.forEach(img => {
        if(img.classList.contains("activate")){
            img.classList.remove("activate");
        }
        img.classList.add("filterImg");
    })
}


function testInput() {

    getAllAnimals();
}

function animal_card(listItem) {
    
    list_tam = listItem.length;
    box_animals = document.getElementById('animals_box');
    
    for (i = 0; i < list_tam; i++){
        let animal = listItem[i];
        if (animal.status == "Livre") {
            let img = animal.img;
            let id = animal.id;
            card = document.createElement('div');
            card.setAttribute('id', id);
            card.setAttribute('class', 'zoom');

            card.addEventListener('click', function () {
                location.href = "animais/animal_show.html?id=" + id;
                
            });

            imagem = document.createElement('img');
            imagem.setAttribute('src', img);
            imagem.setAttribute('class', 'img-responsive')
            card.appendChild(imagem);
            box_animals.appendChild(card);
        }
    }
}

function getAllAnimals() {
    //console.log("Fetch")
    fetch(api_link_adotar,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            
        }
    ).then(response => response.json())
        .then(code => {
            if (code.statusCode == 500) { //Se o retorno do fetch for o status code 404, not found ele retorna 0.
               console.log("Erro");
            }
            //displaySecretContent(); //Ocorreu tudo bem e os dados do segredo serão mostrados para o usuário, assim como a opção de deleta-lo.
            animal_card(code.animais);

        })
}


