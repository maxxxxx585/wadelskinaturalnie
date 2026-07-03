// ═══ MICRO-INTERACTIONS INIT ═══

// Add tilt-card class via JS (avoids touching base64 image HTML directly)
document.querySelectorAll('.m-card, .gwar-price-block').forEach(el => el.classList.add('tilt-card'));

// 3D tilt effect on mouse move
function attachTilt(el, intensity = 8){
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotX = ((y / r.height) - 0.5) * -intensity;
    const rotY = ((x / r.width) - 0.5) * intensity;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
}
document.querySelectorAll('.tilt-card').forEach(el => attachTilt(el, el.classList.contains('gwar-price-block') ? 4 : 8));

// Hero cursor glow follows mouse
const heroEl = document.getElementById('hero');
const glowEl = document.getElementById('hero-glow');
if(heroEl && glowEl){
  heroEl.addEventListener('mousemove', (e) => {
    const r = heroEl.getBoundingClientRect();
    glowEl.style.left = (e.clientX - r.left) + 'px';
    glowEl.style.top = (e.clientY - r.top) + 'px';
  });
}

// Floating method-symbol particles — icons referencing the 5 naturopathy methods, drifting across sections
(function(){
  const containers = [
    document.getElementById('leaf-container'),
    ...document.querySelectorAll('.leaf-zone')
  ].filter(Boolean);
  if(!containers.length) return;

  const shapes = [
    (color) => `
      <circle cx="12" cy="13.5" r="10.5" stroke="${color}" stroke-width="1" fill="none" opacity="0.55"/>
      <path d="M12 3A10.5 10.5 0 0 1 12 24A5.25 5.25 0 0 1 12 13.5A5.25 5.25 0 0 0 12 3Z" fill="${color}" opacity="0.55"/>
      <circle cx="12" cy="8.25" r="1.5" fill="${color}" opacity="0.55"/>
      <circle cx="12" cy="18.75" r="1.5" fill="${color}" opacity="0.3"/>`,

    (color) => `
      <path d="M12 27V8" stroke="${color}" stroke-width="1" opacity="0.55" stroke-linecap="round"/>
      <ellipse cx="8.2" cy="20" rx="3.6" ry="1.9" fill="${color}" opacity="0.55" transform="rotate(-30 8.2 20)"/>
      <ellipse cx="15.8" cy="17" rx="3.6" ry="1.9" fill="${color}" opacity="0.5" transform="rotate(30 15.8 17)"/>
      <ellipse cx="8.2" cy="14" rx="3.2" ry="1.7" fill="${color}" opacity="0.5" transform="rotate(-30 8.2 14)"/>
      <ellipse cx="15.8" cy="11" rx="3.1" ry="1.6" fill="${color}" opacity="0.45" transform="rotate(30 15.8 11)"/>
      <ellipse cx="12" cy="6.5" rx="2.6" ry="3.6" fill="${color}" opacity="0.55"/>`,

    (color) => `
      <path d="M12 27V19" stroke="${color}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
      <g opacity="0.6">
        <ellipse cx="12" cy="8" rx="2.8" ry="4.4" fill="${color}"/>
        <ellipse cx="12" cy="8" rx="2.8" ry="4.4" fill="${color}" transform="rotate(72 12 12)"/>
        <ellipse cx="12" cy="8" rx="2.8" ry="4.4" fill="${color}" transform="rotate(144 12 12)"/>
        <ellipse cx="12" cy="8" rx="2.8" ry="4.4" fill="${color}" transform="rotate(216 12 12)"/>
        <ellipse cx="12" cy="8" rx="2.8" ry="4.4" fill="${color}" transform="rotate(288 12 12)"/>
      </g>
      <circle cx="12" cy="12" r="2" fill="${color}" opacity="0.85"/>`,

    (color) => `
      <circle cx="12" cy="13.5" r="9" stroke="${color}" stroke-width="1.1" fill="none" opacity="0.5"/>
      <path d="M12 4.5A9 9 0 0 1 12 22.5A4.5 4.5 0 0 1 12 13.5A4.5 4.5 0 0 0 12 4.5Z" fill="${color}" opacity="0.5"/>`,

    (color) => `
      <path d="M12 27V7" stroke="${color}" stroke-width="1" opacity="0.55" stroke-linecap="round"/>
      <path d="M12 19.5C12 19.5 6.8 18.3 6.2 14.2C8.5 14.7 10.7 16.4 12 19.5Z" fill="${color}" opacity="0.5"/>
      <path d="M12 19.5C12 19.5 17.2 18.3 17.8 14.2C15.5 14.7 13.3 16.4 12 19.5Z" fill="${color}" opacity="0.45"/>
      <path d="M12 13C12 13 7.5 11.8 6.9 8.4C9 8.85 11 10.3 12 13Z" fill="${color}" opacity="0.5"/>
      <path d="M12 13C12 13 16.5 11.8 17.1 8.4C15 8.85 13 10.3 12 13Z" fill="${color}" opacity="0.45"/>
      <circle cx="12" cy="6" r="1.7" fill="${color}" opacity="0.55"/>`,

    (color) => `
      <path d="M12 27V18.5" stroke="${color}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
      <g opacity="0.58">
        <circle cx="12" cy="8.6" r="3.6" fill="${color}"/>
        <circle cx="17.2" cy="11.6" r="3.6" fill="${color}"/>
        <circle cx="15.2" cy="17.2" r="3.6" fill="${color}"/>
        <circle cx="8.8" cy="17.2" r="3.6" fill="${color}"/>
        <circle cx="6.8" cy="11.6" r="3.6" fill="${color}"/>
      </g>
      <circle cx="12" cy="13.5" r="2.4" fill="${color}" opacity="0.9"/>`,

    (color) => `
      <path d="M12 27V20" stroke="${color}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
      <path d="M12 20C12 20 11 11 12 6C13 11 12 20 12 20Z" fill="${color}" opacity="0.58"/>
      <path d="M12 20C12 20 5.5 16 4.5 10.5C9 12 12 16 12 20Z" fill="${color}" opacity="0.5"/>
      <path d="M12 20C12 20 18.5 16 19.5 10.5C15 12 12 16 12 20Z" fill="${color}" opacity="0.5"/>`,

    (color) => `
      <path d="M12 27V12" stroke="${color}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
      <ellipse cx="8" cy="18" rx="2.6" ry="1.4" fill="${color}" opacity="0.5" transform="rotate(-25 8 18)"/>
      <ellipse cx="16" cy="15.5" rx="2.6" ry="1.4" fill="${color}" opacity="0.48" transform="rotate(25 16 15.5)"/>
      <ellipse cx="12" cy="8" rx="3" ry="4.4" fill="${color}" opacity="0.6"/>
      <circle cx="12" cy="8" r="1.3" fill="${color}" opacity="0.85"/>`
  ];

  const colors = ['#A8B86A','#7BAE6F','#C4D48A','#5F9468'];
  const sways = ['leafSwayA 3.2s ease-in-out infinite','leafSwayB 3.8s ease-in-out infinite'];

  function spawnLeaf(container){
    const leaf = document.createElement('div');
    const inner = document.createElement('div');
    leaf.className = 'leaf-particle';
    inner.style.animation = sways[Math.floor(Math.random()*sways.length)];

    const size = 32 + Math.random()*26;
    const color = colors[Math.floor(Math.random()*colors.length)];
    const shape = shapes[Math.floor(Math.random()*shapes.length)];
    inner.innerHTML = `<svg width="${size}" height="${size*1.17}" viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">${shape(color)}</svg>`;

    leaf.appendChild(inner);
    leaf.style.left = (Math.random()*100) + '%';
    leaf.style.bottom = '-40px';
    const duration = 11 + Math.random()*9;
    const anim = Math.random() > 0.5 ? 'leafFloatA' : 'leafFloatB';
    leaf.style.animation = `${anim} ${duration}s ease-in forwards`;
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration*1000);
  }

  function spawnRandom(){
    const container = containers[Math.floor(Math.random()*containers.length)];
    const rect = container.getBoundingClientRect();
    if(rect.bottom > -200 && rect.top < window.innerHeight + 200){
      spawnLeaf(container);
    }
  }

  const isSmallScreen = innerWidth < 768;
  const spawnsPerTick = isSmallScreen ? 1 : 3;
  const tickMs = isSmallScreen ? 1400 : 900;
  const initialBurst = isSmallScreen ? 6 : 14;

  let leafInterval = null;
  function startLeaves(){
    if(leafInterval) return;
    leafInterval = setInterval(() => {
      for(let i=0;i<spawnsPerTick;i++) spawnRandom();
    }, tickMs);
  }
  function stopLeaves(){
    if(!leafInterval) return;
    clearInterval(leafInterval);
    leafInterval = null;
  }

  setTimeout(() => {
    const hero = document.getElementById('leaf-container');
    if(hero){
      for(let i=0;i<initialBurst;i++) setTimeout(() => spawnLeaf(hero), i*380);
    }
    startLeaves();
  }, 1500);

  document.addEventListener('visibilitychange', () => {
    if(document.hidden) stopLeaves();
    else startLeaves();
  });
})();


// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = pct + '%';
});

// Button ripple effect on click
document.querySelectorAll('.btn-gold, .btn-dark').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('rippling');
    setTimeout(() => btn.classList.remove('rippling'), 500);
  });
});

// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('dark',scrollY>60));
if(scrollY>60)nav.classList.add('dark');

// Mobile menu
const ham=document.getElementById('ham'),mob=document.getElementById('mob');
ham.addEventListener('click',()=>{
  const isOpen = mob.classList.toggle('open');
  ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
function cm(){mob.classList.remove('open')}

// Hero canvas — floating particles (only runs on pages that actually have the canvas hero, i.e. the homepage)
(function(){
  const c=document.getElementById('hero-canvas');
  if(!c) return;
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  const isSmall = innerWidth < 768;
  const POINT_COUNT = isSmall ? 32 : 90;
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<POINT_COUNT;i++)pts.push({
    x:Math.random()*W,y:Math.random()*H,
    vx:(Math.random()-0.5)*0.28,vy:(Math.random()-0.5)*0.28,
    r:Math.random()*1.4+0.3,a:Math.random()
  });
  let running=true;
  function draw(){
    if(!running)return;
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      const p=pts[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(168,184,106,${p.a*0.35})`;ctx.fill();
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=`rgba(168,184,106,${(1-d/130)*0.07})`;ctx.lineWidth=0.5;ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(() => requestAnimationFrame(draw));

  const heroSection=document.getElementById('hero');
  if(heroSection && 'IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const wasRunning=running;
        running=entry.isIntersecting;
        if(running && !wasRunning) requestAnimationFrame(draw);
      });
    },{threshold:0}).observe(heroSection);
  }
})();

// Hero entrance animation (homepage only — elements are absent on subpages, so guard each)
['hp','hh','hs','hb'].forEach((id,i)=>{
  const el=document.getElementById(id);
  if(el) setTimeout(()=>el.classList.add('in'), i===0?0:(i===1?50:(i===2?120:200)));
});

// Reveal on scroll
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('in');
}),{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.r').forEach(el=>obs.observe(el));

// FAQ accordion
document.querySelectorAll('[data-faq]').forEach(item=>{
  const btn=item.querySelector('.faq-q');
  const wrap=item.querySelector('.faq-a-wrap');
  btn.addEventListener('click',()=>{
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('[data-faq]').forEach(other=>{
      other.classList.remove('open');
      other.querySelector('.faq-a-wrap').style.maxHeight=null;
    });
    if(!isOpen){
      item.classList.add('open');
      wrap.style.maxHeight=wrap.scrollHeight+'px';
    }
  });
});
