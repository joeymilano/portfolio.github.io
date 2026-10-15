/* Standalone portfolio demo informed by the local Lineage components.
   Example data only; no product APIs, accounts or persistence. */
(() => {
  const host = document.getElementById('properties-demo');
  if (!host) return;
  const dialog = document.getElementById('properties-demo-dialog');
  const zh = () => document.documentElement.lang.startsWith('zh');
  const t = (cn, en) => zh() ? cn : en;
  const groups = { common: ['通用属性', 'Common'], cells: ['细胞系', 'Cell Lines'], complexes: ['复合物', 'Complexes'] };
  const definitions = {
    common: [['Material ID','材料编号'],['Material Type','材料类型'],['Material Name','材料名称'],['Asset/Batch','材料／批次'],['Lineage','谱系关系'],['Submission Date','提交日期'],['Submitter','提交人'],['Modified','修改日期'],['Modifier','修改人']],
    cells: [['CellLine Image','细胞系图片'],['Organism','物种'],['Cell Type','细胞类型'],['Mutation','突变'],['Disease','疾病'],['Tissue','组织'],['Variant','变体'],['Gender','性别'],['Biosafety Level','生物安全等级'],['Parent','亲代'],['Passage','传代'],['Source','来源'],['Passage #','传代次数'],['Cell Count','细胞数量'],['Cryopreservation Medium','冻存培养基'],['Growth Medium','生长培养基'],['Growth Properties','生长特性'],['Growth Temperature (˚C)','生长温度（˚C）'],['Age','年龄'],['Comments','备注'],['Originating Experiment','来源实验'],['Children','子代']],
    complexes: [['Protein Sequence','蛋白质序列'],['Heavy Chain 1','重链 1'],['Heavy Chain 2','重链 2'],['Light Chain 1','轻链 1'],['Light Chain 2','轻链 2'],['Internal Reference Field','内部引用'],['Total Molecular Weight','总分子量'],['Originating Experiment','来源实验']]
  };
  const fields = Object.entries(definitions).flatMap(([group, list]) => list.map(([en, cn], i) => ({id:group+'-'+i, group, en, cn, mandatory:group==='common'&&i===0})));
  const field = id => fields.find(x => x.id === id);
  const label = item => zh() ? item.cn : item.en;
  let saved = fields.filter(x => x.group==='common').map(x=>x.id);
  let draft = [], filter='all', side=null, checked=new Set(), previousOverflow='';
  const query = selector => dialog.querySelector(selector);
  const openButton = host.querySelector('[data-demo-open]');
  const filterSelect = query('[data-demo-filter]');
  const visible = item => filter === 'all' || item.group === filter;
  const available = () => fields.filter(item => visible(item) && !draft.includes(item.id));
  const selected = () => draft.map(field).filter(visible);
  const resetChecks = () => {checked.clear(); side=null;};
  function renderTable(announce=false, added=[]) {
    [...filterSelect.options].forEach(option => {option.textContent=option.value==='all'?t('全部','All'):t(...groups[option.value]);});
    const table = host.querySelector('table');
    const head = document.createElement('tr');
    saved.forEach(id => {const th=document.createElement('th'); th.scope='col'; th.textContent=label(field(id)); if(added.includes(id))th.className='pd-added'; head.append(th);});
    table.tHead.replaceChildren(head);
    const rows = [1,2,3].map(n => {
      const row = document.createElement('tr');
      saved.forEach(id => {
        const cell = document.createElement('td');
        const value = {'common-0':`DEMO-00${n}`,'common-1':t('细胞系','Cell Lines'),'common-2':t(`示例材料 ${n}`,`Example material ${n}`),'common-3':t('材料','Asset'),'common-4':t('子代','Child')};
        cell.textContent=value[id]||'—'; row.append(cell);
      });
      return row;
    });
    table.tBodies[0].replaceChildren(...rows);
    host.querySelector('[data-demo-status]').textContent=announce ? t(`已更新 · 表格显示 ${saved.length} 个属性`,`Updated · ${saved.length} properties shown`) : t(`表格显示 ${saved.length} 个属性`,`${saved.length} properties shown`);
    if (announce && added.length) {const viewport=host.querySelector('.pd-table-scroll'); requestAnimationFrame(()=>viewport.scrollTo({left:viewport.scrollWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));}
    if (announce) {host.classList.remove('properties-demo-saved'); void host.offsetWidth; host.classList.add('properties-demo-saved');}
  }
  function renderList(which, items) {
    const list=query(`[data-demo-list="${which}"]`);
    const scroll=list.scrollTop;
    const nodes=[];
    let lastGroup;
    items.forEach(item => {
      if(item.group!==lastGroup) {
        const heading=document.createElement('div'); heading.className='pd-group'; heading.textContent=t(...groups[item.group]); nodes.push(heading); lastGroup=item.group;
      }
      const row=document.createElement('label'); row.className='pd-property';
      const input=document.createElement('input'); input.type='checkbox'; input.value=item.id; input.disabled=item.mandatory; input.checked=side===which&&checked.has(item.id);
      input.addEventListener('change',()=>{
        if(side!==which){checked.clear();side=which;}
        input.checked?checked.add(item.id):checked.delete(item.id);
        const focusId=item.id; renderLists();
        query(`[data-demo-list="${which}"] input[value="${focusId}"]`).focus({preventScroll:true});
      });
      const text=document.createElement('span'); text.textContent=label(item); row.append(input,text); nodes.push(row);
    });
    if(!items.length){const empty=document.createElement('p');empty.className='pd-empty';empty.textContent=t('暂无属性','No properties');nodes.push(empty);}
    list.replaceChildren(...nodes);list.scrollTop=scroll;
  }
  function renderLists() {
    renderList('available',available()); renderList('selected',selected());
    const indices=[...checked].map(id=>draft.indexOf(id));
    const hasSelected=side==='selected'&&checked.size>0;
    const states={add:side==='available'&&checked.size>0,addAll:available().length>0,remove:hasSelected,removeAll:selected().some(x=>!x.mandatory),up:filter==='all'&&hasSelected&&indices.every(i=>i>1),down:filter==='all'&&hasSelected&&indices.every(i=>i<draft.length-1)};
    Object.entries(states).forEach(([action,enabled])=>{query(`[data-demo-action="${action}"]`).disabled=!enabled;});
    query('[data-demo-order]').hidden=filter!=='all';
  }
  filterSelect.addEventListener('change',()=>{filter=filterSelect.value;resetChecks();renderLists();});
  dialog.querySelectorAll('[data-demo-action]').forEach(button=>button.addEventListener('click',()=>{
    const action=button.dataset.demoAction;
    if(action==='add') draft.push(...fields.filter(x=>checked.has(x.id)).map(x=>x.id));
    if(action==='addAll') draft.push(...available().map(x=>x.id));
    if(action==='remove') draft=draft.filter(id=>!checked.has(id));
    if(action==='removeAll') {const ids=new Set(selected().filter(x=>!x.mandatory).map(x=>x.id));draft=draft.filter(id=>!ids.has(id));}
    if(action==='up') for(let i=1;i<draft.length;i++){if(checked.has(draft[i])) [draft[i-1],draft[i]]=[draft[i],draft[i-1]];}
    if(action==='down') for(let i=draft.length-2;i>=1;i--){if(checked.has(draft[i])) [draft[i],draft[i+1]]=[draft[i+1],draft[i]];}
    if(action!=='up'&&action!=='down')resetChecks();
    renderLists();
    if(button.disabled)filterSelect.focus({preventScroll:true});
  }));
  openButton.addEventListener('click',()=>{
    draft=[...saved];filter='all';filterSelect.value='all';resetChecks();renderLists();
    previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();filterSelect.focus();host.classList.add('has-tried');
  });
  dialog.querySelectorAll('[data-demo-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  query('[data-demo-save]').addEventListener('click',()=>{const added=draft.filter(id=>!saved.includes(id));saved=[...draft];renderTable(true,added);dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;openButton.focus({preventScroll:true});});
  new MutationObserver(()=>{renderTable();if(dialog.open)renderLists();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  renderTable();host.hidden=false;
})();
