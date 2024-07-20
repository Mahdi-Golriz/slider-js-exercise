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

class Slider {
  #data;
  #html;
  #activeSlide;
  #slidesArray;
  #numSlides;
  #pagDiv;
  #pagButton;
  #btnsArray;
  #activeSlideElement;
  #activeIndex;
  #activeButton;
  #intervalId;
  #intervalTime;

  constructor(data, firstActive, intervalTime) {
    this.#data = data;
    this.#html = data.map((item) => {
      return `<div class="slides" style="background-image: url(${item.url})">
                <div>
                  <h3>${item.title}</h3>
                  <p>
                    ${item.description}
                  </p>
              </div>
            </div>`;
    });

    this.#activeSlide = firstActive;
    this.#intervalTime = intervalTime;
    this.initialize();
  }

  initialize() {
    this.initializeSlides();
    this.initializePagButtons();
    this.handlePagination();
    this.handleNavigation();
    this.autoPlay();
    this.handleArrowKeys();
  }

  initializeSlides() {
    document.querySelector("div.container").innerHTML = this.#html.join("");
    this.#slidesArray = Array.from(document.querySelectorAll(".slides"));
    this.#numSlides = this.#slidesArray.length;
    this.#slidesArray.at(this.#activeSlide).classList.add("active");
    this.#slidesArray
      .at(this.#activeSlide - (this.#numSlides - 1))
      .classList.add("next");
    this.#slidesArray.at(this.#activeSlide - 1).classList.add("prev");
  }

  // create pagination button for each slide and add btn class
  initializePagButtons() {
    this.#pagDiv = document.querySelector(".pagination");

    this.#slidesArray.forEach((_, i) => {
      this.#pagButton = document.createElement("button");
      this.#pagButton.setAttribute("id", i);
      this.#pagButton.setAttribute("class", "btn");
      this.#pagButton.innerHTML = "&FilledSmallSquare;";
      this.#pagDiv.appendChild(this.#pagButton);
    });

    document.getElementById(`0`).classList.add("activeBtn");
  }

  // handle active, next and previous slide by increasing index in slide array
  nextByArrow() {
    this.#activeSlideElement = this.#slidesArray.find((slide) =>
      slide.classList.contains("active")
    );
    this.#activeIndex = this.#slidesArray.indexOf(this.#activeSlideElement);

    this.#activeSlideElement.classList.remove("active");
    this.#activeSlideElement.classList.add("prev");
    this.#slidesArray
      .at(this.#activeIndex - (this.#numSlides - 1))
      .classList.remove("next");
    this.#slidesArray
      .at(this.#activeIndex - (this.#numSlides - 1))
      .classList.add("active");
    this.#slidesArray.at(this.#activeIndex - 1).classList.remove("prev");
    this.#slidesArray
      .at(this.#activeIndex - this.#numSlides + 2)
      .classList.add("next");

    this.navStyle();
    this.clearAutoPlay();
  }

  // handle active, next and previous slide by decreasing index in slide array
  prevByArrow() {
    this.#activeSlideElement = this.#slidesArray.find((slide) =>
      slide.classList.contains("active")
    );
    this.#activeIndex = this.#slidesArray.indexOf(this.#activeSlideElement);

    this.#activeSlideElement.classList.remove("active");
    this.#activeSlideElement.classList.add("next");
    this.#slidesArray
      .at(this.#activeIndex - this.#numSlides + 1)
      .classList.remove("next");
    this.#slidesArray.at(this.#activeIndex - 1).classList.remove("prev");
    this.#slidesArray.at(this.#activeIndex - 1).classList.add("active");
    this.#slidesArray.at(this.#activeIndex - 2).classList.add("prev");
    this.navStyle();
    this.clearAutoPlay();
  }

  // handle arrow buttons by handler functions
  handlePagination() {
    document
      .querySelector(".right-arrow")
      .addEventListener("click", () => this.nextByArrow());
    document
      .querySelector(".left-arrow")
      .addEventListener("click", () => this.prevByArrow());
  }

  // handle pagination buttons based on active slide and button id using handle active functions
  Navigation(id) {
    this.#activeButton = document.getElementById(`${id}`);
    this.#activeButton.addEventListener("click", () => {
      this.#activeSlide = Array.from(document.querySelectorAll(".slides")).find(
        (slide) => slide.classList.contains("active")
      );
      this.#activeIndex = this.#slidesArray.indexOf(this.#activeSlide);
      const deviation = this.#activeIndex - id;
      for (let i = 0; i < Math.abs(deviation); i++) {
        if (deviation > 0) this.prevByArrow();
        if (deviation < 0) this.nextByArrow();
      }

      this.navStyle();
      this.clearAutoPlay();
    });
  }

  handleNavigation() {
    this.#btnsArray = Array.from(document.querySelectorAll(".btn"));
    this.#btnsArray.forEach((btn) => this.Navigation(btn.id));
  }

  // add proper style to active button after active slide change
  navStyle() {
    this.#activeSlide = Array.from(document.querySelectorAll(".slides")).find(
      (slide) => slide.classList.contains("active")
    );
    this.#activeIndex = this.#slidesArray.indexOf(this.#activeSlide);
    this.#btnsArray.forEach((btn) =>
      +btn.id === this.#activeIndex
        ? document.getElementById(`${btn.id}`).classList.add("activeBtn")
        : document.getElementById(`${btn.id}`).classList.remove("activeBtn")
    );
  }

  autoPlay() {
    this.#intervalId = setInterval(
      () => this.nextByArrow(),
      this.#intervalTime
    );
  }

  clearAutoPlay() {
    clearInterval(this.#intervalId);
    this.autoPlay();
  }

  // handle active slide by arrow buttons

  handleArrowKeys() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.nextByArrow();
        this.clearAutoPlay();
      } else if (e.key === "ArrowLeft") {
        this.prevByArrow();
        this.clearAutoPlay();
      }
    });
  }
}

const slider = new Slider(data, 0, 5000);
