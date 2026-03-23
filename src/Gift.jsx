import { useEffect, useState, useRef } from "react";

export default function Gift({ data }) {
  const [text, setText] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    typeWriter(data.letter);

    const music = new Audio("/music.mp3");
    music.play();

    const cleanupFireworks = startFireworks();

    return () => {
      clearInterval(intervalRef.current);
      cleanupFireworks(); // 🧹 clean fireworks
    };
  }, [data]);

  function typeWriter(str) {
    let i = 0;
    setText(""); // ✅ reset

    intervalRef.current = setInterval(() => {
      if (i < str.length) {
        setText(prev => prev + str.charAt(i)); // ✅ safe
        i++;
      } else {
        clearInterval(intervalRef.current);
      }
    }, 30);
  }

  return (
    <div className="app">
      <h2>{data.message}</h2>

      <img src="/sis1.jpg" className="slide" />

      <p style={{ whiteSpace: "pre-line" }}>{text}</p>

      <button onClick={() => new Audio("/voice.mp3").play()}>
        🎤 Play Voice
      </button>

      <br /><br />

      <video controls width="100%">
        <source src="/memory.mp4" />
      </video><br></br><br></br>
      
      <div>Made with ❤️ by Evoltep</div>
    </div>
  );
}

/* 🎆 CLEAN FIREWORKS SYSTEM */
function startFireworks() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let interval;

  function spawnParticles() {
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 100
      });
    }
  }

  interval = setInterval(spawnParticles, 800);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.x += p.dx;
      p.y += p.dy;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();

      if (p.life <= 0) particles.splice(index, 1);
    });

    requestAnimationFrame(animate);
  }

  animate();

  // ✅ CLEANUP FUNCTION (VERY IMPORTANT)
  return () => {
    clearInterval(interval);
    canvas.remove();
  };
}