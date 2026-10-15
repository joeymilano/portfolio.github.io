// Curated example relationships for the portfolio interaction; no customer data.
export const nodes = [
  {id:'CL-001',name:['示例细胞系','Example cell line'],library:['细胞系','Cell Lines'],type:'asset',direction:'current',parent:null,x:2,y:2},
  {id:'PV-001',name:['示例载体','Example vector'],library:['质粒','Plasmids'],type:'asset',direction:'parent',parent:'CL-001',x:1,y:2},
  {id:'DNA-001',name:['载体骨架','Vector backbone'],library:['DNA','DNA'],type:'asset',direction:'parent',parent:'PV-001',x:0,y:1},
  {id:'DNA-002',name:['插入片段','Insert sequence'],library:['DNA','DNA'],type:'asset',direction:'parent',parent:'PV-001',x:0,y:3},
  {id:'CL-001-01',name:['细胞系批次 01','Cell line lot 01'],library:['细胞系','Cell Lines'],type:'batch',direction:'child',parent:'CL-001',x:3,y:1},
  {id:'CL-001-02',name:['细胞系批次 02','Cell line lot 02'],library:['细胞系','Cell Lines'],type:'batch',direction:'child',parent:'CL-001',x:3,y:3},
  {id:'CX-001',name:['示例复合物','Example complex'],library:['复合物','Complexes'],type:'asset',direction:'child',parent:'CL-001-01',x:4,y:1},
  {id:'CX-001-01',name:['复合物批次 01','Complex lot 01'],library:['复合物','Complexes'],type:'batch',direction:'child',parent:'CX-001',x:5,y:.4},
  {id:'CX-001-02',name:['复合物批次 02','Complex lot 02'],library:['复合物','Complexes'],type:'batch',direction:'child',parent:'CX-001',x:5,y:1.8}
];
export const rootId = 'CL-001';
export const findNode = id => nodes.find(node=>node.id===id);
export const branches = id => nodes.filter(node=>node.parent===id);
export function visibleNodes(expanded) {
  return nodes.filter(node=>{
    let current=node;
    while(current.parent) {
      if(!expanded.has(current.parent))return false;
      current=findNode(current.parent);
    }
    return true;
  });
}
export function toggleBranch(expanded,id) {
  const next=new Set(expanded);
  if(id===rootId||!branches(id).length)return next;
  next.has(id)?next.delete(id):next.add(id);
  return next;
}
export function recordRelations(id) {
  const parents=[], children=[];
  nodes.filter(n=>n.parent).forEach(n=>{
    const from=n.direction==='parent'?n.id:n.parent;
    const to=n.direction==='parent'?n.parent:n.id;
    if(to===id)parents.push(findNode(from));
    if(from===id)children.push(findNode(to));
  });
  return {parents,children};
}
