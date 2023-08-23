const section = document.querySelector('.navigation__section');
const navigation = document.querySelector('.navigation');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');

document.onscroll = function() {
    if (window.pageYOffset > 48)  {
        navigation.classList.add('navigation--fixed');
        logo.classList.add('logo--small');
    } else {
        navigation.classList.remove('navigation--fixed');
        logo.classList.remove('logo--small');
    }
};
