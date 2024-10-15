
document.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var maxScroll = 300; // Adjust this value as needed
    var opacity = Math.max(1 - scrollTop / maxScroll, 0);
    
    var div = document.getElementById('disappear-on-scroll');
    div.style.opacity = opacity;

    var hero = document.querySelector('.hero');
    hero.style.opacity = opacity;
});

document.getElementById('nav_button').addEventListener('change', function() {
    var nav = document.getElementById('nav1');
    if (this.checked) {
        nav.classList.add('open');
        document.body.classList.add('no-scroll');
        nav.classList.remove('close');
    } else {
        nav.classList.remove('open');
        nav.classList.add('close');
        document.body.classList.remove('no-scroll');
    }
});


const text = document.getElementById("image-text");
text.innerHTML = text.innerText
  .split("")
  .map(
    (char, i) =>
      `<span class="char" style="transform: rotate(${
        i * 10.5
      }deg);">${char}</span>`
  )
  .join("");







  