const selection = document.createElement("div");
selection.classList += "selection";
document.body.appendChild(selection);

let down = false;

start = {
    x: 0,
    y: 0,
};

document.addEventListener("mousedown", (e) => {
    start.x = e.x;
    start.y = e.y;
    down = true;
});

document.addEventListener("mousemove", (e) => {
    if (down) {
        if (e.x - start.x > 0) {
            selection.style.left = start.x + "px";
            selection.style.width = e.x - start.x + "px";
        } else {
            selection.style.left = e.x + "px";
            selection.style.width = start.x - e.x + "px";
        }
        if (e.y - start.y > 0) {
            selection.style.top = start.y + "px";
            selection.style.height = e.y - start.y + "px";
        } else {
            selection.style.top = e.y + "px";
            selection.style.height = start.y - e.y + "px";
        }
        selection.style.visibility = "visible";
        selection.style.transition = "0.05s";
    }
});

document.addEventListener("mouseup", (e) => {
    selection.style.visibility = "hidden";
    selection.style.transition = "none";
    selection.style.width = 0;
    selection.style.height = 0;
    down = false;
});
