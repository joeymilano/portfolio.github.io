// Normalized camera intent: bounded, independent of scene geometry or frame rate.
export function moveView(view,dx,dy){return {x:Math.max(-1,Math.min(1,view.x+dx)),y:Math.max(-1,Math.min(1,view.y+dy))}}
// Desktop orbits the desk; portrait framing cannot reach the left corners by orbiting a fixed
// look point, so mobile pans the whole rig along the room instead (turntable, shelf, photo wall).
export function viewOffset(view,mobile=false){if(mobile)return {yaw:0,pitch:view.y*.10,pan:view.x*(view.x<0?3.6:1)};return {yaw:view.x*(view.x<0?.22:1.12),pitch:view.y*.10,pan:0}}
