(function(){
var d=document,b=d.body;
/* menu */
var bu=d.querySelector('.burger');
if(bu){bu.addEventListener('click',function(){var o=b.classList.toggle('menu-open');bu.setAttribute('aria-expanded',o)});
d.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('menu-open');bu.setAttribute('aria-expanded','false')})});}
/* cookies */
d.querySelectorAll('[data-ck]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('rc_ck',x.getAttribute('data-ck'))}catch(e){}d.getElementById('ck').hidden=true})});
/* karuzela programow */
var tr=d.getElementById('track');
if(tr){
  var cards=tr.children,lz=d.getElementById('licz');
  var step=function(){return cards[0].getBoundingClientRect().width+18};
  d.querySelectorAll('.arr button').forEach(function(btn){btn.addEventListener('click',function(){tr.scrollBy({left:step()*+btn.getAttribute('data-dir'),behavior:'smooth'})})});
  var tick=false;tr.addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;var i=Math.round(tr.scrollLeft/step())+1;if(tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4)i=cards.length;lz.textContent=Math.min(i,cards.length)+' / '+cards.length})},{passive:true});
  var down=false,sx=0,sl=0,moved=false;
  tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=tr.scrollLeft});
  window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tr.classList.add('drag')}tr.scrollLeft=sl-dx});
  window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){tr.classList.remove('drag');var i=Math.round(tr.scrollLeft/step());tr.scrollTo({left:i*step(),behavior:'smooth'})}});
  tr.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){tr.scrollBy({left:step(),behavior:'smooth'});e.preventDefault()}if(e.key==='ArrowLeft'){tr.scrollBy({left:-step(),behavior:'smooth'});e.preventDefault()}});
}
/* mapa przy przewinieciu */
var m=d.getElementById('map');
if(m&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();var f=d.createElement('iframe');f.src=m.getAttribute('data-src');f.loading='lazy';f.title='Mapa dojazdu: ul. Żurawia 32/34, Warszawa';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}},{rootMargin:'300px'});io.observe(m)}
/* formularz pokazowy */
var fm=d.getElementById('form');
if(fm){fm.addEventListener('submit',function(e){e.preventDefault();d.getElementById('fmsg').textContent='To wersja podglądowa: formularz nie wysyła wiadomości. W docelowej stronie trafi ona na biuro@red-carpet.pl.'})}
/* filtry raportow */
var rep=d.getElementById('rep');
if(rep){
  var rows=[].slice.call(rep.children),typ='',lim=25,cnt=d.getElementById('cnt'),more=d.getElementById('more'),empty=d.getElementById('empty'),rok=d.getElementById('rok'),q=d.getElementById('szukaj');
  var run=function(){var y=rok.value,s=q.value.trim().toLowerCase(),n=0,shown=0;
    rows.forEach(function(r){var ok=(!typ||r.dataset.t===typ)&&(!y||r.dataset.y===y)&&(!s||r.dataset.s.indexOf(s)>-1);if(ok){n++;if(n<=lim){r.hidden=false;shown++}else r.hidden=true}else r.hidden=true});
    cnt.textContent='Wyświetlono '+shown+' z '+n+(n===1?' raportu':' raportów');more.hidden=shown>=n;empty.hidden=n>0};
  d.querySelectorAll('.seg button').forEach(function(x){x.addEventListener('click',function(){d.querySelectorAll('.seg button').forEach(function(z){z.setAttribute('aria-pressed','false')});x.setAttribute('aria-pressed','true');typ=x.dataset.typ;lim=25;run()})});
  rok.addEventListener('change',function(){lim=25;run()});
  var t;q.addEventListener('input',function(){clearTimeout(t);t=setTimeout(function(){lim=25;run()},120)});
  more.addEventListener('click',function(){lim+=25;run()});
  /* podswietlenie sekcji w podmenu */
  var links=[].slice.call(d.querySelectorAll('.sub a'));
  if('IntersectionObserver' in window){var so=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
  links.forEach(function(l){var s=d.querySelector(l.getAttribute('href'));if(s)so.observe(s)})}
}
})();
