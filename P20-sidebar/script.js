const mostrarMenu=(headerToggle, navbarid) => {
    const togglBtn = document.getElementById(headerToggle)
    const nav = document.getElementById(navbarid)
    if(headerToggle && navbarid){
        togglBtn.addEventListener("click", ()=> {
            nav.classList.toggle("show-menu")
            togglBtn.classList.toggle("bx-x")
        })
    }
}
mostrarMenu("header-toggle", "navbar")
const linkcolor = document.querySelectorAll(".nav__link")
function colorLink(){
    linkcolor.forEach(item => item.classList.remove("active"))
    this.classList.add("active")
}
linkcolor.forEach(item => item.addEventListener("click", colorLink))