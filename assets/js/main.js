//Show Menu
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose =document.getElementById('nav-close');

//Men show
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    });
}

//Hide show
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    });
}


// Swiper Categories
var swiperCategories = new Swiper(".categories__container", {
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      },
  });

  //Products Tabs
  const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[content]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target);
       tabContents.forEach((tabContent) => {
        tabContent.classList.remove('active-tab')
       });

       target.classList.add('active-tab');

       tabs.forEach((tab) => {
        tab.classList.remove('active-tab')
       });

       tab.classList.add('active-tab')
    });
  });
