api_link_adotar = "https://4uspryly5g.execute-api.sa-east-1.amazonaws.com/dev/animais/animal";

function postAnimal(nome, especie, raca, url, idade, descricao) { //Função Fetch envia os dados via API e recebe uma response com o token referente ao segredo
    console.log("Fetch")
    fetch(api_link_adotar,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "especie": especie,
                "idade": idade,
                "img": url,
                "nome": nome,
                "raca": raca,
                "descricao": descricao
            })
        }
    ).then(response => response.json())
        .then(code => {
            alert('Cadastrado!')
        })
}

function createAnimal() {
    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let url = document.getElementById('inputimg').value;
    let raca = document.getElementById('raca').value;
    let especie = document.querySelector('input[name="especie"]:checked').value;
    let descricao = document.getElementById('descricao').value;
    console.log(especie);

    postAnimal(nome, especie, raca, url, idade, descricao);

}
