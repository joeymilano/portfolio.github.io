export const DISCOVERIES=Object.freeze(['monitor','arcade','record','books','portrait','photography']);
export function readDiscoveries(storage){try{const value=JSON.parse(storage.getItem('studio-discoveries-v1')||'[]');return Array.isArray(value)?value.filter(id=>DISCOVERIES.includes(id)).filter((id,i,a)=>a.indexOf(id)===i):[]}catch{return []}}
export function saveDiscovery(storage,id){const found=readDiscoveries(storage);if(!DISCOVERIES.includes(id)||found.includes(id))return {found,new:false};found.push(id);try{storage.setItem('studio-discoveries-v1',JSON.stringify(found))}catch{}return {found,new:true};}
export function localNote(storage){try{return (storage.getItem('studio-private-note-v1')||'').slice(0,500)}catch{return ''}}
export function saveLocalNote(storage,value){const note=String(value).trim().slice(0,500);try{storage.setItem('studio-private-note-v1',note);return true}catch{return false}}
