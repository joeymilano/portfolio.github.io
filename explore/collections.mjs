import {collections} from './collections-data.mjs?v=links-v2';
export function collectionShelf(kind,language){
 const zh=language==='zh',items=collections[kind],section=document.createElement('section');section.className='collection '+kind;
 const hint=document.createElement('p');hint.className='collection-hint';hint.textContent=zh?'点击挑选 · 左右键切换':'Choose a cover · use arrow keys';
 const viewport=document.createElement('div');viewport.className='collection-viewport';
 const shelf=document.createElement('div');shelf.className='collection-shelf';shelf.setAttribute('role','group');shelf.setAttribute('aria-label',zh?(kind==='books'?'书架':'唱片架'):(kind==='books'?'Bookshelf':'Record collection'));
 const detail=document.createElement('div');detail.className='collection-detail';detail.setAttribute('aria-live','polite');
 const title=document.createElement('a');title.target='_blank';title.rel='noopener noreferrer';const author=document.createElement('p');detail.append(title,author);
 let active=kind==='books'?2:7;
 const buttons=items.map((item,i)=>{const b=document.createElement('button');b.type='button';b.className='collection-item';b.style.setProperty('--spine',item.color);b.style.setProperty('--ink',item.ink);b.setAttribute('aria-label',`${item.title} — ${item.author}`);
 const spine=document.createElement('span');spine.className='collection-spine';spine.textContent=item.short;
 const cover=document.createElement('img');cover.src=item.cover;cover.alt=item.title;cover.loading='lazy';cover.decoding='async';cover.addEventListener('error',()=>{cover.hidden=true;b.classList.add('cover-unavailable')});b.append(spine,cover);
 b.addEventListener('click',()=>choose(i));b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=Math.min(items.length-1,active+1);if(e.key==='ArrowLeft')next=Math.max(0,active-1);if(e.key==='Home')next=0;if(e.key==='End')next=items.length-1;if(next!==undefined){e.preventDefault();choose(next);buttons[next].focus()}});shelf.append(b);return b});
 function choose(i,scroll=true){active=i;buttons.forEach((b,n)=>{b.setAttribute('aria-pressed',String(n===i));b.tabIndex=n===i?0:-1;b.style.setProperty('--distance',n-i);if(kind==='albums')b.style.zIndex=String(20-Math.abs(n-i))});title.textContent=items[i].title+' ↗';title.href=items[i].href;title.setAttribute('aria-label',(zh?'打开：':'Open: ')+items[i].title);author.textContent=items[i].author;if(scroll)buttons[i].scrollIntoView({block:'nearest',inline:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 viewport.append(shelf);section.append(hint,viewport,detail);choose(active,false);return section;
}
