    const swiper = new Swiper(".swiper-container",{
        effect:"coverflow",
        loop: true,
        grabcursor: true,
        centeredSlides: true,
        slidesPerView:"auto",
        coverflowEffect:{
            rotate: 20,
            stretch: 0,
            depth: 350,
            modifier: 1,
            slideShadows: true,
        },
        pagination:{
            el:".swiper-pagination"
        },
    })