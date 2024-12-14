const slides = document.querySelector('.slides');
const slideCount = slides.children.length;
let index = 0;

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % slideCount;
  slides.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + slideCount) % slideCount;
  slides.style.transform = `translateX(-${index * 100}%)`;
});
