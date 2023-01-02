const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

//Show sidebar
menuBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'block';
});
//Close sidebar
closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'none';
});
//Change theme
themeToggler.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});
$(function() {

    $('.js-check-all').on('click', function() {
      
      if ( $(this).prop('checked') ) {
        $('.control--checkbox input[type="checkbox"]').each(function() {
          $(this).prop('checked', true);
          $(this).closest('tr').addClass('active');
        })
      } else {
        $('.control--checkbox input[type="checkbox"]').each(function() {
          $(this).prop('checked', false);
          $(this).closest('tr').removeClass('active');
        })
      }
  
    });
  
    $('.control--checkbox input[type="checkbox"]').on('click', function() {
      if ( $(this).closest('tr').hasClass('active') ) {
        $(this).closest('tr').removeClass('active');
      } else {
        $(this).closest('tr').addClass('active');
      }
    }); 
});