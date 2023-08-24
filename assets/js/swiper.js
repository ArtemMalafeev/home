const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 16,
    grabCursor: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    breakpoints: {
        430: {
            slidesPerView: 2,
        },
    }
});
