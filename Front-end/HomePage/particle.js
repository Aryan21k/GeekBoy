const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#26478b', '#8a275b', '#1c4068', '#26478b', '#0073b7'];
const particles = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.xSpeed = Math.random() * 1 - 0.5;
        this.ySpeed = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random();
    }

    update() {
        if (this.x < 0 || this.x > canvas.width) {
            this.xSpeed *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.ySpeed *= -1;
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.opacity += Math.random() * 0.02 - 0.01;
        if (this.opacity < 0) this.opacity = 0;
        if (this.opacity > 1) this.opacity = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const distance = Math.sqrt(
                (particles[a].x - particles[b].x) ** 2 +
                (particles[a].y - particles[b].y) ** 2
            );
            if (distance < 100) {
                ctx.globalAlpha = (1 - distance / 100) * 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.strokeStyle = particles[a].color;
                ctx.lineWidth = 1.95; // Adjust line width here
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0; // Clear particles array on resize
    createParticles(); // Recreate particles on resize
});

createParticles();
animate();
