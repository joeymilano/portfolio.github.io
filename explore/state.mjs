/** Pure URL state. Explicit route/language always wins stored preferences. */
export const ITEM_IDS=Object.freeze(['finfold','music','books','about','work','writing']);
export const validId=id=>ITEM_IDS.includes(id)?id:null;
export const validLanguage=lang=>['en','zh'].includes(lang)?lang:null;
export function resolveLanguage(explicit,saved){return validLanguage(explicit)||validLanguage(saved)||'en';}
export function parseLocation(input){const url=new URL(input,'https://portfolio.local');const raw=url.searchParams.get('item');return {id:validId(raw),language:validLanguage(url.searchParams.get('lang')),invalidItem:raw!==null&&!validId(raw)};}
export function buildLocation(input,id,language){const url=new URL(input,'https://portfolio.local');if(validId(id))url.searchParams.set('item',id);else url.searchParams.delete('item');if(validLanguage(language))url.searchParams.set('lang',language);else url.searchParams.delete('lang');return url.pathname+url.search+url.hash;}
