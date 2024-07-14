const slides = document.querySelectorAll(".slides");
const numSlides = document.querySelectorAll(".slides").length;
const slidesArray = Array.from(slides);

// function nextByArrow() {
//   const activeSlide = slidesArray.find((slide) =>
//     slide.classList.contains("active")
//   );
//   const index = slidesArray.indexOf(activeSlide);
//   const nextSlide = activeSlide.nextElementSibling;
//   const prevSlide = activeSlide.previousElementSibling;
//   activeSlide.classList.add("prev");
//   activeSlide.classList.remove("active");

//   if (index === 0) {
//     nextSlide.classList.remove("next");
//     nextSlide.classList.add("active");
//     slidesArray[index + 2].classList.add("next");
//     slidesArray[numSlides - 1].classList.remove("prev");
//   } else if (index > 0 && index < numSlides - 2) {
//     prevSlide.classList.remove("prev");
//     nextSlide.classList.remove("next");
//     nextSlide.classList.add("active");
//     slidesArray[index + 2].classList.add("next");
//   } else if (index === numSlides - 2) {
//     prevSlide.classList.remove("prev");
//     nextSlide.classList.remove("next");
//     nextSlide.classList.add("active");
//     slidesArray[0].classList.add("next");
//   } else {
//     prevSlide.classList.remove("prev");
//     slidesArray[0].classList.remove("next");
//     slidesArray[0].classList.add("active");
//     slidesArray[1].classList.add("next");
//   }
// }

function nextByArrow() {
  const activeSlide = slidesArray.find((slide) =>
    slide.classList.contains("active")
  );
  const index = slidesArray.indexOf(activeSlide);
  activeSlide.classList.add("prev");
  activeSlide.classList.remove("active");
  slidesArray.at(index - (numSlides - 1)).classList.remove("next");
  slidesArray.at(index - (numSlides - 1)).classList.add("active");
  slidesArray.at(index - 1).classList.remove("prev");
  slidesArray.at(index - 3).classList.add("next");
}

function prevByArrow() {
  const activeSlide = slidesArray.find((slide) =>
    slide.classList.contains("active")
  );
  const index = slidesArray.indexOf(activeSlide);
  const nextSlide = activeSlide.nextElementSibling;

  activeSlide.classList.remove("active");
  activeSlide.classList.add("next");
  nextSlide.classList.remove("next");
  slidesArray.at(index - 1).classList.remove("prev");
  slidesArray.at(index - 1).classList.add("active");
  slidesArray.at(index - 2).classList.add("prev");
}

document.querySelector(".right-arrow").addEventListener("click", nextByArrow);
document.querySelector(".left-arrow").addEventListener("click", prevByArrow);
