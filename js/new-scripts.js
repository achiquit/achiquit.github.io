console.log('JS file is loaded.');

$( document ).ready(function() {
    console.log( "Jquery ready!" );
  
  $('.accordion-header').click(function(){
     console.log('testing');
    
    $(this).next().slideToggle();
    var $btn=$(this).find('h1.plus-minus');
    console.log($btn.html());
    $btn.toggleClass('rotated');
   
  });
  

  
});