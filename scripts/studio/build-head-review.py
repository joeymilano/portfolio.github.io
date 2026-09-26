"""Build isolated head review with independently authored acetate frames/lenses.
Usage: Blender -b -P scripts/studio/build-head-review.py -- SOURCE.glb OUTPUT.glb
Coordinates are in normalized Blender space: Z up, -Y forward, height 2.
"""
import bpy,sys,os,math,json
from mathutils import Vector
src,dst=sys.argv[sys.argv.index('--')+1:][:2]
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=src)
obs=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@Vector(c) for o in obs for c in o.bound_box]
lo=Vector(tuple(min(p[i] for p in points) for i in range(3)));hi=Vector(tuple(max(p[i] for p in points) for i in range(3)));center=(lo+hi)/2;s=2/(hi.z-lo.z)
for o in obs:
 w=o.matrix_world.copy();o.parent=None
 for v in o.data.vertices:
  p=w@v.co;v.co=Vector(((p.x-center.x)*s,(p.y-center.y)*s,(p.z-lo.z)*s))
 o.matrix_world.identity();o.name='head_surface'
 for p in o.data.polygons:p.use_smooth=True
 for ma in o.data.materials:
  if not ma or not ma.use_nodes:continue
  bs=ma.node_tree.nodes.get('Principled BSDF')
  if not bs:continue
  for k,val in [('Metallic',0),('Roughness',.68),('Specular IOR Level',.22)]:
   for link in list(bs.inputs[k].links):ma.node_tree.links.remove(link)
   bs.inputs[k].default_value=val
  # Inspect source color first. Avoid allowing generated normal noise to warp eyes.
  for link in list(bs.inputs['Normal'].links):ma.node_tree.links.remove(link)
# Localized cheek smoothing: preserve eyes, nose, lips, hair and jaw silhouette.
for o in obs:
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
 bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.mesh.remove_doubles(threshold=.00001);bpy.ops.object.mode_set(mode='OBJECT')
 group=o.vertex_groups.new(name='Retouch_cheeks_nasolabial')
 count=0
 for v in o.data.vertices:
  x,y,z=v.co;ax=abs(x)
  if y>-.30 or ax<.13 or ax>.43 or z<.59 or z>1.10:continue
  weight=math.exp(-((ax-.245)/.115)**2-((z-.845)/.19)**2)
  weight*=min(1,(ax-.13)/.045)*min(1,(1.10-z)/.06)*min(1,(z-.59)/.08)
  if weight>.01:group.add([v.index],weight,'REPLACE');count+=1
 bpy.context.view_layer.objects.active=o
 mod=o.modifiers.new('Gentle cheek and fold refinement','SMOOTH');mod.vertex_group=group.name;mod.factor=.45;mod.iterations=35
 bpy.ops.object.modifier_apply(modifier=mod.name)
 if o.data.has_custom_normals:bpy.ops.mesh.customdata_custom_splitnormals_clear()
 o.data.update()
 print('RETOUCHED_CHEEK_VERTICES',count)
# Configuration measured from normalized head, editable without altering source.
cfg_path=os.path.join(os.path.dirname(dst),'glasses-fit.json')
cfg=json.load(open(cfg_path)) if os.path.exists(cfg_path) else {'eye_height':1.19,'front':-.55,'center_x':.255,'width':.45,'height':.36,'temple_back':.22}
def material(name,color,rough):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;b=m.node_tree.nodes.get('Principled BSDF');b.inputs['Base Color'].default_value=(*color,1);b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=0;return m
black=material('Acetate — black',(.008,.009,.010),.26)
lens=material('Lens — light tea brown',(.18,.075,.035),.14);p=lens.node_tree.nodes.get('Principled BSDF');p.inputs['Alpha'].default_value=.4;p.inputs['IOR'].default_value=1.45;lens.surface_render_method='DITHERED';lens.diffuse_color=(.18,.075,.035,.4)
def tube(name,points,radius,mat,closed=False):
 d=bpy.data.curves.new(name,'CURVE');d.dimensions='3D';d.resolution_u=2;d.bevel_depth=radius;d.bevel_resolution=4;sp=d.splines.new('POLY');sp.points.add(len(points)-1)
 for p,co in zip(sp.points,points):p.co=(*co,1)
 sp.use_cyclic_u=closed;o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);o.data.materials.append(mat);return o
# Photo-matched acetate silhouette: soft shoulders, tapered bottom and curved bridge.
# Smooth closed Catmull-Rom samples avoid the previous straight rectangular outline.
def smooth(points,steps=12,closed=True):
 out=[];n=len(points)
 for i in range(n if closed else n-1):
  p0=Vector(points[(i-1)%n] if closed or i>0 else points[0]);p1=Vector(points[i]);p2=Vector(points[(i+1)%n]);p3=Vector(points[(i+2)%n] if closed or i+2<n else points[-1])
  for j in range(steps):
   t=j/steps;out.append(tuple(.5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t)))
 if not closed:out.append(points[-1])
 return out
silhouette=[(-.90,.58),(-.68,.94),(-.05,1.02),(.65,1.04),(.96,.70),(.98,-.10),(.76,-.79),(.20,-.97),(-.50,-.91),(-.86,-.60),(-.97,-.02)]
for sign in [-1,1]:
 w=cfg['width']/2;h=cfg['height']/2;outline=[]
 for u,v in smooth(silhouette):
  x=sign*(cfg['center_x']+u*w);z=cfg['eye_height']+v*h;y=cfg['front']+.14*(abs(x)/.55)**2+.025*(-v);outline.append((x,y,z))
 tube('glasses_frame_'+str(sign),outline,.013,black,True)
 verts=[(x,y+.007,z) for x,y,z in outline]
 if sign>0:verts.reverse()
 mesh=bpy.data.meshes.new('Lens');mesh.from_pydata(verts,[],[tuple(range(len(verts)))]);mesh.update();ob=bpy.data.objects.new('glasses_lens_'+str(sign),mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(lens)
 outer=sign*(cfg['center_x']+w*.98)
 tube('glasses_temple_'+str(sign),smooth([(outer,cfg['front']+.075,cfg['eye_height']+.09),(outer+sign*.03,-.24,cfg['eye_height']+.075),(outer+sign*.025,cfg['temple_back'],cfg['eye_height']+.065),(outer,cfg['temple_back']+.12,cfg['eye_height']-.04)],closed=False),.012,black)
tube('glasses_bridge',smooth([(-.071,cfg['front']-.008,cfg['eye_height']+.075),(-.035,cfg['front']-.024,cfg['eye_height']+.078),(0,cfg['front']-.028,cfg['eye_height']+.067),(.035,cfg['front']-.024,cfg['eye_height']+.078),(.071,cfg['front']-.008,cfg['eye_height']+.075)],closed=False),.013,black)
# Retain original head density for this quality review; optimize only after inspection.
bpy.ops.wm.save_as_mainfile(filepath=os.path.splitext(dst)[0]+'.blend')
for o in list(bpy.context.scene.objects):
 if o.type=='CURVE':
  bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False)
# 4K is dedicated to the head, instead of sharing a low-resolution full-body atlas.
for im in bpy.data.images:
 if im.size[0]>4096:im.scale(4096,4096);im.pack()
bpy.ops.export_scene.gltf(filepath=dst,export_format='GLB',export_apply=True,export_image_format='JPEG',export_jpeg_quality=95)
print('HEAD_REVIEW_EXPORT',dst,os.path.getsize(dst),'NORMALIZATION',list(lo),list(hi),s)
