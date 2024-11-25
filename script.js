const links = [...document.querySelectorAll(".links li")];
const upperOpDivs = [...document.querySelectorAll(".upper-options div")];
const hami = document.querySelector(".hamburger i");
const mainMenu = document.querySelector(".menu-links");
const cross = document.querySelector(".menu-links i");
const hamburgerLinks = [...document.querySelectorAll(".li-links li")];
const planetInfoCont = document.querySelector(".planet-info");
const logo = document.querySelector(".logo");

const colors = [
    "#419ebb",
    "#eda249",
    "#6d2ed5",
    "#d14c32",
    "#d83a34",
    "#cd5120",
    "#1ec1a2",
    "#2d68f0" 
];

let selectedPlanet = links[0];
let cnt = 0;
let planetsData;
let selectedOption = 0;

function optionBasedDataRender(op, idx) {
    const info = document.querySelector(".base-info p")
    const src = document.querySelector(".source a");
    const sideImg = document.querySelector(".side-img img");
    const geo = document.querySelector(".geo");

    info.innerText = planetsData[idx][op].content;
    src.href = planetsData[idx][op].source;
    
    if(selectedOption === 0) {
        sideImg.src = planetsData[idx].images.planet;
        geo.classList.remove("show");
    }
    else if(selectedOption === 1) {
        sideImg.src = planetsData[idx].images.internal; 
        geo.classList.remove("show");
    }
    else {
        sideImg.src = planetsData[idx].images.planet;
        geo.classList.add("show");
    }
}

function setHeight() {
    const baseHeight = document.querySelector(".container").clientHeight;
    document.querySelector(".scrolling-bg").style.height = `${baseHeight}px`;
}

function renderData(el) {
    if(selectedPlanet) selectedPlanet.classList.remove("selected");
    el.classList.add("selected");
    selectedPlanet = el;

    const idx = links.indexOf(el);
    const dt = planetsData[idx];

    const inHTML = `
        <div class="planet-info">
            <div class="upper">
                <div class="side-img">
                    <img src=${dt.images.planet}>
                    <img class="geo" src=${dt.images.geology}>
                </div>
                <div class="main-data">
                    <div class="front">
                        <div class="base-info">
                            <h1>${dt.name}</h1>
                            <p>${dt.overview.content}</p>
                        </div>
                        <div class="source">
                            <span>Source: </span>
                            <a href=${dt.overview.source}>Wikipedia</a>
                            <img src="assets/src.svg" alt="sc">
                        </div>
                    </div>
                    <div class="diff-sec">
                        <div class="overview sec">
                            <span>01 overview</span>
                        </div>
                        <div class="inter-str sec">
                            <span>02 internal structure</span>
                        </div>
                        <div class="surf sec">
                            <span>03 surface geology</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lower">
                <div class="rotation base-view">
                    <p>rotation time</p>
                    <h1>${dt.rotation}</h1>
                </div>
                <div class="revolution base-view">
                    <p>revolution time</p>
                    <h1>${dt.revolution}</h1>
                </div>
                <div class="radius base-view">
                    <p>radius</p>
                    <h1>${dt.radius}</h1>
                </div>
                <div class="average-temp base-view">
                    <p>average temp.</p>
                    <h1>${dt.temperature}</h1>
                </div>
            </div>
        </div>
    `;
    
    upperOpDivs[selectedOption].classList.remove("selected")
    planetInfoCont.style.opacity = 0;

    setTimeout(() => {
        planetInfoCont.innerHTML = inHTML;
        planetInfoCont.style.opacity = 1;
        selectedOption = 0;

        const allNavigators = [...document.querySelectorAll(".sec")];
        
        upperOpDivs[selectedOption].classList.add("selected");
        upperOpDivs.forEach((op) => {
            op.style.setProperty("--before-color", colors[idx]);

            op.addEventListener("click", () => {
                upperOpDivs[selectedOption].classList.remove("selected")
                op.classList.add("selected");
                selectedOption = upperOpDivs.indexOf(op);

                if(selectedOption === 0) optionBasedDataRender("overview", idx);
                else if(selectedOption === 1) optionBasedDataRender("structure", idx);
                else optionBasedDataRender("geology", idx);
            })
        });
        
        
        
        allNavigators[selectedOption].classList.add("option-selected")

        allNavigators.forEach((op) => {
            op.style.setProperty("--before-color", colors[idx]);

            op.addEventListener("click", () => {
                allNavigators[selectedOption].classList.remove("option-selected");
                op.classList.add("option-selected");
                selectedOption = allNavigators.indexOf(op);

                if(selectedOption === 0) optionBasedDataRender("overview", idx);
                else if(selectedOption === 1) optionBasedDataRender("structure", idx);
                else optionBasedDataRender("geology", idx);
            });
        });

        setHeight();
    }, 300);
}

links.forEach((el) => {
    el.style.setProperty("--before-color", colors[cnt++]);
    el.addEventListener("click", () => {
        renderData(el);
    });
});

cnt = 0;

hamburgerLinks.forEach((el) => {
    el.children[0].style.setProperty("--before-color", colors[cnt++]);
    el.children[1].addEventListener("click", () => {
        renderData(links[hamburgerLinks.indexOf(el)]);
        mainMenu.classList.remove("menu-clicked");
    });
});

hami.addEventListener("click", () => {
    mainMenu.classList.toggle("menu-clicked");
});

cross.addEventListener("click", () => {
    mainMenu.classList.toggle("menu-clicked");
});

logo.addEventListener("click", () => {
    window.location.href = "index.html";
})

window.addEventListener("resize", setHeight);

fetch("data.json")
.then(res => res.json())
.then(data => {
    planetsData = data;
    renderData(selectedPlanet);
});