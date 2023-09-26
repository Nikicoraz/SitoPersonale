const secondi = 1;
const minuti = 60;
const ore = 3600;
const giorni = 86400;

const main = document.getElementsByTagName("main")[0];
const addButton = document.getElementById("aggiungi");
const removeButton = document.getElementById("rimuovi");

const q = document.querySelector.bind(document);

let removeMode = false;
let alertInCorso = false;

const divTemplate = () => {
    const mainDiv = document.createElement("div");

    const giorniDiv = document.createElement("div");
    giorniDiv.classList.add("giorni");

    const oreDiv = document.createElement("div");
    oreDiv.classList.add("ore");

    const minutiDiv = document.createElement("div");
    minutiDiv.classList.add("minuti");

    let h2 = document.createElement("h2");
    h2.innerText = "Giorni: ";
    giorniDiv.appendChild(h2);

    h2 = document.createElement("h2");
    h2.innerText = "Ore: ";
    oreDiv.appendChild(h2);

    h2 = document.createElement("h2");
    h2.innerText = "Minuti: ";
    minutiDiv.appendChild(h2);

    giorniDiv.appendChild(document.createElement("h1"));
    oreDiv.appendChild(document.createElement("h1"));
    minutiDiv.appendChild(document.createElement("h1"));

    mainDiv.appendChild(giorniDiv);
    mainDiv.appendChild(oreDiv);
    mainDiv.appendChild(minutiDiv);

    mainDiv.addEventListener("mouseover", e => {
        if (removeMode) mainDiv.style.backgroundColor = "red";
    });

    mainDiv.addEventListener("mouseleave", e => {
        if (removeMode) mainDiv.style.backgroundColor = "";
    });

    mainDiv.addEventListener("click", () => {
        if (removeMode) {
            let cookies = getCookies().timer;
            cookies = cookies.replace(mainDiv.id + "||", "");
            document.cookie = "timer=" + cookies;
            main.removeChild(document.getElementById(mainDiv.id));
            main.removeChild(mainDiv);
        }
    });

    return mainDiv;
};

function createAlert(messaggio) {
    if (alertInCorso) {
        document.body.removeChild(q("alert"));
    }
    const window = document.createElement("alert");
    window.innerText = messaggio;
    document.body.insertBefore(window, document.body.firstChild);
    alertInCorso = true;
    function changeOpacity(opacity) {
        if (opacity <= 0) {
            if (document.body.firstChild == window) {
                document.body.removeChild(window);
                alertInCorso = false;
            }
            return;
        }
        window.style.opacity = opacity + "%";
        setTimeout(changeOpacity, 50, opacity - 1);
    }
    setTimeout(() => {
        changeOpacity(100);
    }, 4000);
}

function init() {
    main.querySelectorAll("main > h1").forEach(child => {
        main.removeChild(child);
    });

    main.querySelectorAll("main > div").forEach(child => {
        const h1 = document.createElement("h1");
        const data = child.id.split("T");
        h1.innerText = data[0].replace(/-/g, "/");
        h1.innerText +=
            data.length > 1 ? (data[1] != "00:00" ? " " + data[1] : "") : "";
        h1.id = child.id;
        main.insertBefore(h1, child);
    });
}

function getCookies() {
    return document.cookie.split(";").map(cookie => cookie.split("=")).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key.trim()]: decodeURIComponent(value),
        }),
        {},
    );
}

function aggiungiTimer(data) {
    const div = divTemplate();
    div.id = data;
    main.appendChild(div);
    init();
}

function loadCookies() {
    cookies = getCookies() ? getCookies().timer : "";
    if (cookies == undefined || cookies == "") {
        return;
    }

    cookies.split("||").slice(0, -1).forEach(date => {
        aggiungiTimer(date);
    });
    console.log(cookies.split("||"));
}

function aggiornaContatori() {
    main.querySelectorAll("main>div").forEach(child => {
        aggiornaContatoriDiv(child);
    });
    setTimeout(aggiornaContatori, 1000);
}

function aggiornaContatoriDiv(div) {
    const h1_giorni = div
        .getElementsByClassName("giorni")[0]
        .getElementsByTagName("h1")[0];
    const h1_ore = div
        .getElementsByClassName("ore")[0]
        .getElementsByTagName("h1")[0];
    const h1_minuti = div
        .getElementsByClassName("minuti")[0]
        .getElementsByTagName("h1")[0];

    let tempoFinale = new Date(div.id).getTime() / 1000;
    let tempoAttuale = Date.now() / 1000;
    let tempoSecondi = Math.floor(tempoFinale - tempoAttuale);

    h1_giorni.innerText = Math.floor(tempoSecondi / giorni);
    h1_ore.innerText = Math.floor(tempoSecondi % giorni / ore);
    h1_minuti.innerText = Math.floor(tempoSecondi % ore / minuti);
}

removeButton.addEventListener("click", e => {
    e.preventDefault();
    removeMode = !removeMode;
    createAlert(
        "Modalità rimozione " + (removeMode ? "attivata!" : "disattivata!"),
    );
});

addButton.addEventListener("click", () => {
    const mainWindow = document.createElement("questionWindow");
    document.body.insertBefore(mainWindow, main);

    const formWindow = document.createElement("formWindow");
    mainWindow.appendChild(formWindow);

    const titolo = document.createElement("h1");
    titolo.innerText = "Inserire una data: ";
    formWindow.appendChild(titolo);

    const closeWindow = document.createElement("label");
    closeWindow.innerText = "X";
    formWindow.appendChild(closeWindow);

    closeWindow.addEventListener("click", () => {
        document.body.removeChild(q("questionWindow"));
    });

    const form = document.createElement("form");
    formWindow.appendChild(form);

    const date = document.createElement("input");
    date.type = "datetime-local";
    form.appendChild(date);

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    form.appendChild(submitBtn);

    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        if (date.value == "") {
            createAlert("Inserire una data valida! (YYYY-MM-DD HH:MM AM/PM)");
        } else {
            aggiungiTimer(date.value);
            let oldTimers = getCookies() ? getCookies().timer : "";
            oldTimers += date.value + "||";
            document.cookie = "timer=" + oldTimers;
            document.body.removeChild(q("questionWindow"));
        }
    });
});

init();
aggiornaContatori();
loadCookies();
