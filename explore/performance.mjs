export function shouldRender(now,last,idle,force=false){return force||now-last>=1000/(idle?30:60)-1;}

export function isIdle({now,lastInput,cameraDistance,lookDistance,transitioning,lightMix}){
 return now-lastInput>=2000&&cameraDistance<.005&&lookDistance<.005&&!transitioning&&(lightMix<=.001||lightMix>=.999);
}

export function qualityProfile(level,mobile){
 if(mobile)return [{ratio:1.5,shadowSize:1024,shadowUpdates:true},{ratio:1,shadowSize:1024,shadowUpdates:true},{ratio:1,shadowSize:1024,shadowUpdates:false}][Math.max(0,Math.min(2,level))];
 return [{ratio:2,shadowSize:2048,shadowUpdates:true},{ratio:1.5,shadowSize:2048,shadowUpdates:true},{ratio:1,shadowSize:2048,shadowUpdates:true},{ratio:1,shadowSize:1024,shadowUpdates:true},{ratio:1,shadowSize:1024,shadowUpdates:false}][Math.max(0,Math.min(4,level))];
}

export function advanceQuality(state,fps,maxLevel,eligible=true){
 if(!eligible)return state;
 let {level,low,high}=state;
 if(fps<45){low++;high=0;if(low>=2){level=Math.min(maxLevel,level+1);low=0;}}
 else if(fps>58){high++;low=0;if(high>=3){level=Math.max(0,level-1);high=0;}}
 else low=high=0;
 return {level,low,high};
}
