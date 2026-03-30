import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    // mouse in document-space so repel works while scrolling
    const mouse = { x: -9999, y: -9999 };
    let particles = [];

    const REPEL_RADIUS = 110;
    const REPEL_STRENGTH = 7;
    const SPACING = 42;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      // Cover the full document height so dots exist on every section
      const docHeight = Math.max(
        window.innerHeight * 4,
        document.documentElement.scrollHeight
      );
      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(docHeight / SPACING) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            hx: i * SPACING,
            hy: j * SPACING,
            x: i * SPACING,
            y: j * SPACING,
            vx: 0,
            vy: 0,
            r: Math.random() * 1.8 + 1.2,
          });
        }
      }
    };

    // Store in document-space Y (clientY + scrollY)
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);
    resize();

    const tick = () => {
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Physics in document-space
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (p.hx - p.x) * 0.04;
        p.vy += (p.hy - p.y) * 0.04;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        // Convert to viewport-space for rendering
        const renderY = p.y - scroll;
        if (renderY < -5 || renderY > canvas.height + 5) continue;

        const distFromHome = Math.sqrt((p.x - p.hx) ** 2 + (p.y - p.hy) ** 2);
        const opacity = 0.38 + Math.min(distFromHome / 30, 1) * 0.35;

        ctx.beginPath();
        ctx.arc(p.x, renderY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;
