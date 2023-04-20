const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const rage = 40;

// Funcion para calcular el valor de la posicion del mouse en relacion a la ventana
const calcValue = (a,b)=>(a/b*rage-rage/2).toFixed(1)

let timeout;
document.addEventListener("mousemove",({x,y})=>{
    if(timeout){
        window.cancelAnimationFrame(timeout);
    }
    timeout = window.requestAnimationFrame(()=>{
        const yValue = calcValue(y,window.innerHeight);
        const xValue = calcValue(x,window.innerWidth);
        cards.style.transform=`rotateX(${yValue}deg) rotateY(${xValue}deg)`
    })
})