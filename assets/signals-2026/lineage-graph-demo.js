import {nodes,rootId,findNode,branches,visibleNodes,toggleBranch} from './lineage-graph-model.mjs';
const host=document.getElementById('lineage-graph-demo');
if(host){
  const $=selector=>host.querySelector(selector);
  const stage=$('.lg-stage'), viewport=$('.lg-viewport'), menu=$('.lg-menu'), preview=$('.lg-preview');
  const lang=()=>document.documentElement.lang.startsWith('zh')?0:1;
  const t=(cn,en)=>lang()===0?cn:en;
  let expanded=new Set([rootId]), active=null, tableSide='child', zoom=1, drag=null, dragged=false, hoverTimer;
  const recordUrl=id=>`assets/signals-2026/lineage-demo-record.html?node=${encodeURIComponent(id)}&lang=${lang()===0?'zh':'en'}`;
  const ns='http://www.w3.org/2000/svg';
  function svgElement(tag,attrs){const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value));return el;}
  function closeMenu(focus=false){menu.hidden=true;preview.hidden=true;clearTimeout(hoverTimer);if(focus&&active)$(`[data-node="${active}"]`)?.focus({preventScroll:true});active=null;}
  function positionPopup(popup,button){
    const area=viewport.getBoundingClientRect(), rect=button.getBoundingClientRect();
    popup.style.left=viewport.scrollLeft+Math.max(8,Math.min(rect.right-area.left+8,viewport.clientWidth-popup.offsetWidth-8))+'px';
    popup.style.top=viewport.scrollTop+Math.max(8,Math.min(rect.top-area.top,viewport.clientHeight-popup.offsetHeight-8))+'px';
  }
  function openMenu(id,button){
    closeMenu();active=id;const node=findNode(id);menu.replaceChildren();
    const title=document.createElement('div');title.className='lg-menu-title';title.textContent=id;menu.append(title);
    if(id!==rootId&&branches(id).length){
      const action=document.createElement('button');action.type='button';action.role='menuitem';action.textContent=expanded.has(id)?t('收起谱系','Collapse Lineage'):t('展开谱系','Expand Lineage');
      action.addEventListener('click',()=>{expanded=toggleBranch(expanded,id);closeMenu();render();$(`[data-node="${id}"]`)?.focus({preventScroll:true});});menu.append(action);
    }
    if(id!==rootId){const link=document.createElement('a');link.role='menuitem';link.href=recordUrl(id);link.target='_blank';link.rel='noopener';link.textContent=t('查看记录','View Entity');link.addEventListener('click',()=>closeMenu());menu.append(link);}
    if(id===rootId){const text=document.createElement('p');text.textContent=t('当前材料','Current material');menu.append(text);}
    menu.hidden=false;positionPopup(menu,button);menu.querySelector('[role="menuitem"]')?.focus({preventScroll:true});
  }
  function showPreview(node,button){
    if(!menu.hidden||drag)return;
    preview.replaceChildren();
    const title=document.createElement('strong');title.textContent=node.id;
    const name=document.createElement('span');name.textContent=node.name[lang()];
    const type=document.createElement('span');type.textContent=node.library[lang()]+' · '+(node.type==='batch'?t('批次','Batch/Lot'):t('材料','Asset'));
    preview.append(title,name,type);preview.hidden=false;positionPopup(preview,button);
  }
  function render(){
    const shown=visibleNodes(expanded), minX=Math.min(...shown.map(n=>n.x)),maxX=Math.max(...shown.map(n=>n.x));
    const naturalWidth=(maxX-minX)*225+230, width=Math.max(naturalWidth,(viewport.clientWidth-1)/zoom);
    const offset=(width-naturalWidth)/2+35;
    stage.style.width=width+'px';stage.style.height='425px';stage.style.transform=`scale(${zoom})`;
    $('.lg-canvas-space').style.width=width*zoom+'px';$('.lg-canvas-space').style.height=425*zoom+'px';
    stage.replaceChildren();
    const svg=svgElement('svg',{width,height:425,'aria-hidden':'true'});
    const defs=svgElement('defs',{}), marker=svgElement('marker',{id:'lg-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'});
    marker.append(svgElement('path',{d:'M 0 1 L 9 5 L 0 9',fill:'none',stroke:'#a5a9aa','stroke-width':1.4}));defs.append(marker);svg.append(defs);
    const point=n=>({x:offset+(n.x-minX)*225,y:30+n.y*95});
    shown.filter(n=>n.parent).forEach(n=>{
      const ancestor=findNode(n.parent), from=n.direction==='parent'?n:ancestor,to=n.direction==='parent'?ancestor:n;
      const a=point(from),b=point(to),x=a.x+156,y=a.y+32,m=(x+b.x)/2;
      svg.append(svgElement('path',{d:`M ${x} ${y} C ${m} ${y}, ${m} ${b.y+32}, ${b.x-4} ${b.y+32}`,fill:'none',stroke:'#c0c0c0','stroke-width':1.4,'marker-end':'url(#lg-arrow)'}));
    });stage.append(svg);
    shown.forEach(node=>{
      const pos=point(node),button=document.createElement('button');button.type='button';button.className='lg-node '+(node.id===rootId?'lg-current':node.type==='batch'?'lg-batch':'lg-asset');button.dataset.node=node.id;
      button.style.left=pos.x+'px';button.style.top=pos.y+'px';button.setAttribute('aria-label',`${node.id} · ${node.name[lang()]}`);button.setAttribute('aria-haspopup','menu');
      const library=document.createElement('span');library.textContent=node.library[lang()];
      const id=document.createElement('strong');id.textContent=node.id;
      const name=document.createElement('span');name.textContent=node.name[lang()];button.append(library,id,name);
      const count=branches(node.id).length;
      if(count){const badge=document.createElement('small');const shownCount=node.id===rootId?branches(node.id).filter(n=>n.direction==='child').length:count;badge.textContent=expanded.has(node.id)?`${shownCount}/${shownCount}`:String(shownCount);button.append(badge);if(node.id===rootId){const parents=branches(node.id).filter(n=>n.direction==='parent').length;const p=document.createElement('small');p.className='lg-count-parent';p.textContent=`${parents}/${parents}`;button.append(p);}}
      button.addEventListener('click',()=>{if(!dragged)openMenu(node.id,button);});
      button.addEventListener('contextmenu',event=>{event.preventDefault();openMenu(node.id,button);});
      button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')hoverTimer=setTimeout(()=>showPreview(node,button),350);});
      button.addEventListener('pointerleave',()=>{clearTimeout(hoverTimer);preview.hidden=true;});
      stage.append(button);
    });
    const rows=shown.filter(n=>n.direction===tableSide);
    const body=$('tbody');body.replaceChildren();
    rows.forEach(node=>{
      const row=document.createElement('tr');
      const id=document.createElement('td'), link=document.createElement('a');link.textContent=node.id;link.href=recordUrl(node.id);link.target='_blank';link.rel='noopener';id.append(link);row.append(id);
      [node.library[lang()],node.name[lang()],node.type==='batch'?t('批次','Batch'):t('材料','Asset'),findNode(node.parent)?.id||'—'].forEach(value=>{const cell=document.createElement('td');cell.textContent=value;row.append(cell);});body.append(row);
    });
    $('[data-lg-status]').textContent=t(`图谱显示 ${shown.length} 个节点 · ${tableSide==='parent'?'上游':'下游'}表格 ${rows.length} 条记录`,`${shown.length} visible nodes · ${rows.length} ${tableSide==='parent'?'parent':'child'} records`);
    $('[data-lg-zoom]').textContent=Math.round(zoom*100)+'%';
    $('[data-lg-minus]').disabled=zoom<=.1;$('[data-lg-plus]').disabled=zoom>=3;
    host.querySelectorAll('[data-lg-tab]').forEach(button=>{const selected=button.dataset.lgTab===tableSide;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;button.id='lg-tab-'+button.dataset.lgTab;if(selected)$('#lg-table-panel').setAttribute('aria-labelledby',button.id);});
  }
  host.querySelectorAll('[data-lg-tab]').forEach(button=>button.addEventListener('click',()=>{tableSide=button.dataset.lgTab;render();}));
  $('.lg-tabs').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();tableSide=event.key==='Home'?'parent':event.key==='End'?'child':tableSide==='parent'?'child':'parent';render();$(`[data-lg-tab="${tableSide}"]`).focus();
  });
  viewport.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();closeMenu(true);}});
  function changeZoom(delta){closeMenu();zoom=Math.max(.1,Math.min(3,Math.round((zoom+delta)*10)/10));render();}
  $('[data-lg-minus]').addEventListener('click',()=>changeZoom(-.1));$('[data-lg-plus]').addEventListener('click',()=>changeZoom(.1));
  $('[data-lg-reset]').addEventListener('click',()=>{closeMenu();expanded=new Set([rootId]);zoom=1;tableSide='child';render();viewport.scrollTo(0,0);});
  menu.addEventListener('keydown',event=>{
    const items=[...menu.querySelectorAll('[role="menuitem"]')];const index=items.indexOf(document.activeElement);
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeMenu(true);}
    if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)&&items.length){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?items.length-1:(index+(event.key==='ArrowDown'?1:items.length-1))%items.length;items[next].focus();}
    if(event.key==='Tab')setTimeout(()=>closeMenu(),0);
  });
  document.addEventListener('pointerdown',event=>{if(!menu.contains(event.target)&&!event.target.closest('[data-node]'))closeMenu();});
  viewport.addEventListener('scroll',()=>{preview.hidden=true;const button=active&&$(`[data-node="${active}"]`);if(button&&!menu.hidden)positionPopup(menu,button);},{passive:true});
  viewport.addEventListener('pointerdown',event=>{
    dragged=false;if(event.pointerType==='touch'||event.target.closest('button,a,.lg-menu'))return;
    drag={x:event.clientX,y:event.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');closeMenu();
  });
  viewport.addEventListener('pointermove',event=>{if(!drag)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>5)dragged=true;viewport.scrollTo(drag.left-dx,drag.top-dy);});
  function stopDrag(){drag=null;viewport.classList.remove('is-dragging');}
  viewport.addEventListener('pointerup',stopDrag);viewport.addEventListener('pointercancel',stopDrag);
  let observedWidth=0;
  new ResizeObserver(()=>{const width=viewport.clientWidth;if(width===observedWidth)return;observedWidth=width;closeMenu();render();}).observe(viewport);
  new MutationObserver(()=>{closeMenu();render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  host.hidden=false;render();
}
