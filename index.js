const data = [
  {
    id: 1,
    title: "First",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quisipsum adipisci voluptatem delectus temporibus. Enim doloremque vero temporibus facere quis laboriosam quos. Expedita optio reprehenderit fuga eligendi quae nisi",
    url: "./images/1.jpg",
  },
  {
    id: 2,
    title: "Second",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quisipsum adipisci voluptatem delectus temporibus. Enim doloremque vero temporibus facere quis laboriosam quos. Expedita optio reprehenderit fuga eligendi quae nisi",
    url: "./images/2.jpg",
  },
  {
    id: 3,
    title: "Third",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quisipsum adipisci voluptatem delectus temporibus. Enim doloremque vero temporibus facere quis laboriosam quos. Expedita optio reprehenderit fuga eligendi quae nisi",
    url: "./images/3.jpg",
  },
  {
    id: 4,
    title: "Fourth",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quisipsum adipisci voluptatem delectus temporibus. Enim doloremque vero temporibus facere quis laboriosam quos. Expedita optio reprehenderit fuga eligendi quae nisi",
    url: "./images/4.jpg",
  },
  {
    id: 5,
    title: "Fifth",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quisipsum adipisci voluptatem delectus temporibus. Enim doloremque vero temporibus facere quis laboriosam quos. Expedita optio reprehenderit fuga eligendi quae nisi",
    url: "./images/5.jpg",
  },
];

// create a slide for each picture with title and description
const html = data.map((item) => {
  return `<div class="slides" style="background-image: url(${item.url})">
            <div>
              <h3>${item.title}</h3>
              <p>
                ${item.description}
              </p>
          </div>
        </div>`;
});

document.querySelector("div.container").innerHTML = html.join("");
document.querySelector("div.container > :first-child").classList.add("active");
document.querySelector("div.container > :last-child").classList.add("prev");
document.querySelector("div.container > :nth-child(2)").classList.add("next");

const slides = document.querySelectorAll(".slides");
const numSlides = document.querySelectorAll(".slides").length;
const slidesArray = Array.from(slides);
const pagDiv = document.querySelector(".pagination");

// create pagination button for each slide and add btn class
slidesArray.forEach((_, i) => {
  const pagButton = document.createElement("button");
  pagButton.setAttribute("id", i);
  pagButton.setAttribute("class", "btn");
  pagButton.innerHTML = "&FilledSmallSquare;";
  pagDiv.appendChild(pagButton);
});

const btns = document.querySelectorAll(".btn");
const btnsArray = Array.from(btns);

// handle active, next and previous slide by increasing index in slide array
function nextByArrow() {
  const activeSlide = slidesArray.find((slide) =>
    slide.classList.contains("active")
  );
  const index = slidesArray.indexOf(activeSlide);

  activeSlide.classList.remove("active");
  activeSlide.classList.add("prev");
  slidesArray.at(index - (numSlides - 1)).classList.remove("next");
  slidesArray.at(index - (numSlides - 1)).classList.add("active");
  slidesArray.at(index - 1).classList.remove("prev");
  slidesArray.at(index - numSlides + 2).classList.add("next");
  navStyle();
  autoPlay();
}

// handle active, next and previous slide by decreasing index in slide array
function prevByArrow() {
  const activeSlide = slidesArray.find((slide) =>
    slide.classList.contains("active")
  );
  const index = slidesArray.indexOf(activeSlide);
  // const nextSlide = activeSlide.nextElementSibling;

  activeSlide.classList.remove("active");
  activeSlide.classList.add("next");
  // nextSlide.classList.remove("next");
  slidesArray.at(index - numSlides + 1).classList.remove("next");
  slidesArray.at(index - 1).classList.remove("prev");
  slidesArray.at(index - 1).classList.add("active");
  slidesArray.at(index - 2).classList.add("prev");
  navStyle();
  autoPlay();
}

// handle arrow buttons by handler functions
document.querySelector(".right-arrow").addEventListener("click", nextByArrow);
document.querySelector(".left-arrow").addEventListener("click", prevByArrow);

// handle pagination buttons based on active slide and button id using handle active functions
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

btnsArray.forEach((btn) => handleNavigation(btn.id));

// add proper style to active button after active slide change
document.getElementById(`0`).classList.add("activeBtn");
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

// set intervall for autoplay
let intervalId = setInterval(() => nextByArrow(), 5000);

// reset and reactive autoplay after changing active slide by handler functions
function autoPlay() {
  clearInterval(intervalId);
  intervalId = setInterval(() => nextByArrow(), 5000);
}

// handle active slide by arrow buttons
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextByArrow();
    autoPlay();
  } else if (e.key === "ArrowLeft") {
    prevByArrow();
    autoPlay();
  }
});
