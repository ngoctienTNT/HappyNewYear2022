var design = anime({
    targets: '#newyear2020 #happy',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
  
  var design = anime({
    targets: '#newyear2020 #NEWYEAR',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
  
  
  
  var design = anime({
    targets: '#newyear2020 #Vector_43,#Vector_210,#Vector_207,#Vector_42,#Vector_45',
    translateY: -10,
    easing: 'easeInOutSine',
    duration: 2500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
  
document.addEventListener("click", function()
{
    window.location="./index.html";
});
