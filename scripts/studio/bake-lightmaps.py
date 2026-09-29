"""Bakes the studio's day and night lightmaps into the room's TEXCOORD_1 atlas.
Run: Blender --background --python scripts/studio/bake-lightmaps.py
Needs artifacts/lightmap/room-lightmap-uv.glb (prepare-lightmap-room.mjs) and occluders.glb (export-occluders.mjs).
Writes artifacts/lightmap/<mode>.f32: raw float RGBA irradiance in three.js units, for encode-lightmaps.mjs.

The rig mirrors explore/lighting.mjs minus the key light's direct term, which stays realtime so the
avatar keeps a moving shadow; the key's bounce light is baked in a second, indirect-only pass. Units: a Blender point light of 4*pi*I watts, with the diffuse bake times pi, gives
three.js irradiance for intensity I (checked against a single light over a plane).
"""
import bpy, math, os, sys
import numpy as np
from mathutils import Vector
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'))
OUT=ROOT+'/artifacts/lightmap'
SIZE=int(os.environ.get('LIGHTMAP_SIZE','2048')); SAMPLES=int(os.environ.get('LIGHTMAP_SAMPLES','2048'))
MODES=os.environ.get('LIGHTMAP_MODES','night,day').split(',')
UNBAKED_NODES={'book_01','monitor_screen'}
UNBAKED_MATERIALS={'Blue smoked fluted glazing','Warm integrated lamp diffuser','Screen • runtime image'}

def p(v): return Vector((v[0],-v[2],v[1]))
def linear(hex_color):
 c=[((hex_color>>s)&255)/255 for s in (16,8,0)]
 return tuple(x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in c)

# lighting.mjs, both ends of the day/night mix. Intensities are three.js candela; hemi is sky/ground irradiance.
RIG={
 'night':{'hemi':(0xa4bacb,0x30231a,.3),'window':(0xa4bacb,27),'key':(0xffd3a0,.65,(-2,4,3)),'accent':1,'emission':1,'albedo':{'plaster':.26,'stone':.38}},
 'day':{'hemi':(0xdceeff,0xb5a891,2.1),'window':(0xdceeff,55),'key':(0xfff3db,2.5,(3,5,-2)),'accent':.1,'emission':.04,'albedo':{'plaster':.78,'stone':.72}},
}
# The shelf wash has always shone through the shelves at runtime; it stays unshadowed to keep that glow on the wall.
ACCENTS=[(0xffe2c0,.75,(1.4,2.15,1.9),.08,True),(0xffb76a,8,(-2.6,1.18,1.48),.12,True),(0xffb365,8,(-2.1,2,-1.85),.18,False)]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene=bpy.context.scene
bpy.ops.import_scene.gltf(filepath=OUT+'/room-lightmap-uv.glb')
room=[o for o in bpy.context.selected_objects if o.type=='MESH']
bpy.ops.import_scene.gltf(filepath=OUT+'/occluders.glb')

# Faces of self-lit or transparent materials inside a baked mesh would all land on atlas texel (0,0); split them off.
baked=[]
for o in room:
 if o.name.split('.')[0] in UNBAKED_NODES or len(o.data.uv_layers)<2:continue
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
 skip={i for i,m in enumerate(o.data.materials) if m and m.name.split('.')[0] in UNBAKED_MATERIALS}
 if skip and len(skip)<len(o.data.materials):
  bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='DESELECT');bpy.ops.object.mode_set(mode='OBJECT')
  for f in o.data.polygons:f.select=f.material_index in skip
  bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.separate(type='SELECTED');bpy.ops.object.mode_set(mode='OBJECT')
 elif skip:continue
 o.data.uv_layers.active=o.data.uv_layers[1]
 baked.append(o)
print('BAKE objects',len(baked))

# Glass is nearly clear at runtime (opacity .08), so sky and window light pass through it.
for m in bpy.data.materials:
 if m.name.startswith('Blue smoked fluted glazing') and m.node_tree:
  nt=m.node_tree;out=next(n for n in nt.nodes if n.type=='OUTPUT_MATERIAL');clear=nt.nodes.new('ShaderNodeBsdfTransparent');nt.links.new(clear.outputs[0],out.inputs['Surface'])

def sock(node,name,out=False):
 return next(x for x in (node.outputs if out else node.inputs) if x.name==name and x.type=='RGBA')
def principled(m):
 return next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None) if m and m.node_tree else None
# Runtime albedo scaling for plaster and stone (runtime.mjs load step times lighting.mjs day boost) drives bounce light.
albedo_nodes={}
for m in bpy.data.materials:
 kind='plaster' if 'plaster' in m.name else 'stone' if 'stone' in m.name else None
 bs=principled(m)
 if not kind or not bs:continue
 nt=m.node_tree;mul=nt.nodes.new('ShaderNodeMix');mul.data_type='RGBA';mul.blend_type='MULTIPLY';mul.inputs['Factor'].default_value=1
 socket=bs.inputs['Base Color']
 if socket.links:
  nt.links.new(socket.links[0].from_socket,sock(mul,'A'))
 else:sock(mul,'A').default_value=socket.default_value
 nt.links.new(sock(mul,'Result',True),socket);albedo_nodes.setdefault(kind,[]).append(mul)
emitters=[(bs,bs.inputs['Emission Strength'].default_value) for m in bpy.data.materials if (bs:=principled(m)) and bs.inputs['Emission Strength'].default_value>0]

# One target image, referenced by an active image node in every baked material.
target=bpy.data.images.new('lightmap',SIZE,SIZE,alpha=True,float_buffer=True)
for o in baked:
 for m in o.data.materials:
  if not m or not m.node_tree or 'lightmap target' in m.node_tree.nodes:continue
  n=m.node_tree.nodes.new('ShaderNodeTexImage');n.name='lightmap target';n.image=target;m.node_tree.nodes.active=n
