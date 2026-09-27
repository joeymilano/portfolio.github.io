const base='/explore/assets/photography/';
export const photography=Object.freeze([
 {id:'p12_img2',source:'https://photography-portfolio-rd5.pages.dev/images/p12_img2.jpeg',width:2256,height:3379,en:'Turkey',zh:'土耳其',altEn:'A woman in orange stands before a pale stone wall beneath a blue and pink sky.',altZh:'蓝粉色天空下，一位穿橙色衣服的人站在浅色山壁前。'},
 {id:'p05_img1',source:'https://photography-portfolio-rd5.pages.dev/images/p05_img1.jpeg',width:4096,height:2731,en:'Portraits',zh:'人像',altEn:'Black and white portrait of a woman in a white dress and broad-brimmed hat.',altZh:'黑白肖像：一位穿白裙、戴宽檐帽的女性。'},
 {id:'p11_img1',source:'https://photography-portfolio-rd5.pages.dev/images/p11_img1.jpeg',width:4096,height:2734,en:'Belgium',zh:'比利时',altEn:'Historic gabled buildings and a clock tower reflected in a canal at dusk.',altZh:'黄昏时，山墙建筑与钟楼倒映在运河中。'},
 {id:'p07_img1',source:'https://photography-portfolio-rd5.pages.dev/images/p07_img1.jpeg',width:4096,height:2731,en:'Portraits',zh:'人像',altEn:'Portrait of a woman in white holding blue flowers against a pale background.',altZh:'浅色背景前，一位身穿白衣的女性手持蓝色花束。'},
 {id:'p12_img1',source:'https://photography-portfolio-rd5.pages.dev/images/p12_img1.jpeg',width:4096,height:2734,en:'Turkey',zh:'土耳其',altEn:'A wide view of stone buildings and rock formations beneath an overcast sky.',altZh:'阴云下的石砌城镇与岩石地貌。'},
 {id:'p13_img1',source:'https://photography-portfolio-rd5.pages.dev/images/p13_img1.jpeg',width:4096,height:2734,en:'Casa Batlló, Barcelona',zh:'巴特罗之家，巴塞罗那',altEn:'A golden circular ceiling light beneath a swirling sculptural vault.',altZh:'金色圆形灯具悬于旋转形态的穹顶下。'}
].map(photo=>Object.freeze({...photo,display:`${base}${photo.id}.webp`,cover:`${base}${photo.id}-cover.webp`})));
