const section = document.querySelector('.navigation__section');
const navigation = document.querySelector('.navigation');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');
const menu = document.querySelector('.navigation__menu');

document.onscroll = function() {
    if (window.pageYOffset > 46)  {
        navigation.classList.add('navigation--fixed');
        logo.classList.add('logo--small');
        menu.classList.add('navigation__menu--top');
    } else {
        navigation.classList.remove('navigation--fixed');
        logo.classList.remove('logo--small');
        menu.classList.remove('navigation__menu--top');
    }
};
