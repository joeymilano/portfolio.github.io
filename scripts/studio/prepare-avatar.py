"""Inspect and export the original connected seated avatar, Blender 5.2+.

Usage:
 Blender -b -P scripts/studio/prepare-avatar.py -- --source MASTER.glb --mode inspect
 Blender -b -P scripts/studio/prepare-avatar.py -- --source MASTER.glb --mode export --config calibration.json

Export requires measured correction_euler_degrees, source_pelvis,
metres_per_source_unit, runtime_yaw_degrees, target_pelvis_runtime and desktop
settings. Original connected topology is retained; body_ratio applies uniformly
to the entire mesh (.25 desktop / .12 mobile in the approved checkpoint).
head_turn_degrees must be zero: a changed pose needs rigging or regeneration.
texture_size and jpeg_quality control images. Optional mobile settings export
avatar-mobile.glb. The editable source is saved before geometry reduction.
"""
import argparse,json,math,os,sys
import bpy
from mathutils import Vector,Matrix,Euler
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'))
OUT=os.path.join(ROOT,'artifacts/portfolio-rebuild/character/avatar-inspection')
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
a=argparse.ArgumentParser();a.add_argument('--source',required=True);a.add_argument('--mode',choices=['inspect','export'],default='inspect');a.add_argument('--config');args=a.parse_args(args)
os.makedirs(OUT,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
if not os.path.isfile(args.source):raise FileNotFoundError(args.source)
bpy.ops.import_scene.gltf(filepath=os.path.abspath(args.source))
def meshes():return [o for o in bpy.context.scene.objects if o.type=='MESH']
def bounds(obs):
 points=[o.matrix_world@Vector(v) for o in obs for v in o.bound_box]
 return Vector(tuple(min(v[i] for v in points) for i in range(3))),Vector(tuple(max(v[i] for v in points) for i in range(3)))
def stats():
 return [{'name':o.name,'faces':len(o.data.polygons),'vertices':len(o.data.vertices),'bounds':[list(v) for v in bounds([o])],'materials':[m.name for m in o.data.materials if m]} for o in meshes()]
def setup_inspection(tag):
 sc=bpy.context.scene
 for o in list(sc.objects):
  if o.type in ('LIGHT','CAMERA'):bpy.data.objects.remove(o,do_unlink=True)
 lo,hi=bounds(meshes());center=(lo+hi)/2;height=max(hi.z-lo.z,hi.x-lo.x,hi.y-lo.y);sc.world.use_nodes=True;sc.world.node_tree.nodes.get('Background').inputs[0].default_value=(.08,.08,.08,1)
 for relative,power in [((1,-1.4,1.4),160),((-1,-.7,.8),80),((.3,1,1.5),130)]:
  d=bpy.data.lights.new('Inspection softbox','AREA');d.energy=power*height*height;d.size=height*1.4;o=bpy.data.objects.new('Inspection softbox',d);sc.collection.objects.link(o);o.location=center+Vector(relative)*height;o.rotation_euler=(center-o.location).to_track_quat('-Z','Y').to_euler()
 bpy.ops.object.camera_add();camera=bpy.context.object;camera.data.type='ORTHO';camera.data.ortho_scale=height*1.25;sc.camera=camera;sc.render.engine='CYCLES';sc.cycles.samples=24;sc.render.resolution_x=1000;sc.render.resolution_y=1000;sc.render.resolution_percentage=100;sc.view_settings.view_transform='AgX'
 for name,direction in [('front',(0,-3,.25)),('side',(3,0,.25)),('three-quarter',(2,-3,.5))]:
  camera.location=center+Vector(direction)*height;camera.rotation_euler=(center-camera.location).to_track_quat('-Z','Y').to_euler();sc.render.filepath=os.path.join(OUT,tag+'-'+name+'.png');bpy.ops.render.render(write_still=True)
 return camera
raw={'source':os.path.abspath(args.source),'objects':stats(),'images':[{'name':im.name,'size':list(im.size)} for im in bpy.data.images if im.size[0]]}
open(os.path.join(OUT,'source-inventory.json'),'w').write(json.dumps(raw,indent=2))
if args.mode=='inspect':
 setup_inspection('source');print('INSPECTION_COMPLETE',OUT);sys.exit(0)
if not args.config:raise ValueError('Export requires explicit measured calibration JSON')
cfg=json.load(open(args.config));required=['correction_euler_degrees','source_pelvis','metres_per_source_unit','runtime_yaw_degrees','head_cut_metres','target_pelvis_runtime','desktop']
for k in required:
 if k not in cfg:raise ValueError('Missing measured calibration: '+k)
correction=Euler(tuple(math.radians(x) for x in cfg['correction_euler_degrees']),'XYZ').to_matrix().to_4x4();scale=cfg['metres_per_source_unit'];pelvis=Vector(cfg['source_pelvis'])
# Bind meshes into corrected, scaled coordinates, pelvis at origin.
for o in meshes():
 world=Matrix.Scale(scale,4)@Matrix.Translation(-pelvis)@correction@o.matrix_world
 o.parent=None;o.data.transform(world);o.matrix_world=Matrix.Identity(4);o.data.update()
# Original generated head/neck retained: a new pose requires rigging or regeneration.
if cfg.get('head_turn_degrees',0)!=0:raise ValueError('Head deformation is not supported; preserve the original pose')
# Preserve connected source topology; uniform reduction avoids artificial neck seams.
# Runtime yaw is applied to geometry; exported local transforms remain identity.
rotation=Matrix.Rotation(math.radians(cfg['runtime_yaw_degrees']),4,'Z')
for o in meshes():o.data.transform(rotation)
# Avatar has dielectric skin, fabric, hair and plastic frames; source metal response washes out textured eyes.
for ma in bpy.data.materials:
 if not ma.use_nodes:continue
 bs=ma.node_tree.nodes.get('Principled BSDF')
 if not bs:continue
 for key,value in [('Metallic',0.0),('Roughness',.65),('Specular IOR Level',.22)]:
  for link in list(bs.inputs[key].links):ma.node_tree.links.remove(link)
  bs.inputs[key].default_value=value
# Generated normal map is omitted for this likeness checkpoint.
for ma in bpy.data.materials:
 if ma.use_nodes:
  bs=ma.node_tree.nodes.get('Principled BSDF')
  if bs:
   for link in list(bs.inputs['Normal'].links):ma.node_tree.links.remove(link)
   bs.inputs['Specular IOR Level'].default_value=.08;bs.inputs['Roughness'].default_value=.75
open(os.path.join(OUT,'calibration.json'),'w').write(json.dumps(cfg,indent=2))
# Calibrated master retained before optimization.
source_path=os.path.join(ROOT,'explore/assets/source/avatar.blend');bpy.ops.wm.save_as_mainfile(filepath=source_path)
for level in ['desktop','mobile']:
 if level not in cfg:continue
 bpy.ops.wm.open_mainfile(filepath=source_path);settings=cfg[level]
 for o in meshes():
  if o.name in cfg.get('preserve_objects',[]):continue
  ratio=settings['head_ratio'] if o.name.endswith('__head') else settings['body_ratio']
  if ratio<1:
   bpy.context.view_layer.objects.active=o;modifier=o.modifiers.new('Measured '+level+' reduction','DECIMATE');modifier.ratio=ratio;bpy.ops.object.modifier_apply(modifier=modifier.name)
 for im in bpy.data.images:
  if im.size[0]>settings['texture_size']:
   ratio=settings['texture_size']/max(im.size);im.scale(max(1,round(im.size[0]*ratio)),max(1,round(im.size[1]*ratio)));im.pack()
 setup_inspection(level)
 bpy.ops.object.select_all(action='DESELECT')
 for o in meshes():o.select_set(True)
 suffix=cfg.get('output_suffix','');filename='avatar'+suffix+'.glb' if level=='desktop' else 'avatar-mobile'+suffix+'.glb';path=os.path.join(ROOT,'explore/assets',filename)
 bpy.ops.export_scene.gltf(filepath=path,export_format='GLB',use_selection=True,export_apply=True,export_yup=True,export_image_format='JPEG',export_jpeg_quality=settings['jpeg_quality'])
 print('AVATAR_EXPORT',level,os.path.getsize(path),json.dumps(stats()))
