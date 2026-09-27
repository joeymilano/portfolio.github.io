"""Assemble accepted-for-now V2 head with seated body, preserving source masters."""
import bpy,bmesh,math,os
from mathutils import Vector,Matrix
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'));os.chdir(ROOT)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=os.path.abspath('artifacts/portfolio-rebuild/hyper3d/avatar-source/base_high_pbr.glb'))
def cut(obj,z,above):
 bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.000001,plane_co=(0,0,z),plane_no=(0,0,1),clear_outer=above,clear_inner=not above);bm.to_mesh(obj.data);bm.free();obj.data.update()
def finish_neck_cut(obj,z,collar=False):
 # The generated coat was bisected through its collar. Close only that cut,
 # retaining all original surfaces, and extend the separate neck into the coat.
 bm=bmesh.new();bm.from_mesh(obj.data)
 bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
 edges=[e for e in bm.edges if e.is_boundary and all(abs(v.co.z-z)<.00001 for v in e.verts)]
 if collar:
  lining=bpy.data.materials.get('Collar inner fabric') or bpy.data.materials.new('Collar inner fabric')
  lining.use_nodes=True;bs=lining.node_tree.nodes.get('Principled BSDF')
  bs.inputs['Base Color'].default_value=(.008,.010,.012,1);bs.inputs['Roughness'].default_value=.85
  obj.data.materials.append(lining)
  faces=bmesh.ops.holes_fill(bm,edges=edges,sides=0)['faces']
  for face in faces:face.material_index=len(obj.data.materials)-1
  # A recessed lining follows the collar rim instead of leaving a flat cap.
  bmesh.ops.inset_region(bm,faces=faces,thickness=.012,depth=-.035,use_even_offset=True)
 else:
  result=bmesh.ops.extrude_edge_only(bm,edges=edges)
  lower=[v for v in result['geom'] if isinstance(v,bmesh.types.BMVert)]
  for vertex in lower:vertex.co.z-=.45
  rim=[e for e in bm.edges if e.is_boundary and all(v in lower for v in e.verts)]
  bmesh.ops.holes_fill(bm,edges=rim,sides=0)
 bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
 bm.to_mesh(obj.data);bm.free();obj.data.update()
 for face in obj.data.polygons:face.use_smooth=True
body=[o for o in bpy.context.scene.objects if o.type=='MESH'];rotation=Matrix.Rotation(math.radians(-50),4,'Z')
for o in body:
 o.data.transform(o.matrix_world);o.matrix_world=Matrix.Identity(4);cut(o,1.55,True)
 o.data.transform(rotation@Matrix.Scale(.83,4)@Matrix.Translation(Vector((0,-.3,-.72))));o.name='avatar_body'
 # Fit the preserved upper coat to the replacement neck with a gradual taper.
 for v in o.data.vertices:
  t=max(0,min(1,(v.co.z-.60)/.089));t=t*t*(3-2*t)
  v.co.x+=( (-.063+(v.co.x+.095)*.52)-v.co.x)*t
  v.co.y+=( (-.038+(v.co.y+.066)*.52)-v.co.y)*t
  v.co.z-=.03*t
 # Remove the original exposed neck/chest skin, retaining jacket and shoulders.
 import numpy as np
 image=next(n.image for m in o.data.materials for n in m.node_tree.nodes if n.type=='TEX_IMAGE' and n.image)
 width,height=image.size;pixels=np.array(image.pixels[:],dtype=np.float32).reshape(height,width,4)
 bm=bmesh.new();bm.from_mesh(o.data);uv=bm.loops.layers.uv.active;remove=[]
 for face in bm.faces:
  if min(v.co.z for v in face.verts)<.51:continue
  samples=[]
  for loop in face.loops:
   coord=loop[uv].uv;samples.append(pixels[min(height-1,int(coord.y*height)),min(width-1,int(coord.x*width)),:3])
  color=np.mean(samples,axis=0)
  if min(color)>.3 or (color[0]>.16 and color[0]>color[1]*1.12):remove.append(face)
 bmesh.ops.delete(bm,geom=remove,context='FACES');bm.to_mesh(o.data);bm.free()
 for m in o.data.materials:
  bs=m.node_tree.nodes.get('Principled BSDF')
  for key,value in [('Metallic',0),('Roughness',.75),('Specular IOR Level',.12)]:
   for link in list(bs.inputs[key].links):m.node_tree.links.remove(link)
   bs.inputs[key].default_value=value
  for link in list(bs.inputs['Normal'].links):m.node_tree.links.remove(link)
before=set(bpy.context.scene.objects)
bpy.ops.import_scene.gltf(filepath=os.path.abspath('artifacts/portfolio-rebuild/character/v2/head-review.glb'))
head=[o for o in bpy.context.scene.objects if o not in before and o.type=='MESH'];mount=rotation@Vector((0,-.0996,.6243))
for o in head:
 o.data.transform(o.matrix_world);o.matrix_world=Matrix.Identity(4)
 if o.name=='head_surface':
  cut(o,.35,False);finish_neck_cut(o,.35)
 o.data.transform(Matrix.Translation(mount)@Matrix.Rotation(math.radians(-15),4,'Z')@Matrix.Scale(.185,4)@Matrix.Translation(Vector((0,0,-.35))))
