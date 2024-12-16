const header_select = document.querySelector("#header_select");
const header_right_checkbox = document.querySelector("#header_right_checkbox");
const toggle_button = document.querySelector("#toggle_button");
const header_right_img_moon = document.querySelector("#header_right_img_moon");
const first_one_inside_input = document.querySelector("#first_one_inside_input");
const first_one_inside_search = document.querySelector("#first_one_inside_search");
const second_one_left_h2 = document.querySelector("#second_one_left_h2");
const second_one_left_h3 = document.querySelector("#second_one_left_h3");
const second_one_right_text = document.querySelector("#second_one_right_text");
const fourth_one_bottom_li1 = document.querySelector("#fourth_one_bottom_li1");
const fourth_one_bottom_li2 = document.querySelector("#fourth_one_bottom_li2");
const fourth_one_bottom_li3 = document.querySelector("#fourth_one_bottom_li3");
const fiveth_one_right_h3 = document.querySelector("#fiveth_one_right_h3");
const seventh_one_bottom_li = document.querySelector("#seventh_one_bottom_li");
const seventh_one_bottom_p = document.querySelector("#seventh_one_bottom_p");
const second_one_main = document.querySelector("#second_one_main");
const body = document.querySelector("body");
const undefined_word = document.querySelector("#undefined_word");
const form = document.querySelector("#form");

function createCard(data) {
    return `
        <div class="second_one">
            <div class="second_one_left">
              <h2 id="second_one_left_h2">${data[0].word}</h2>
              <h3 id="second_one_left_h3">${data[0].phonetics[0].text || "No phonetics available"}</h3>
            </div>
            <div class="second_one_right">
                <audio id="audio" src=""></audio>
                <button type="button" id="second_one_right_btn">
                    <img
                        // src="./images/traengle.svg"
                        // alt=""
                        // style="width: 21px; height: 21px"
                    >                
                 </button>
            </div>
          </div>
          <div class="third_one">
            <div class="third_one_left">
              <h3>${data[0].meanings[0].partOfSpeech}</h3>
            </div>
            <div class="third_one_right"></div>
          </div>
          <div class="fourth_one">
            <h3>Meaning</h3>
            <div class="fourth_one_bottom">
              <ul style='max-width : 689px'>
                ${data[0].meanings[0].definitions.map((value) => (
        `<li>${value.definition}</li>`
    ))} 
              </ul>
            </div>
          </div>
          <div class="fiveth_one">
            <div class="fiveth_one_left">
              <h3>Synonyms</h3>
            </div>
            <div class="fiveth_one_right">
              <h3 id="fiveth_one_right_h3">${data[0].meanings[0].synonyms[0] || "No synonyms available"}</h3>
            </div>
          </div>
          <div class="sixth_one">
            <div class="sixth_one_left">
              <h3>${data[0].meanings[1].partOfSpeech}</h3>
            </div>
            <div class="sixth_one_right"></div>
          </div>
          <div class="seventh_one">
            <h3>Meaning</h3>
            <div class="seventh_one_bottom">
              <ul>
                <li id="seventh_one_bottom_li">${data[0].meanings[1].definitions[0].definition || "No definition available"}</li>
              </ul>
              <p id="seventh_one_bottom_p">${data[0].meanings[1].definitions[0].example || "No example available"}</p>
            </div>
          </div>
          <div id = 'line'></div>
          <div id="eightth_one">
            <div id="bottom">
                <p>Source</p>
                <a href="${data[0].sourceUrls[0]}">${data[0].sourceUrls[0]}</a>
                <a id="bottom_icon" href="${data[0].sourceUrls[0]}"><img src="./images/tabler_external-link.svg" alt="" ></a>
            </div>
          </div>
    `;
}

header_select && header_select.addEventListener("change", function () {
    let select = header_select.value;
    body.classList.add(".bodyselect");


    if (select === "inter") {
        body.classList = "inter";
        
    }
    if (select === "serif") {
        body.classList = "serif";

    }
    if (select === "monospace") {
        body.classList = "mono";
    }
    if (select === "sans-serif") {
        body.classList = "sans-serif";
    }
});

function translate() {

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${first_one_inside_input.value}`, {
        method: "GET"
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            let cards = createCard(data);
            second_one_main.innerHTML = cards;
            undefined_word.style.display = "none"
            // const au = audio;
            
            const btn = document.querySelector("#second_one_right_btn")
            const newaudio = document.querySelector("#audio");
            btn.addEventListener('click',function() {
            
            const audiotext = data[0].phonetics
            audiotext.filter((value) => {
            if (value.audio != "") {
                console.log(value.audio);
                newaudio.src = value.audio;
                newaudio.play();
            }

            }); 
            })

        })
        .catch(error => {
            undefined_word.style.display = "block";
            second_one_main.innerHTML = "";
            return error;
        });
}

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle_button.checked = true;
}


toggle_button && toggle_button.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        localStorage.setItem('theme', "light");
    } else {
        body.classList.add("dark");
        localStorage.setItem('theme', "dark");
    }
});

first_one_inside_search && first_one_inside_search.addEventListener("click", function () {
    if (!first_one_inside_input.value) {
        empty_input.style.display = 'block'
        second_one_main.style.display = 'none'
        undefined_word.style.display = 'none';
        first_one_inside_input.focus();
    } else {
        empty_input.style.display = 'none';
        second_one_main.style.display = 'block';

    }
    const text = first_one_inside_input.value;
    if (text.length < 2) {
        alert("Sozingiz uzunligi 2ta harfdan kam bolmasin!!!");
        form.reset();
        return;
    }
    translate();
});


