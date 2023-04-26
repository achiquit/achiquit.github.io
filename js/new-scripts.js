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


//Scroll Things

$(function(){
  
 
  gsap.registerPlugin(ScrollTrigger);
     

  gsap.to("#brazil", { //The object you want to animate
			scrollTrigger: {
				trigger: "#brazil", //The element that will trigger the animation
				start: "-150px center", //Starting point, e.g., 500 pixels down from the top
				end: "1500px center",
				markers: false, //Delete the markers before putting it on the Internet
				toggleActions: "play reverse play reverse" //On Enter, On Leave, On Reverse Enter, On Reverse Leave
			},
			display:'flex',   //The CSS you want to animate
            left: '100%'
		});

  gsap.to("#norway", { //The object you want to animate
			scrollTrigger: {
				trigger: "#brazil", //The element that will trigger the animation
				start: "350px center", //Starting point, e.g., 500 pixels down from the top
				end: "1500px center",
				markers: false, //Delete the markers before putting it on the Internet
				toggleActions: "play reverse play reverse" //On Enter, On Leave, On Reverse Enter, On Reverse Leave
			},
			display:'flex',   //The CSS you want to animate
            left: '100%'
		});

  gsap.to("#germany", { //The object you want to animate
			scrollTrigger: {
				trigger: "#brazil", //The element that will trigger the animation
				start: "850px center", //Starting point, e.g., 500 pixels down from the top
				end: "1530px center",
				markers: false, //Delete the markers before putting it on the Internet
				toggleActions: "play reverse play reverse" //On Enter, On Leave, On Reverse Enter, On Reverse Leave
			},
			display:'flex',   //The CSS you want to animate
            left: '100%'
		});
});