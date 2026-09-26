"""Assemble accepted-for-now V2 head with seated body, preserving source masters."""
import bpy,bmesh,math,os
from mathutils import Vector,Matrix
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'));os.chdir(ROOT)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=os.path.abspath('artifacts/portfolio-rebuild/hyper3d/avatar-source/base_high_pbr.glb'))
def cut(obj,z,above):
 bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.000001,plane_co=(0,0,z),plane_no=(0,0,1),clear_outer=above,clear_inner=not above);bm.to_mesh(obj.data);bm.free();obj.data.update()
body=[o for o in bpy.context.scene.objects if o.type=='MESH'];rotation=Matrix.Rotation(math.radians(-50),4,'Z')
for o in body:
 o.data.transform(o.matrix_world);o.matrix_world=Matrix.Identity(4);cut(o,1.43,True)
 o.data.transform(rotation@Matrix.Scale(.83,4)@Matrix.Translation(Vector((0,-.3,-.72))));o.name='avatar_body'
 for m in o.data.materials:
  bs=m.node_tree.nodes.get('Principled BSDF')
  for key,value in [('Metallic',0),('Roughness',.75),('Specular IOR Level',.12)]:
   for link in list(bs.inputs[key].links):m.node_tree.links.remove(link)
   bs.inputs[key].default_value=value
  for link in list(bs.inputs['Normal'].links):m.node_tree.links.remove(link)
before=set(bpy.context.scene.objects)
bpy.ops.import_scene.gltf(filepath=os.path.abspath('artifacts/portfolio-rebuild/character/v2/head-review.glb'))
head=[o for o in bpy.context.scene.objects if o not in before and o.type=='MESH'];mount=rotation@Vector((0,-.0996,.5893))
for o in head:
 o.data.transform(o.matrix_world);o.matrix_world=Matrix.Identity(4)
 if o.name=='head_surface':cut(o,.35,False)
 o.data.transform(Matrix.Translation(mount)@Matrix.Rotation(math.radians(-15),4,'Z')@Matrix.Scale(.185,4)@Matrix.Translation(Vector((0,0,-.35))))
source=os.path.abspath('explore/assets/source/avatar-v2.blend');bpy.ops.wm.save_as_mainfile(filepath=source)
for level,body_ratio,head_ratio,tex in [('desktop',.20,.13,2048),('mobile',.10,.065,1024)]:
 bpy.ops.wm.open_mainfile(filepath=source)
 for o in [o for o in bpy.context.scene.objects if o.type=='MESH']:
  if o.name.startswith('glasses_'):continue
  bpy.context.view_layer.objects.active=o;d=o.modifiers.new('Web geometry','DECIMATE');d.ratio=body_ratio if o.name.startswith('avatar_body') else head_ratio;bpy.ops.object.modifier_apply(modifier=d.name)
 # Seam-preserving typing morphs are authored after decimation so topology stays fixed.
 for o in [o for o in bpy.context.scene.objects if o.type=='MESH' and o.name.startswith('avatar_body')]:
  inverse=rotation.inverted()
  # Lift the generated hand undersides onto the physical keycap surface.
  for vertex in o.data.vertices:
   raw=inverse@vertex.co/.83+Vector((0,.3,.72))
   if .94<raw.z<1.16 and raw.y<-.06 and abs(raw.x)>.025:
    forward=max(0,min(1,(-raw.y-.06)/.25));vertical=max(0,min(1,(raw.z-.94)/.04))*max(0,min(1,(1.16-raw.z)/.06))
    vertex.co.z+=.018*forward*forward*(3-2*forward)*vertical
  o.shape_key_add(name='Basis')
  for side,label in [(-1,'Typing_Left'),(1,'Typing_Right')]:
   key=o.shape_key_add(name=label)
   for vertex,point in zip(o.data.vertices,key.data):
    raw=inverse@vertex.co/.83+Vector((0,.3,.72))
    if raw.z<.94 or raw.z>1.16 or raw.y>-.06 or raw.x*side<.025:continue
    forward=max(0,min(1,(-raw.y-.06)/.25));vertical=max(0,min(1,(raw.z-.94)/.04))*max(0,min(1,(1.16-raw.z)/.06))
    weight=forward*forward*(3-2*forward)*vertical
    point.co.z+=.005*weight
 for im in bpy.data.images:
  if im.size[0]>tex:im.scale(tex,tex);im.pack()
 filename='avatar-v2.glb' if level=='desktop' else 'avatar-v2-mobile.glb'
 bpy.ops.export_scene.gltf(filepath=os.path.abspath('explore/assets/'+filename),export_format='GLB',export_image_format='JPEG',export_jpeg_quality=88)
 print('ASSEMBLED',filename)
