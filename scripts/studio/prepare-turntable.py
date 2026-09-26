"""Optimize user-authorized Hyper3D body; repair circular platter and articulated arm.
Master retained in artifacts only. Blender Z up exports glTF Y up.
"""
import bpy,os,math,json
from mathutils import Vector
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'))
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=ROOT+'/artifacts/portfolio-rebuild/hyper3d/turntable-source/base_high_pbr.glb')
body=bpy.data.objects.get('root.0')
for o in list(bpy.context.scene.objects):
 if o!=body:bpy.data.objects.remove(o,do_unlink=True)
bpy.context.view_layer.objects.active=body;body.select_set(True);bpy.ops.object.transform_apply(location=False,rotation=True,scale=True)
verts=[body.matrix_world@Vector(v) for v in body.bound_box];lo=Vector(tuple(min(v[i] for v in verts) for i in range(3)));hi=Vector(tuple(max(v[i] for v in verts) for i in range(3)));center=(lo+hi)/2
for v in body.data.vertices:
 v.co.x=(v.co.x-center.x)*.78/(hi.x-lo.x);v.co.y=(v.co.y-center.y)*.55/(hi.y-lo.y);v.co.z=(v.co.z-lo.z)*.118/(hi.z-lo.z)
body.location=(0,0,0);body.name='turntable_body'
dec=body.modifiers.new('Retain walnut silhouette • 8k face budget','DECIMATE');dec.ratio=min(1,8000/len(body.data.polygons));bpy.ops.object.modifier_apply(modifier=dec.name)
for im in bpy.data.images:
 if im.size[0]>1024:
  target=1024 if 'diffuse' in im.name else 512;im.scale(target,target);im.pack()
def mat(name,color,rough,metal=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(*color,1);bs.inputs['Roughness'].default_value=rough;bs.inputs['Metallic'].default_value=metal;return m
black=mat('Vinyl • satin black',(.012,.014,.016),.27,.13);groove=mat('Pressed concentric microgrooves',(.021,.023,.024),.34,.16);silver=mat('Machined brushed aluminum',(.42,.43,.42),.23,.92);dark=mat('Tonearm graphite',(.025,.028,.03),.35,.75);label=mat('Unprinted ochre label',(.57,.20,.045),.81);rubber=mat('Isolation rubber',(.018,.019,.019),.88)
def finish(o,name,ma):
 o.name=name;o.data.materials.append(ma)
 for f in o.data.polygons:f.use_smooth=True
 return o
def cyl(name,loc,r,depth,ma,segments=96):
 bpy.ops.mesh.primitive_cylinder_add(vertices=segments,radius=r,depth=depth,location=loc);return finish(bpy.context.object,name,ma)
def box(name,loc,dim,ma,bev=.002):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.dimensions=dim;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);finish(o,name,ma);mod=o.modifiers.new('Manufactured edge','BEVEL');mod.width=bev;mod.segments=2;bpy.ops.object.modifier_apply(modifier=mod.name);return o
def rod(name,a,b,r,ma):
 a,b=Vector(a),Vector(b);o=cyl(name,(a+b)/2,r,(b-a).length,ma,20);o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();return o
def group(name,obs,pivot):
 bpy.ops.object.select_all(action='DESELECT')
 for o in obs:o.select_set(True)
 bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();o=obs[0];o.name=name;bpy.ops.object.transform_apply(location=False,rotation=True,scale=True);bpy.context.scene.cursor.location=pivot;bpy.ops.object.origin_set(type='ORIGIN_CURSOR');return o
cx,cy=-.075,-.012
cyl('Machined platter', (cx,cy,.122),.225,.014,silver,128)
cyl('Rubber platter mat',(cx,cy,.130),.22,.003,rubber,128)
parts=[cyl('Vinyl disc',(cx,cy,.133),.216,.0028,black,128),cyl('Paper center label',(cx,cy,.1348),.062,.00045,label,96)]
for i in range(20):
 bpy.ops.mesh.primitive_torus_add(major_segments=96,minor_segments=3,major_radius=.078+i*.00665,minor_radius=.00013,location=(cx,cy,.1345));parts.append(finish(bpy.context.object,'Pressed groove',groove))
