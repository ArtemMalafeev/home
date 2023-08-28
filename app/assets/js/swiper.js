const swiper = new Swiper('.swiper', {
    spaceBetween: 16,
    grabCursor: true,

    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },

    breakpoints: {
        430: {
            slidesPerView: 2,
        },
        870: {
            slidesPerView: 3,
        },
    }
});
