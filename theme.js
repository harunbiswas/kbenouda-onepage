const sections = document.querySelectorAll("section");

const ids = [];

sections.forEach((item) => {
  ids.push(item.id);
});

const fragmentIdentifier = window.location.hash.substring(1);
let scrollCount = 0;

let isScroll = true;

setInterval(() => {
  isScroll = true;
}, 1000);

const scrollHandler = (e) => {
  const fragmentIdentifier = window.location.hash.substring(1).length
    ? window.location.hash.substring(1)
    : "home";

  const currentIndex =
    ids.indexOf(fragmentIdentifier) > 0 ? ids.indexOf(fragmentIdentifier) : 0;

  // active section
  let actioveId = "home";

  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((section) => {
    const distance = Math.abs(
      section.getBoundingClientRect().top - window.innerHeight / 2
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  });

  if (closestSection) {
    actioveId = closestSection.id;
  }

  // main action

  if (isScroll) {
    if (e.deltaY > 0) {
      scrollCount = scrollCount + 1;

      if (scrollCount > 1) {
        if (currentIndex < ids.length - 1 && actioveId === fragmentIdentifier) {
          scrollCount = 0;
          window.location.href = "#" + ids[currentIndex + 1];
          isScroll = false;
        }
      }
    } else {
      scrollCount = scrollCount + 1;
      if (scrollCount > 1) {
        if (currentIndex > 0 && actioveId === fragmentIdentifier) {
          scrollCount = 0;
          window.location.href = "#" + ids[currentIndex - 1];
          isScroll = false;
        }
      }
    }
  }
};

document.addEventListener("wheel", (e) => scrollHandler(e));
document.addEventListener("touchmove", (e) => scrollHandler(e));

// active menu
const menus = document.querySelectorAll(".nav-menu>li");

setInterval(() => {
  const actioveId = window.location.hash.substring(1).length
    ? window.location.hash.substring(1)
    : "home";

  menus.forEach((item) => {
    const activeHash = item.childNodes[1].href.split("#")[1];
    if (actioveId === activeHash) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}, 100);

const animatedSection = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animation");
      } else {
        entry.target.classList.remove("animation");
      }
    });
  },
  { threshold: 0.5 }
);

animatedSection.forEach((item) => {
  observer.observe(item);
});

/// slider
// equipment
const equipmentBtn = document.querySelector(".equipment-btn");
const equipmentMenu = document.querySelector(".equipment-menu");
const equipmentSliderBtns = document.querySelectorAll(".equipment-slider-btn");
const equipmentImg = document.querySelector(".equipment-img");

equipmentBtn.addEventListener("click", () => {
  equipmentMenu.classList.toggle("show");
  equipmentBtn.classList.toggle("active");
});
let marginLeft = 0;

equipmentSliderBtns[1].addEventListener("click", () => {
  if (marginLeft < equipmentImg.childElementCount - 1) {
    marginLeft++;
    equipmentImg.style.marginLeft = `-${marginLeft * 100}%`;
  }
});
equipmentSliderBtns[0].addEventListener("click", () => {
  if (marginLeft > 0) {
    marginLeft--;
    equipmentImg.style.marginLeft = `-${marginLeft * 100}%`;
  }
});

for (let i = 0; i < equipmentMenu.children.length; i++) {
  equipmentMenu.children[i].addEventListener("click", () => {
    marginLeft = i;
    equipmentImg.style.marginLeft = `-${marginLeft * 100}%`;
  });
}

// projects
const projectSliderBtn = document.querySelectorAll(".project-slider-btn");
const projectimg = document.querySelectorAll(".project-img");

let activeimg = 0;

for (let i = 0; i < projectSliderBtn.length; i++) {
  projectSliderBtn[i].addEventListener("click", () => {
    let indx = parseInt((i + 1 * 2) / projectimg.length - 1);
    if (i % 2 !== 0) {
      if (activeimg < projectimg[indx].childElementCount - 1) {
        for (let i = 0; i < projectimg[indx].childElementCount; i++) {
          projectimg[indx].children[i].classList.remove("active");
        }
        activeimg++;
        projectimg[indx].children[activeimg].classList.add("active");
        projectimg[indx].style.marginLeft = `-${activeimg * 200}px`;
      }
    } else {
      if (activeimg > 0) {
        for (let i = 0; i < projectimg[indx].childElementCount; i++) {
          projectimg[indx].children[i].classList.remove("active");
        }
        activeimg--;
        projectimg[indx].children[activeimg].classList.add("active");
        projectimg[indx].style.marginLeft = `-${activeimg * 200}px`;
      }
    }
  });
}

const projectInner = document.querySelector(".project-inner");
const projectBackBtns = document.querySelectorAll(
  ".project-main-btns > button"
);
let activeInner = 0;

projectBackBtns[1].addEventListener("click", () => {
  if (activeInner < projectInner.childElementCount - 1) {
    activeInner++;
    projectInner.style.marginLeft = `-${activeInner * 100}%`;
  }
});
projectBackBtns[0].addEventListener("click", () => {
  if (activeInner > 0) {
    activeInner--;
    projectInner.style.marginLeft = `-${activeInner * 100}%`;
  }
});

// contact

const showMapBtn = document.querySelector(".show-map-btn");
const closeMapBtn = document.querySelector(".close-map-btn");
const map = document.querySelector("#map");

showMapBtn.addEventListener("click", () => {
  map.classList.add("show");
});
closeMapBtn.addEventListener("click", () => {
  map.classList.remove("show");
});

// toggle
const toggle = document.querySelector(".toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
});
