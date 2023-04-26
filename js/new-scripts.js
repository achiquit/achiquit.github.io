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
				start: "0px center", //Starting point, e.g., 500 pixels down from the top
				end: "100000px center",
				markers: true, //Delete the markers before putting it on the Internet
				toggleActions: "play reverse play reverse" //On Enter, On Leave, On Reverse Enter, On Reverse Leave
			},
			display:'flex',   //The CSS you want to animate
            left: '0px'
		});
  
//    gsap.to("body", {//You can animate multiple things at once with a single trigger
//			scrollTrigger: {
//				trigger: "#box1",
//				start: "500px center",
//				end: "700px center",
//				toggleActions: "play reverse play reverse"
//			},
//			background:'orange'
//		});
  
  
//    gsap.to("#box2", {
//			scrollTrigger: {
//				trigger: "#box2",
//				start: "900px center",
//				end: "1100px center",
//				markers: true,
//				toggleActions: "play reverse play reverse"
//			},
//                display:'flex',
//                background:'white',
//                borderRadius:'10px',
//                color:'black',
//                width:'80%'
//		},500);
//  
//      gsap.to("body", {
//			scrollTrigger: {
//				trigger: "#box2",
//				start: "900px center",
//				end: "1100px center",
//				markers: true,
//				toggleActions: "play reverse play reverse"
//			},
//              background:'gold'
//		});
//  
//      gsap.to("#box3", {
//			scrollTrigger: {
//				trigger: "#box3",
//				start: "1300px center",
//				end: "1500px center",
//				markers: true,
//                toggleActions: "play reverse play reverse"
//			},
//			display:'flex',
//            transform:'rotateZ(90deg)'
//		});
//  
//        gsap.to("#circle1", {
//			scrollTrigger: {
//				trigger: "#box3",
//				start: "1300px center",
//				end: "1500px center",
//				markers: true,
//                toggleActions: "play reverse play reverse"
//			},
//			top:'500px',
//            left:'200px'
//		});
    });
