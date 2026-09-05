const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// Header, scroll progress, mobile menu
window.addEventListener("scroll",()=>{
  $("#header").classList.toggle("scrolled",scrollY>20);
  const h=document.documentElement.scrollHeight-innerHeight;
  $("#progress").style.width=(scrollY/h*100)+"%";
});
$("#mobileToggle").addEventListener("click",()=>$("#navLinks").classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>$("#navLinks").classList.remove("open")));

// Active nav section
const sections=[...$$("section[id]")];
const navItems=[...$$(".nav-links a")];
const navObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navItems.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>navObs.observe(s));

// Theme
$("#theme").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  $("#theme").innerHTML=document.body.classList.contains("dark")
    ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// Typing
const words=["data","machine learning","dashboards","real-world problems"];
let wi=0,ci=0,del=false;
function type(){
  const w=words[wi];
  $("#typing").textContent=w.slice(0,ci);
  if(!del && ci<w.length){ci++;setTimeout(type,80)}
  else if(!del){del=true;setTimeout(type,900)}
  else if(ci>0){ci--;setTimeout(type,35)}
  else{del=false;wi=(wi+1)%words.length;setTimeout(type,250)}
}
type();

// Project filters
$$(".tab").forEach(tab=>tab.addEventListener("click",()=>{
  $$(".tab").forEach(x=>x.classList.remove("active"));tab.classList.add("active");
  const f=tab.dataset.filter;
  $$(".project-card").forEach(card=>{
    card.classList.toggle("hidden",f!=="all" && card.dataset.category!==f);
  });
}));

// Reveal on scroll
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.1});
$$(".reveal").forEach(el=>revealObs.observe(el));

$("#year").textContent=new Date().getFullYear();

// Subtle 3D tilt on desktop
const tilt=document.querySelector(".tilt");
if(tilt && matchMedia("(pointer:fine)").matches){
  tilt.addEventListener("mousemove",e=>{
    const r=tilt.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    tilt.style.transform=`rotateY(${x*8}deg) rotateX(${y*-8}deg) rotate(2deg)`;
  });
  tilt.addEventListener("mouseleave",()=>tilt.style.transform="rotate(2deg)");
}
