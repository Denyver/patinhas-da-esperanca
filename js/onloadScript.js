window.onload = () => {
    let wls = window.location.search;
    let urlsearch = new URLSearchParams(wls);
    //document.getElementById('id_show').innerHTML = urlserach.get('id');
    let id = String(urlsearch.get('id'));
    console.log(id);
    getAnimal(id);
}

api_link = "https://4uspryly5g.execute-api.sa-east-1.amazonaws.com/dev/animais";
function getAnimal(id) {
    //console.log("Fetch")
    fetch(api_link,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id
            })
        }
    ).then(response => response.json())
        .then(code => {
            console.log(code.animal);
            inputAnimalInfo(code.animal);

        })
}

function inputAnimalInfo(animal) {
    document.getElementById('nome').innerHTML = animal.nome;
    document.getElementById('raca').innerHTML = animal.raca;
    document.getElementById('idade').innerHTML = animal.idade;
    document.getElementById('especie').innerHTML = animal.especie;
    document.getElementById('descricao').innerHTML = animal.descricao;
    img = document.getElementById('pet_img');
    img.setAttribute('src', animal.img);
    let styleImg = "border-radius: 10px";
    img.setAttribute('style', styleImg);

}
