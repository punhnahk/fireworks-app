import React, { useEffect, useRef } from "react";

const FireworksComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    // Âm thanh pháo hoa
    const explosionSound = new Audio("/sounds/explosion.mp3");

    class Firework {
      constructor(targetX, targetY, color) {
        this.x = canvas.width / 2; // Chính giữa màn hình ngang
        this.y = canvas.height; // Dưới màn hình
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.speed = 5;
        this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.radius = 4;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Kiểm tra khoảng cách đến mục tiêu
        if (
          Math.sqrt(
            (this.targetX - this.x) ** 2 + (this.targetY - this.y) ** 2
          ) < this.speed
        ) {
          explosionSound.currentTime = 0; // Phát âm thanh nổ
          explosionSound.play();
          createParticles(this.x, this.y, this.color);
          return true;
        }
        return false;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = Math.random() * 4 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 3 + 1;
        this.alpha = 1;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
        return this.alpha > 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    function createFirework() {
      const targetX =
        canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.5; // Nổ gần giữa, lệch sang hai bên
      const targetY = (Math.random() * canvas.height) / 2; // Nổ trên bầu trời
      const color = `${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }`;
      fireworks.push(new Firework(targetX, targetY, color));
    }

    function createParticles(x, y, color) {
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((firework, index) => {
        firework.draw();
        if (firework.update()) {
          fireworks.splice(index, 1);
        }
      });

      particles.forEach((particle, index) => {
        particle.draw();
        if (!particle.update()) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    function startFireworks() {
      setInterval(createFirework, 600);
      animate();
    }

    startFireworks();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        zIndex: -1,
      }}
    />
  );
};

export default FireworksComponent;
