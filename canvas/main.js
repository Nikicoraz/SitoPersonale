const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
let maxConnections = 10;
const lag = document.getElementById("lag");

const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "white",
    "yellow",
]

window.addEventListener("resize", (e) =>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("keydown", (e) =>{
    if(e.key == "c"){
        particlesArray.forEach((particle) =>{
            delete particle;
        })
        particlesArray.splice(0, particlesArray.length)
    }else if(e.key == "l"){
        maxConnections == 10 ? maxConnections = 1000 : maxConnections = 10;
        maxConnections == 10 ? lag.innerText = "Modalità lag (l): off" : lag.innerHTML = "Modalità lag (l): on";
    }
})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("click", (e) =>{
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 50; i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener("mousemove", (e) =>{
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 5; i++){
        particlesArray.push(new Particle());
    }
})

function drawCircle(color, x, y, radius){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

class Particle{
    constructor(){
        hue += 1;
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1;
        this.speedY = Math.random() * 3 - 1;
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.connections = 0;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.05;
    }
    draw(){
        drawCircle(this.color, this.x, this.y, this.size);
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle1) =>{
        if (particle1.x < 0 || particle1.x > canvas.width || particle1.y < 0 || particle1.y > canvas.height || particle1.size < 0.3){
            particlesArray.splice(particlesArray.indexOf(particle1), 1);
            delete particle1;
        }
        particlesArray.every((particle2) =>{
            const dx = particle1.x - particle2.x;
            const dy = particle1.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100){
                particle1.connections++;
                ctx.beginPath();
                ctx.strokeStyle = particle1.color;
                ctx.lineWidth = particle1.size / 3;
                ctx.moveTo(particle1.x, particle1.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.stroke();
            }
            if(particle1.connections > maxConnections){
                return false;
            }
            return true;
        })
        particle1.connections = 0;
        particle1.update();
        particle1.draw();
    })
    requestAnimationFrame(animate);
}
animate();