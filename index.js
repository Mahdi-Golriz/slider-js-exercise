const slides = document.querySelectorAll(".slides");
const numSlides = document.querySelectorAll(".slides").length;
const slidesArray = Array.from(slides);

const pagDiv = document.querySelector(".pagination");

slidesArray.forEach((_, i) => {
  const pagButton = document.createElement("button");
  pagButton.setAttribute("id", i);
  pagButton.setAttribute("class", "btn");
  pagButton.innerHTML = "&FilledSmallSquare;";
  pagDiv.appendChild(pagButton);
});

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
  navStyle();
  autoPlay();
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
  navStyle();
  autoPlay();
}

const btns = document.querySelectorAll(".btn");
const btnsArray = Array.from(btns);

function handleNavigation(id) {
  const activeButton = document.getElementById(`${id}`);

  activeButton.addEventListener("click", function () {
    const activeSlide = Array.from(document.querySelectorAll(".slides")).find(
      (slide) => slide.classList.contains("active")
    );
    const index = slidesArray.indexOf(activeSlide);
    const deviation = index - id;
    for (let i = 0; i < Math.abs(deviation); i++) {
      if (deviation > 0) prevByArrow();
      if (deviation < 0) nextByArrow();
    }

    navStyle();

    autoPlay();
  });
}

document.querySelector(".right-arrow").addEventListener("click", nextByArrow);
document.querySelector(".left-arrow").addEventListener("click", prevByArrow);

btnsArray.forEach((btn) => handleNavigation(btn.id));

function navStyle() {
  const activeSlide = Array.from(document.querySelectorAll(".slides")).find(
    (slide) => slide.classList.contains("active")
  );
  const index = slidesArray.indexOf(activeSlide);
  btnsArray.forEach((btn) =>
    +btn.id === index
      ? document.getElementById(`${btn.id}`).classList.add("activeBtn")
      : document.getElementById(`${btn.id}`).classList.remove("activeBtn")
  );
}

let intervalId = setInterval(() => nextByArrow(), 5000);

function autoPlay() {
  clearInterval(intervalId);
  intervalId = setInterval(() => nextByArrow(), 5000);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextByArrow();
    autoPlay();
  } else if (e.key === "ArrowLeft") {
    prevByArrow();
    autoPlay();
  }
});

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
