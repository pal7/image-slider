const track = document.querySelector(".carousel__track");
console.log(track);

const slides = Array.from(track.children);
console.log(slides);

const prevBtn = document.querySelector(".carousel__button--left");
// console.log(prevBtn);

const nextBtn = document.querySelector(".carousel__button--right");
// console.log(nextBtn);

const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
// console.log(dots);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;
console.log(slideWidth);

// arrange slides next to one another
/* slides[0].style.left = slidewidth * 0 + "px";
slides[1].style.left = slideWidth * 1 + "px";
slides[2].style.left = slideWidth * 2 + "px"; */

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

/* ------------------ when I click left/right arrows, move slides to left/right ----------------- */

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, nextBtn, prevBtn, targetIndex) => {
  console.log(targetIndex);
  if (targetIndex === 0) {
    prevBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
  } else if (targetIndex === slides.length - 1) {
    nextBtn.classList.add("hide");
    prevBtn.classList.remove("hide");
  } else {
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");
  }
};

// move slide to left
prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  // console.log(prevSlide);
  moveToSlide(track, currentSlide, prevSlide);

  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot);

  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  hideShowArrows(slides, nextBtn, prevBtn, prevIndex);
});

//move the slide to right
nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  // console.log(nextSlide);
  moveToSlide(track, currentSlide, nextSlide);

  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  updateDots(currentDot, nextDot);

  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  hideShowArrows(slides, nextBtn, prevBtn, nextIndex);
});

/* ---------------- onclick nav indicators move to that slide --------------- */

dotsNav.addEventListener("click", (e) => {
  /* ---------------------------------- what dot was clicked on ?---------------------------------- */

  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  /* ------------ find target index and use it to find target slide ----------- */

  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  // console.log(targetIndex);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, nextBtn, prevBtn, targetIndex);
});