# Replace the malformed left hand from the intact right-hand geometry.
body_obj=bpy.data.objects.get('avatar_body')
if body_obj:
 inverse=rotation.inverted();bm=bmesh.new();bm.from_mesh(body_obj.data)
 for v in bm.verts:v.co=inverse@v.co/.83+Vector((0,.3,.72))
 hand=bm.copy()
 for point,normal,outer,inner in [((0,0,0),(1,0,0),False,True),((0,-.12,0),(0,1,0),True,False),((0,0,.85),(0,0,1),False,True)]:
  bmesh.ops.bisect_plane(hand,geom=list(hand.verts)+list(hand.edges)+list(hand.faces),dist=.000001,plane_co=point,plane_no=normal,clear_outer=outer,clear_inner=inner)
 for v in hand.verts:v.co.x=-v.co.x
 bmesh.ops.reverse_faces(hand,faces=list(hand.faces))
 mesh=bpy.data.meshes.new('Matched hand');hand.to_mesh(mesh);hand.free()
 replacement=bpy.data.objects.new('avatar_body_matched_hand',mesh);bpy.context.collection.objects.link(replacement)
 for material in body_obj.data.materials:mesh.materials.append(material)
 remove=[f for f in bm.faces if f.calc_center_median().x<.03 and f.calc_center_median().y<-.12 and f.calc_center_median().z>.75]
 bmesh.ops.delete(bm,geom=remove,context='FACES')
 for target in [bm]:
  for v in target.verts:v.co=rotation@(v.co-Vector((0,.3,.72)))*.83
 bm.to_mesh(body_obj.data);bm.free()
 mesh.transform(rotation@Matrix.Scale(.83,4)@Matrix.Translation(Vector((0,-.3,-.72))))
# Discard disconnected generation debris, preserving each continuous hand/body.
for obj in [v for v in bpy.context.scene.objects if v.type=='MESH' and v.name.startswith('avatar_body')]:
 bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
 remaining=set(bm.verts);groups=[]
 while remaining:
  vertex=remaining.pop();stack=[vertex];group=[vertex]
  while stack:
   for edge in stack.pop().link_edges:
    for neighbor in edge.verts:
     if neighbor in remaining:remaining.remove(neighbor);stack.append(neighbor);group.append(neighbor)
  groups.append(group)
 if groups:
  keep=set(max(groups,key=len));bmesh.ops.delete(bm,geom=[v for v in bm.verts if v not in keep],context='VERTS')
 bm.to_mesh(obj.data);bm.free()
source=os.path.abspath('explore/assets/source/avatar-v2.blend');bpy.ops.wm.save_as_mainfile(filepath=source)
for level,body_ratio,head_ratio,tex in [('desktop',.20,.13,2048),('mobile',.10,.065,1024)]:
 bpy.ops.wm.open_mainfile(filepath=source)
 for o in [o for o in bpy.context.scene.objects if o.type=='MESH']:
  if o.name.startswith('glasses_') or o.name=='neck_inner_collar':continue
  bpy.context.view_layer.objects.active=o;d=o.modifiers.new('Web geometry','DECIMATE');d.ratio=body_ratio if o.name.startswith('avatar_body') else head_ratio;bpy.ops.object.modifier_apply(modifier=d.name)
 # Seam-preserving typing morphs are authored after decimation so topology stays fixed.
 for o in [o for o in bpy.context.scene.objects if o.type=='MESH' and o.name.startswith('avatar_body')]:
  inverse=rotation.inverted()
  # Lift the full hand volume, including underside vertices, and blend into wrists.
  for vertex in o.data.vertices:
   raw=inverse@vertex.co/.83+Vector((0,.3,.72))
   if .90<raw.z<1.28 and raw.y<-.06 and abs(raw.x)>.025:
    forward=max(0,min(1,(-raw.y-.06)/.15));vertical=max(0,min(1,(raw.z-.90)/.035))*max(0,min(1,(1.28-raw.z)/.04))
    vertex.co.z+=.060*forward*forward*(3-2*forward)*vertical
  # Skin vertices over the physical keyboard must stay above its top surface.
  import numpy as np
  im=next(n.image for m in o.data.materials for n in m.node_tree.nodes if n.type=='TEX_IMAGE' and n.image)
  w,h=im.size;rgba=np.array(im.pixels[:],dtype=np.float32).reshape(h,w,4);uv=o.data.uv_layers.active.data
  skin_vertices=set()
  for face in o.data.polygons:
   for li in face.loop_indices:
    coord=uv[li].uv;rgb=rgba[min(h-1,int(coord.y*h)),min(w-1,int(coord.x*w)),:3]
    if rgb.min()>.20 and rgb[0]>.30:skin_vertices.add(o.data.loops[li].vertex_index)
  for index in skin_vertices:
   v=o.data.vertices[index];x=1.244+v.co.x;z=.177-v.co.y
   if .595<x<1.055 and .285<z<.790 and .10<v.co.z<.30:v.co.z=max(v.co.z,.2564)
  for face in o.data.polygons:face.use_smooth=True
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
