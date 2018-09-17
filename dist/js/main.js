document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems);
  });


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

const size = window.screen.width

if(size <= 993) {
  const lent = document.querySelector('#lente')
  const buscador = document.querySelector('#mobile-search')
  lent.addEventListener('click', function() {
    buscador.style.display = 'block'
    lent.style.display = 'none'
  })
  const close = document.querySelector('#close')
  close.addEventListener('click', function() {
    buscador.style.display = 'none'
    lent.style.display = 'block'
  })
}
