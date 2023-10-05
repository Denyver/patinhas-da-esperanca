let images = document.querySelectorAll(".img-responsive"); 

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