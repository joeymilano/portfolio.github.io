import {musicArtwork} from '../explore/music-artwork.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {parseLocation,buildLocation} from '../explore/state.mjs';
import {writing,writingPath,featuredWork,tracks} from '../explore/content.mjs';
import {photography} from '../explore/photography.mjs';

const root=new URL('../',import.meta.url);
test('photography deep links round trip in both languages',()=>{
 for(const lang of ['en','zh']){
  const path=buildLocation('https://site.test/explore/?campaign=studio','photography',lang);
  assert.deepEqual(parseLocation(`https://site.test${path}`),{id:'photography',language:lang,invalidItem:false});
 }
});
test('featured work points to published cases and available images',()=>{
 assert.deepEqual(featuredWork.map(item=>item.title),['Signals Notebook','Finfold','ID.AURA']);
 for(const item of featuredWork){assert.ok(existsSync(new URL(item.image.slice(1),root)),item.image);assert.ok(existsSync(new URL(item.path.slice(1)+(item.path.endsWith('/')?'index.html':'.html'),root)),item.path)}
});
test('notebook articles use their published dates and bilingual routes',()=>{
 assert.equal(writing.length,5);
 for(const article of writing){
  for(const lang of ['en','zh']){
   const path=writingPath(article.slug,lang);
   const html=readFileSync(new URL(path.slice(1)+'.html',root),'utf8');
   assert.ok(html.includes(`"datePublished":"${article.date}"`),path);
   assert.ok(html.includes(`"headline":"${article[lang]}`),path);
  }
 }
 assert.deepEqual(writing.map(article=>article.date),[...writing.map(article=>article.date)].sort().reverse());
});
test('curated authorized photographs have separate local display and cover files',()=>{
 assert.deepEqual(photography.map(photo=>photo.id),['p05_img1','p11_img1','p07_img1','p12_img1','p13_img1','usa_horseback','p13_img2','p18_img1']);
 // usa_horseback comes from the personal archive, the rest from the public photography site.
 const personal=new Set(['usa_horseback']);
 for(const photo of photography){
  if(personal.has(photo.id))assert.match(photo.source,/^local:/);
  else assert.equal(photo.source,`https://photography-portfolio-rd5.pages.dev/images/${photo.id}.jpeg`);
  assert.ok(photo.width>0&&photo.height>0);
  assert.ok(photo.en&&photo.zh&&photo.altEn&&photo.altZh);
  for(const path of [photo.display,photo.cover]){
   const bytes=readFileSync(new URL(path.slice(1),root));
   assert.equal(bytes.subarray(0,4).toString(),'RIFF',path);
   assert.equal(bytes.subarray(8,12).toString(),'WEBP',path);
  }
 }
});

test('every personal recording has its published album artwork available locally',()=>{
 assert.equal(Object.keys(musicArtwork).length,tracks.length);
 for(const [id] of tracks){
  const art=musicArtwork[id];assert.ok(art.album);
  assert.match(art.source,/^https:\/\/p1\.music\.126\.net\//);
  const bytes=readFileSync(new URL(art.cover.slice(1),root));
  assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');
 }
 assert.equal(musicArtwork['1873346292'].cover,musicArtwork['1969608391'].cover);
});
