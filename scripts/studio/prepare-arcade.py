"""Prepare the Hyper3D arcade for the studio: metres, floor pivot, 32k triangles.
Usage: Blender --background --python scripts/studio/prepare-arcade.py -- SOURCE.glb
Source: Hyper3D asset c3ca60d6-a0cc-4c98-97f5-c5847888ad14.
"""
import bpy, sys, os
from mathutils import Vector
from pathlib import Path
root=Path(__file__).resolve().parents[2]
source=Path(sys.argv[sys.argv.index('--')+1])
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@Vector(v) for o in meshes for v in o.bound_box]
lo=Vector(tuple(min(v[i] for v in points) for i in range(3)))
hi=Vector(tuple(max(v[i] for v in points) for i in range(3)))
scale=1.13/(hi.z-lo.z);center=(lo+hi)/2
budget=sum(len(o.data.polygons) for o in meshes)
for i,o in enumerate(meshes):
 matrix=o.matrix_world.copy();o.parent=None;o.matrix_world.identity()
 for v in o.data.vertices:
  p=matrix@v.co
  v.co=Vector(((p.x-center.x)*scale,(p.y-center.y)*scale,(p.z-lo.z)*scale))
 o.name=f'arcade_walnut_body_{i}'
 bpy.context.view_layer.objects.active=o
 dec=o.modifiers.new('Web silhouette budget','DECIMATE');dec.ratio=min(1,32000/budget)
 bpy.ops.object.modifier_apply(modifier=dec.name)
 for face in o.data.polygons:face.use_smooth=True
 for m in o.data.materials:
  if m.use_nodes:
   bs=m.node_tree.nodes.get('Principled BSDF')
   if bs:bs.inputs['Metallic'].default_value=0
for im in bpy.data.images:
 if im.size[0]>1024:
  ratio=1024/max(im.size);im.scale(round(im.size[0]*ratio),round(im.size[1]*ratio));im.pack()
bpy.ops.object.select_all(action='DESELECT')
for o in meshes:o.select_set(True)
bpy.ops.export_scene.gltf(filepath='/tmp/arcade-web.glb',export_format='GLB',use_selection=True,export_apply=True,export_yup=True,export_image_format='JPEG',export_jpeg_quality=85)
print('ARCADE_DIMENSIONS',[(o.name,list(o.dimensions),len(o.data.polygons)) for o in meshes])
sc=bpy.context.scene;sc.world.use_nodes=True;sc.world.node_tree.nodes['Background'].inputs[0].default_value=(.18,.18,.18,1)
for loc,power,size in [((2,-3,3),160,3),((-2,-1,2),100,2),((0,2,3),160,2)]:
 d=bpy.data.lights.new('Softbox','AREA');d.energy=power;d.shape='DISK';d.size=size;o=bpy.data.objects.new('Softbox',d);sc.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,.6))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(1.6,-2.5,1.5));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,.56))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=1.5;sc.camera=cam
sc.render.engine='CYCLES';sc.cycles.samples=16;sc.render.resolution_x=700;sc.render.resolution_y=800;sc.render.resolution_percentage=100;sc.render.image_settings.file_format='PNG';sc.render.filepath='/tmp/arcade-inspection.png';sc.view_settings.view_transform='AgX'
bpy.ops.render.render(write_still=True)