group('record_disc',parts,(cx,cy,.133))
cyl('Spindle',(cx,cy,.142),.003,.016,silver,24)
# One tonearm, independently rotatable around its vertical bearing.
pivot=(.272,.164,.143)
cyl('Tonearm bearing plinth',(.272,.164,.125),.037,.013,dark,64)
cyl('Tonearm bearing',(.272,.164,.14),.023,.022,silver,48)
parts=[rod('Tonearm tube',(.272,.164,.160),(.098,-.094,.146),.0045,silver),box('Headshell',(.091,-.112,.144),(.022,.043,.006),dark),box('Cartridge',(.091,-.12,.138),(.011,.019,.007),black),rod('Stylus cantilever',(.091,-.122,.136),(.086,-.126,.1346),.0008,silver),rod('Counterweight shaft',(.272,.164,.16),(.286,.207,.162),.004,silver)]
parts.append(rod('Counterweight',(.278,.185,.161),(.287,.213,.164),.014,dark))
parts.append(rod('Finger lift',(.10,-.105,.149),(.123,-.11,.16),.0015,silver))
group('tonearm',parts,pivot)
# Visible controls with discrete physical geometry; app interaction remains explicit.
cyl('Speed selector',(.30,-.202,.124),.016,.012,dark,48)
cyl('Speed selector cap',(.30,-.202,.131),.011,.002,silver,48)
box('Power button',(-.31,-.212,.121),(.037,.020,.006),dark,.003)
for x in [-.30,.30]:
 for y in [-.20,.20]:cyl('Isolation foot',(x,y,.006),.027,.012,rubber,32)
# A clean machined top plate covers generated surface lumps while retaining the source walnut body.
box('Machined top plate',(0,0,.120),(.774,.544,.005),dark,.003)
for m in body.data.materials:
 if m.use_nodes:
  bs=m.node_tree.nodes.get('Principled BSDF')
  if bs:
   for slot,value in [('Metallic',0.0),('Roughness',.46)]:
    for link in list(bs.inputs[slot].links):m.node_tree.links.remove(link)
    bs.inputs[slot].default_value=value
  for node in m.node_tree.nodes:
   if node.type=='NORMAL_MAP':node.inputs['Strength'].default_value=.25
# Normalize floor at zero after adding feet and retain centered plinth footprint.
# Lights/camera are only in editable source, not runtime GLB.
sc=bpy.context.scene;sc.world.use_nodes=True;sc.world.node_tree.nodes['Background'].inputs[0].default_value=(.06,.06,.06,1)
for loc,power,size in [((1,-1,2),70,2),((-1,-.5,1),40,1),((0,1,2),70,1)]:
 d=bpy.data.lights.new('Studio softbox','AREA');d.energy=power;d.size=size;l=bpy.data.objects.new('Studio softbox',d);bpy.context.collection.objects.link(l);l.location=loc;l.rotation_euler=(Vector((0,0,.1))-l.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(.73,-.94,.72));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,.07))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.lens=52;sc.camera=cam
sc.render.engine='CYCLES';sc.cycles.samples=40;sc.render.resolution_x=1200;sc.render.resolution_y=900;sc.render.resolution_percentage=100;sc.view_settings.view_transform='AgX';sc.render.filepath=ROOT+'/artifacts/portfolio-rebuild/hyper3d/turntable-source/optimized-inspection.png'
bpy.ops.wm.save_as_mainfile(filepath=ROOT+'/explore/assets/source/turntable.blend')
bpy.ops.object.select_all(action='DESELECT')
for o in sc.objects:
 if o.type=='MESH':o.select_set(True)
bpy.ops.export_scene.gltf(filepath=ROOT+'/explore/assets/turntable.glb',export_format='GLB',use_selection=True,export_apply=True,export_yup=True,export_image_format='JPEG',export_jpeg_quality=85)
print('FINAL_BYTES',os.path.getsize(ROOT+'/explore/assets/turntable.glb'))
bpy.ops.render.render(write_still=True)
