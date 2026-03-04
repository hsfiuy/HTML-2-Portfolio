// Navigation toggle
document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav');
  const toggle=document.getElementById('navToggle');
  if(toggle && nav){
    toggle.addEventListener('click',()=>nav.classList.toggle('open'))
  }

  /* Slideshow */
  const slides=document.querySelectorAll('.slideshow .slide');
  const dotsWrap=document.getElementById('dots');
  let index=0, slideInterval;
  if(slides.length){
    slides.forEach((s,i)=>{
      if(dotsWrap){
        const btn=document.createElement('button');
        btn.addEventListener('click',()=>goTo(i));
        if(i===0)btn.classList.add('active');
        dotsWrap.appendChild(btn);
      }
    });
    function show(i){
      slides.forEach(s=>s.classList.remove('active'));
      slides[i].classList.add('active');
      if(dotsWrap){
        const dots=dotsWrap.querySelectorAll('button');dots.forEach(d=>d.classList.remove('active'));
        if(dots[i]) dots[i].classList.add('active');
      }
    }
    function next(){index=(index+1)%slides.length;show(index)}
    function prev(){index=(index-1+slides.length)%slides.length;show(index)}
    function goTo(i){index=i;show(index);reset();}
    // Attach explicit handlers to prev/next buttons
    const prevBtn = document.querySelector('.slide-btn.prev');
    const nextBtn = document.querySelector('.slide-btn.next');
    if(prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); prev(); reset(); });
    if(nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); next(); reset(); });
    function reset(){clearInterval(slideInterval);slideInterval=setInterval(next,5000)}
    reset();
  }

  /* Gallery/modal: listen for any image with `data-large` and open shared modal */
  const modal=document.getElementById('modal');
  const modalImg=document.getElementById('modalImg');
  const modalClose=document.getElementById('modalClose');
  const modalNext=document.getElementById('modalNext');
  const modalPrev=document.getElementById('modalPrev');
  let items = Array.from(document.querySelectorAll('img[data-large]'));
  let current = -1;
  items.forEach((img, i) => img.addEventListener('click', () => open(i)));

  function open(i){
    current = i;
    if(!modal) return;
    modal.classList.add('open');
    modalImg.src = items[i].dataset.large || items[i].src;
  }
  function close(){ if(!modal) return; modal.classList.remove('open'); modalImg.src=''; }
  function nextItem(){ if(items.length===0) return; current = (current+1)%items.length; modalImg.src = items[current].dataset.large || items[current].src }
  function prevItem(){ if(items.length===0) return; current = (current-1+items.length)%items.length; modalImg.src = items[current].dataset.large || items[current].src }

  if(modalClose) modalClose.addEventListener('click', close);
  if(modalNext) modalNext.addEventListener('click', nextItem);
  if(modalPrev) modalPrev.addEventListener('click', prevItem);
  if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if(!modal || !modal.classList.contains('open')) return; if(e.key==='ArrowRight') nextItem(); if(e.key==='ArrowLeft') prevItem(); if(e.key==='Escape') close(); });
});
