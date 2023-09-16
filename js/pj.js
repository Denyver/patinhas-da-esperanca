const navSlide = () => {
    const pp = document.querySelector('.pp'),
     nav = document.querySelector('.link'),
    navlinks = document.querySelectorAll('.link li');
    
          pp.addEventListener('click', () => {
          nav.classList.toggle('link-active');
         navlinks.forEach((link, index)=>{
        if(link.style.animation){
            link.style.animation = ''
   
        } else{
           link.style.animation = `navlinkfade 0.5  ease forwards ${index / 7 + 3}s`;
        }
        
       });
    });
 
}

navSlide();