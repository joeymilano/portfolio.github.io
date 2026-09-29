// Baked day and night lightmaps for the static room (scripts/studio/bake-lightmaps.py).
// The bake holds the fill rig's diffuse light with real occlusion and bounce: the hemisphere, the
// window spot, the lamps and the key light's bounce. On baked surfaces those lights keep only their
// specular term, and the key light's direct term stays realtime for the avatar's moving shadow.
export const lightmapVersion='v1';
// Irradiance at texel value 1, printed by scripts/studio/encode-lightmaps.mjs for this bake.
export const bakedScales={night:37.7,day:5.54};

export function lightmapUrls(mobile){
 const suffix=mobile?'-mobile':'';
 return {night:`/explore/assets/lightmap-${lightmapVersion}-night${suffix}.webp`,day:`/explore/assets/lightmap-${lightmapVersion}-day${suffix}.webp`};
}

const directCall='RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );';
const hemiCall='irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );';
const lightmapBlock='vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;';

// Rewrites three.js' light chunks for baked materials, or returns null when the chunks no longer
// match (a three.js upgrade), so the room falls back to realtime lighting instead of going dark.
export function patchLightChunks(begin,maps){
 const directional=begin.indexOf('#if ( NUM_DIR_LIGHTS > 0 )');
 const direct=begin.slice(0,directional);
 if(directional<0||direct.split(directCall).length!==3||!begin.includes(hemiCall)||!maps.includes(lightmapBlock))return null;
 return {
  // Point and spot lights: keep their highlights, drop the diffuse term the lightmap already holds.
  begin:direct.replaceAll(directCall,`{ vec3 bakedDiffuse = reflectedLight.directDiffuse; ${directCall} reflectedLight.directDiffuse = bakedDiffuse; }`)+begin.slice(directional).replace(hemiCall,''),
  // Texels store cbrt(irradiance / scale); blend the night and day bakes with the eased day/night mix.
  maps:maps.replace(lightmapBlock,'vec3 bakedNight = texture2D( lightMap, vLightMapUv ).rgb;\n\t\tvec3 bakedDay = texture2D( bakedDayMap, vLightMapUv ).rgb;\n\t\tvec3 lightMapIrradiance = mix( bakedNight * bakedNight * bakedNight * bakedScale.x, bakedDay * bakedDay * bakedDay * bakedScale.y, bakedMix ) * lightMapIntensity;'),
 };
}