for o in bpy.context.scene.objects:
 if o.type!='MESH':continue
 for m in o.data.materials:
  if m and m.node_tree and 'lightmap target' in m.node_tree.nodes:m.node_tree.nodes.active=m.node_tree.nodes['lightmap target']

def light(name,kind,position,color,intensity,radius,target_pos=None,angle=None,penumbra=None,shadow=True):
 d=bpy.data.lights.new(name,kind);d.color=color;d.energy=4*math.pi*intensity;d.shadow_soft_size=radius;d.use_shadow=shadow
 if hasattr(d,'use_soft_falloff'):d.use_soft_falloff=False
 if kind=='SPOT':d.spot_size=2*angle;d.spot_blend=penumbra
 o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=p(position)
 if target_pos:o.rotation_euler=(p(target_pos)-o.location).to_track_quat('-Z','Y').to_euler()
 return o

world=bpy.data.worlds.new('hemisphere');scene.world=world;world.use_nodes=True;wt=world.node_tree
coord=wt.nodes.new('ShaderNodeTexCoord');split=wt.nodes.new('ShaderNodeSeparateXYZ');ramp=wt.nodes.new('ShaderNodeMapRange')
ramp.inputs['From Min'].default_value=-1;ramp.inputs['From Max'].default_value=1
mix=wt.nodes.new('ShaderNodeMix');mix.data_type='RGBA';bg=wt.nodes['Background']
wt.links.new(coord.outputs['Generated'],split.inputs[0]);wt.links.new(split.outputs['Z'],ramp.inputs['Value']);wt.links.new(ramp.outputs[0],mix.inputs['Factor'])
wt.links.new(sock(mix,'Result',True),bg.inputs['Color'])

scene.render.engine='CYCLES';scene.cycles.samples=SAMPLES;scene.cycles.use_denoising=False;scene.cycles.max_bounces=6
prefs=bpy.context.preferences.addons['cycles'].preferences
try:
 if os.environ.get('LIGHTMAP_DEVICE')=='CPU':raise RuntimeError('CPU requested')
 prefs.compute_device_type='METAL';prefs.get_devices()
 for dev in prefs.devices:dev.use=True
 scene.cycles.device='GPU'
except Exception as error:print('GPU unavailable, baking on CPU',error)
bake=scene.render.bake;bake.margin=8;bake.margin_type='EXTEND';bake.use_clear=True;bake.target='IMAGE_TEXTURES'

for mode in MODES:
 rig=RIG[mode]
 for o in [o for o in scene.objects if o.type=='LIGHT']:bpy.data.objects.remove(o)
 sky,ground,hemi=rig['hemi']
 # Uniform radiance L gives irradiance pi*L on an open surface, so hemi irradiance C*i needs L=C*i/pi.
 sock(mix,'A').default_value=(*[c*hemi/math.pi for c in linear(ground)],1);sock(mix,'B').default_value=(*[c*hemi/math.pi for c in linear(sky)],1);bg.inputs['Strength'].default_value=1
 # The window spot hangs just under the header: a wider emitter would light the header's underside.
 color,intensity=rig['window'];light('Window light','SPOT',(2,2.8,-2.1),linear(color),intensity,.04,(.2,.6,1),1.05,.85)
 for hex_color,power,position,radius,shadow in ACCENTS:light('Accent','POINT',position,linear(hex_color),power*rig['accent'],radius,shadow=shadow)
 light('Task lamp','SPOT',(.646,1.38,.236),linear(0xffc98e),2.2*rig['accent'],.04,(.70,.81,.55),.62,.9)
 for bs,strength in emitters:bs.inputs['Emission Strength'].default_value=strength*rig['emission']
 for kind,nodes in albedo_nodes.items():
  for n in nodes:k=rig['albedo'][kind];sock(n,'B').default_value=(k,k,k,1)
 bpy.ops.object.select_all(action='DESELECT')
 for o in baked:o.select_set(True)
 bpy.context.view_layer.objects.active=baked[0]
 def run_bake(passes):
  bpy.ops.object.bake(type='DIFFUSE',pass_filter=passes)
  px=np.empty(SIZE*SIZE*4,dtype=np.float32);target.pixels.foreach_get(px);return px.reshape(-1,4)
 px=run_bake({'DIRECT','INDIRECT'})
 # Key light bounce only: a sun of strength I gives three.js irradiance I, like a DirectionalLight aimed at the origin.
 for o in [o for o in scene.objects if o.type=='LIGHT']:bpy.data.objects.remove(o)
 bg.inputs['Strength'].default_value=0
 for bs,strength in emitters:bs.inputs['Emission Strength'].default_value=0
 color,intensity,position=rig['key'];sun=bpy.data.lights.new('Key','SUN');sun.color=linear(color);sun.energy=intensity;sun.angle=math.radians(1)
 so=bpy.data.objects.new('Key',sun);scene.collection.objects.link(so);so.rotation_euler=(-p(position)).to_track_quat('-Z','Y').to_euler()
 px[:,:3]+=run_bake({'INDIRECT'})[:,:3]
 px[:,:3]*=math.pi
 # Cycles leaves alpha untouched; the sky reaches every visible texel, so any light marks a baked one.
 px[:,3]=(px[:,:3].max(axis=1)>0).astype(np.float32)
 px.tofile(f'{OUT}/{mode}.f32');print('BAKED',mode,'p50',float(np.median(px[px[:,3]>0,:3])),'p99',float(np.percentile(px[px[:,3]>0,:3],99)))
