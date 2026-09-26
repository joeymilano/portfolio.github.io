// Normalized camera intent: bounded, independent of scene geometry or frame rate.
export function moveView(view,dx,dy){return {x:Math.max(-1,Math.min(1,view.x+dx)),y:Math.max(-1,Math.min(1,view.y+dy))}}
export function viewOffset(view,mobile=false){return {yaw:view.x*(mobile?.12:.22),pitch:view.y*.10}}
