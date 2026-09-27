"""Editable cinematic studio. Run with Blender --background --python this_file.
All public coordinates are runtime X-right,Y-up,Z-front; p() converts to Blender.
No UI, titles, portrait, or third-party imagery is baked into this environment.
"""
import bpy, math, random, os, json
from mathutils import Vector, Matrix
import numpy as np
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'))
random.seed(23)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
def p(v): return (v[0],-v[2],v[1])
def mat(name,color,rough=.5,metal=0,emit=0):
 m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
 bs=m.node_tree.nodes.get('Principled BSDF'); bs.inputs['Base Color'].default_value=(*color,1); bs.inputs['Roughness'].default_value=rough; bs.inputs['Metallic'].default_value=metal
 if emit: bs.inputs['Emission Color'].default_value=(*color,1); bs.inputs['Emission Strength'].default_value=emit
 return m
wood=mat('Walnut • satin oiled end grain',(.11,.045,.018),.39)
plaster=mat('Graphite mineral plaster',(.22,.215,.205),.9)
stone=mat('Honed charcoal stone',(.17,.17,.16),.67)
black=mat('Powder coated graphite',(.018,.023,.027),.43,.5)
mesh=mat('Chair woven charcoal',(.035,.041,.043),.9)
metal=mat('Brushed warm aluminum',(.3,.28,.23),.28,.85)
paper=mat('Ivory page edges',(.63,.59,.49),.9)
cream=mat('Parchment linen',(.8,.66,.43),.85)
blue=mat('Blue smoked fluted glazing',(.035,.12,.19),.3,.28)
glass=mat('Lens coated glass',(.018,.048,.057),.12,.6)
leafmat=mat('Leaves • muted jade',(.018,.065,.028),.84)
warm=mat('Warm integrated lamp diffuser', (1,.48,.13),.4,0,3)
# Export-safe UV images; subtle actual material color texture, never a room backdrop.
for material,kind in [(wood,'walnut'),(plaster,'plaster'),(stone,'stone'),(mesh,'woven')]:
 n=256; yy,xx=np.mgrid[0:n,0:n]; rng=np.random.default_rng(42); noise=rng.random((n,n))
 if kind=='walnut': f=.82+.035*np.sin(yy*.65+2*np.sin(xx*.025))+.02*np.sin(yy*2.1+np.sin(xx*.04))+.035*noise
 elif kind=='woven': f=.62+.2*((xx%4<2)^(yy%4<2))+.13*noise
 else: f=.91+.065*noise+.012*np.sin(xx*.03)*np.cos(yy*.045)
 base=np.array(material.diffuse_color[:3]); data=np.ones((n,n,4),dtype=np.float32); data[:,:,:3]=np.power(f[:,:,None]*base,1/2.2)
 im=bpy.data.images.new(kind+' UV albedo',width=n,height=n); im.pixels.foreach_set(data.ravel()); im.filepath_raw=ROOT+'/explore/assets/textures/room-'+kind+'.png'; im.file_format='PNG'; im.save(); im.pack()
 tex=material.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=im; material.node_tree.links.new(tex.outputs['Color'],material.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
 # Tangent-space microstructure is a standard normal texture supported by glTF.
 gy,gx=np.gradient(f); strength=.20 if kind=='walnut' else .08
 normal=np.ones((n,n,4),dtype=np.float32); normal[:,:,0]=.5-gx*strength; normal[:,:,1]=.5-gy*strength; normal[:,:,2]=1
 ni=bpy.data.images.new(kind+' UV normal',width=n,height=n); ni.colorspace_settings.name='Non-Color';ni.pixels.foreach_set(normal.ravel());ni.filepath_raw=ROOT+'/explore/assets/textures/room-'+kind+'-normal.png';ni.file_format='PNG';ni.save();ni.pack()
 nt=material.node_tree.nodes.new('ShaderNodeTexImage');nt.image=ni;nm=material.node_tree.nodes.new('ShaderNodeNormalMap');material.node_tree.links.new(nt.outputs['Color'],nm.inputs['Color']);material.node_tree.links.new(nm.outputs['Normal'],material.node_tree.nodes.get('Principled BSDF').inputs['Normal'])
def finish(o,name,material,bevel=0):
 o.name=name; o.data.materials.append(material)
 if bevel:
  mod=o.modifiers.new('Soft manufactured edges','BEVEL'); mod.width=bevel; mod.segments=2
  bpy.context.view_layer.objects.active=o; bpy.ops.object.modifier_apply(modifier=mod.name)
  mod=o.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL'); mod.keep_sharp=True
  bpy.ops.object.modifier_apply(modifier=mod.name)
 return o
def box(name,loc,dim,material,bevel=.015):
 bpy.ops.mesh.primitive_cube_add(size=1,location=p(loc)); o=bpy.context.object; o.dimensions=(dim[0],dim[2],dim[1]); bpy.ops.object.transform_apply(location=False,rotation=False,scale=True); return finish(o,name,material,bevel)
def ball(name,loc,scale,material):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=40,ring_count=20,location=p(loc)); o=bpy.context.object; o.scale=(scale[0],scale[2],scale[1]); bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 for f in o.data.polygons:f.use_smooth=True
 return finish(o,name,material)
def rod(name,a,b,r,material,vertices=12):
 a,b=Vector(p(a)),Vector(p(b)); d=b-a; bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=r,depth=d.length,location=(a+b)/2); o=bpy.context.object; o.rotation_euler=d.to_track_quat('Z','Y').to_euler()
 for f in o.data.polygons:f.use_smooth=True
 return finish(o,name,material)
def tube(name,points,r,material):
 curve=bpy.data.curves.new(name,'CURVE');curve.dimensions='3D';curve.bevel_depth=r;curve.bevel_resolution=4;curve.use_fill_caps=True
 spline=curve.splines.new('POLY');spline.points.add(len(points)-1)
 for v,co in zip(spline.points,points):v.co=(*p(co),1)
 o=bpy.data.objects.new(name,curve);bpy.context.collection.objects.link(o)
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o;bpy.ops.object.convert(target='MESH')
 for f in o.data.polygons:f.use_smooth=True
 return finish(o,name,material)
def group(name,objects):
 bpy.ops.object.select_all(action='DESELECT')
 for o in objects:o.select_set(True)
 bpy.context.view_layer.objects.active=objects[0]; bpy.ops.object.join(); objects[0].name=name; return objects[0]
def capture(fn):
 before=set(bpy.data.objects); fn(); return list(set(bpy.data.objects)-before)
def area(name,loc,target,power,color,size):
 d=bpy.data.lights.new(name,'AREA'); d.energy=power; d.color=color; d.shape='DISK'; d.size=size; o=bpy.data.objects.new(name,d); bpy.context.collection.objects.link(o); o.location=p(loc); o.rotation_euler=(Vector(p(target))-o.location).to_track_quat('-Z','Y').to_euler()
# Architecture and tiled floor
box('floor', (0,-.085,.05),(7.2,.16,5.5),stone,.02)
for x in range(-4,5):box('Stone tile joint',(x*.82,-.002,.05),(.005,.004,5.5),black,0)
for z in range(-3,4):box('Stone tile joint',(0,-.001,z*.82),(7.2,.004,.005),black,0)
box('Rear plaster wall',(-1.43,1.8,-2.5),(4.3,3.6,.15),plaster)
box('Left plaster return',(-3.58,1.8,-.5),(.15,3.6,4.1),plaster)
box('Rear skirting',(-1.4,.07,-2.405),(4.3,.14,.04),black,.004)
box('Left skirting',(-3.49,.07,-.5),(.04,.14,4.1),black,.004)
box('Window blue glazing',(2.02,1.96,-2.5),(2.84,3.22,.065),blue,.002)
for x in [0.6,3.45]:box('Window frame',(x,1.96,-2.42),(.075,3.32,.13),black,.007)
for y in [.32,2.9,3.58]:box('Window transom',(2.02,y,-2.42),(2.9,.07,.13),black,.007)
for i in range(65):rod('Vertical fluted glass rib',(.66+i*.043, .36,-2.445),(.66+i*.043,3.54,-2.445),.009,blue,8)
box('Window sill',(2.03,.31,-2.30),(3,.065,.4),stone,.014)
# Desk: slab, steel underframe, true feet
parts=[box('desk slab',(.25,.78,-.05),(2.05,.065,.85),wood,.018)]
for x in [-.62,1.12]:
 parts.append(box('Steel trestle',(x,.39,-.05),(.055,.73,.055),black,.008))
 parts.append(box('Desk cross foot',(x,.045,-.05),(.10,.055,.78),black,.009))
parts.append(box('Desk apron',(.25,.692,-.13),(1.82,.1,.04),black,.006)); group('desk',parts)
# Monitor frame, stand and a separate front-facing UV screen.
yaw=math.radians(30); center=Vector((.05,1.25,-.12))
def moncoord(v): return (center.x+v[0]*math.cos(yaw)+v[2]*math.sin(yaw),center.y+v[1],center.z-v[0]*math.sin(yaw)+v[2]*math.cos(yaw))
o=box('Monitor slim bezel',center,(.69,.45,.04),black,.012); o.rotation_euler.z=yaw
box('Monitor stand foot',(.05,.823,-.19),(.30,.022,.20),metal,.016)
rod('Monitor stand',(.05,.83,-.2),(.05,1.13,-.18),.023,black)
verts=[p(moncoord(v)) for v in [(-.32,-.20,.023),(.32,-.20,.023),(.32,.20,.023),(-.32,.20,.023)]]
me=bpy.data.meshes.new('Screen 16x10 UV'); me.from_pydata(verts,[],[(0,1,2,3)]); me.uv_layers.new()
for l,uv in zip(me.uv_layers.active.data,[(0,0),(1,0),(1,1),(0,1)]):l.uv=uv
ob=bpy.data.objects.new('monitor_screen',me); bpy.context.collection.objects.link(ob); ob.data.materials.append(mat('Screen • runtime image',(.022,.033,.035),.8))
# Keyboard and mouse, arranged for seated person's hands
box('Keyboard aluminum case',(.3,.823,.18),(.52,.025,.18),metal,.009)
keys=[]
for row in range(5):
 for col in range(15):keys.append(box('Keycap',(.064+col*.034,.843,.112+row*.03),(.029,.011,.024),black,.003))
group('keyboard_keys',keys)
# Manufactured mouse: continuous domed shell, separate buttons and recessed wheel.
rubber=mat('Soft touch graphite',(.022,.026,.030),.66)
parts=[ball('Mouse lower shell',(.69,.829,.19),(.037,.015,.058),black),
       ball('Mouse palm shell',(.69,.841,.213),(.036,.022,.035),rubber)]
for x in [.672,.708]:
 o=ball('Mouse click paddle',(x,.842,.164),(.0172,.017,.029),rubber); parts.append(o)
parts.append(box('Mouse wheel recess',(.69,.847,.16),(.010,.006,.028),black,.003))
parts.append(rod('Mouse scroll wheel',(.686,.853,.16),(.694,.853,.16),.010,metal,32))
for z in [.151,.155,.159,.163,.167]:
 parts.append(rod('Mouse wheel knurl',(.686,.859,z),(.694,.859,z),.0007,rubber,8))
group('mouse',parts)
# Ergonomic chair: curved upholstery shares its edge path with the supporting frame.
# Runtime coordinates are metres. Each rail terminates inside a structural mount.
parts=[ball('Seat upholstery',(.8,.49,.79),(.277,.062,.241),mesh),
       box('Seat structural pan',(.8,.455,.79),(.48,.035,.40),black,.016),
       box('Tilt mechanism',(.8,.405,.8),(.18,.075,.19),black,.02),
       rod('Gas lift',(.8,.16,.8),(.8,.425,.8),.029,metal,32),
       rod('Lift sleeve',(.8,.13,.8),(.8,.31,.8),.040,black,32)]
for i in range(5):
 a=i*2*math.pi/5; end=(.8+math.sin(a)*.32,.115,.8+math.cos(a)*.32)
 parts.append(rod('Star base spoke',(.8,.18,.8),end,.023,black,24))
 parts.append(rod('Caster swivel',end,(end[0],.068,end[2]),.014,metal,20))
 for dx in [-.024,.024]:
  parts.append(rod('Twin caster tire',(end[0]+dx-.010,.048,end[2]),(end[0]+dx+.010,.048,end[2]),.044,rubber,32))
  parts.append(rod('Caster hub',(end[0]+dx-.0105,.048,end[2]),(end[0]+dx+.0105,.048,end[2]),.019,black,24))
# Closed curved perimeter, with lumbar bow and recline integrated in the surface.
def backpoint(u,t):
 width=.222+.018*math.sin(math.pi*t)
 return (.8+u*width,.60+t*.49,1.055+.094*t-.032*math.sin(math.pi*t)+.024*u*u)
verts=[p(backpoint(-1+2*i/24,j/24)) for j in range(25) for i in range(25)]
faces=[(j*25+i,j*25+i+1,(j+1)*25+i+1,(j+1)*25+i) for j in range(24) for i in range(24)]
me=bpy.data.meshes.new('Contoured woven back');me.from_pydata(verts,[],faces);me.uv_layers.new()
for poly in me.polygons:
 poly.use_smooth=True
 for li in poly.loop_indices:
  vi=me.loops[li].vertex_index;me.uv_layers.active.data[li].uv=(vi%25/24,vi//25/24)
o=bpy.data.objects.new('Contoured back upholstery',me);bpy.context.collection.objects.link(o);finish(o,o.name,mesh)
mod=o.modifiers.new('Upholstery thickness','SOLIDIFY');mod.thickness=.017;bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name);parts.append(o)
for u in [-1,1]:
 parts.append(tube('Back perimeter',[backpoint(u,j/24) for j in range(25)],.015,black))
 for a,b in [((.8+u*.19,.455,.88),(.8+u*.215,.55,1.06)),((.8+u*.215,.55,1.06),backpoint(u,.18))]:parts.append(rod('Back seat bracket',a,b,.023,black,20))
for t in [0,1]:
 parts.append(tube('Back perimeter',[backpoint(-1+2*i/24,t) for i in range(25)],.015,black))
for x in [.51,1.09]:
 parts.append(rod('Arm seat bracket',(.8+(x-.8)*.65,.445,.84),(x,.47,.84),.024,black,24))
 parts.append(rod('Arm riser',(x,.47,.84),(x,.704,.84),.022,black,24))
 parts.append(box('Arm pad',(x,.715,.78),(.083,.037,.27),rubber,.018))
parts.append(rod('Headrest spine',(.8,1.055,1.17),(.8,1.21,1.19),.019,black,24))
parts.append(ball('Headrest padded cushion',(.8,1.205,1.18),(.137,.064,.040),mesh))
group('chair',parts)
# Record cabinet top surface kept empty for separate interactive turntable
parts=[box('console carcass',(-2,.48,1.6),(1.55,.70,.70),wood,.016),box('console top',(-2,.839,1.6),(1.60,.026,.74),wood,.01)]
for x in [-2.65,-1.35]:
 for z in [1.34,1.86]:parts.append(rod('Console foot',(x,.025,z),(x,.15,z),.024,black))
for x in [-2.39,-1.61]:
 parts.append(box('Console inset door',(x,.48,1.963),(.752,.60,.028),wood,.006)); parts.append(box('Recessed finger pull',(x,.73,1.984),(.32,.012,.012),black,.002))
group('record_console',parts)
# Floating shelves / neutral books, no invented covers or text
covers=[mat('Book cloth '+str(i),c,.9) for i,c in enumerate([(.16,.22,.23),(.26,.16,.10),(.40,.37,.30),(.07,.085,.09)])]
for y in [1.0,1.69,2.38]:
 box('Walnut floating shelf',(-1.65,y,-2.14),(2.35,.05,.49),wood,.009)
 box('Shelf warm diffuser',(-1.65,y-.03,-1.95),(2.18,.012,.015),warm,.003)
 for x in [-2.55,-.74]:box('Shelf bracket',(x,y-.10,-2.25),(.025,.2,.24),black,.005)
 for i in range(12):
  x=-2.68+i*.072; h=random.uniform(.22,.38); w=random.uniform(.041,.06)
  parts=[box('Book cover',(x,y+.026+h/2,-2.11),(w,h,.25),random.choice(covers),.003),box('Page block',(x,y+.026+h/2,-2.095),(w-.009,h-.016,.235),paper,.001)]
  parts.append(box('Blank cloth spine',(x,y+.026+h/2,-1.978),(w,h,.012),parts[0].data.materials[0],.002))
  for by in [.052,h-.05]:
   parts.append(box('Book binding seam',(x,y+.026+by,-1.970),(w-.006,.0025,.0015),paper,0))
  book=group('book_01' if y==1 and i==0 else 'book_%s_%s'%(y,i),parts)
  if i in (3,7,11):book.rotation_euler.y=math.radians(random.choice([-4,3,5]))
# Side credenza behind chair at window
box('Window credenza',(2.1,.48,-1.87),(1.85,.70,.51),wood,.012)
box('Window credenza top',(2.1,.85,-1.87),(1.91,.045,.56),wood,.01)
for x in [1.28,2.92]:
 for z in [-2.06,-1.69]:rod('Credenza leg',(x,.03,z),(x,.17,z),.025,black)
for x in [1.48,2.10,2.72]:box('Credenza inset door',(x,.48,-1.605),(.60,.61,.018),wood,.004)
# Lamps: linen cylinder / brass structure and dome task lamp
rod('Console lamp stem',(-2.60,.86,1.48),(-2.60,1.26,1.48),.014,metal)
rod('Console lamp base',(-2.60,.854,1.48),(-2.60,.885,1.48),.10,black,32)
rod('Linen lamp shade',(-2.60,1.12,1.48),(-2.60,1.43,1.48),.115,cream,40)
ball('Console lamp luminous cap',(-2.6,1.12,1.48),(.106,.015,.106),warm)
rod('Desk lamp base',(-1.0,.814,-.18),(-1.0,.84,-.18),.10,black,32)
rod('Task lamp lower',(-1,.84,-.18),(-1.06,1.19,-.22),.014,metal)
rod('Task lamp arm',(-1.06,1.19,-.22),(-.90,1.42,-.18),.014,metal)
ball('Task lamp shade',(-.90,1.40,-.18),(.125,.069,.125),black)
ball('Task lamp diffuser',(-.90,1.342,-.18),(.071,.008,.071),warm)
for loc in [(-1.06,1.19,-.22),(-.90,1.42,-.18)]:ball('Task lamp hinge',loc,(.022,.022,.022),black)
rod('Orb lamp foot',(2.67,.88,-1.9),(2.67,.92,-1.9),.085,metal,24)
ball('Frosted warm globe',(2.67,1.02,-1.9),(.105,.105,.105),warm)
# Camera with lens concentric rings and tactile controls
parts=[box('Camera body',(1.75,.955,-1.8),(.21,.135,.075),black,.016),box('Camera top',(1.75,1.03,-1.8),(.085,.04,.07),black,.008)]
for r,z0,z1,ma in [(.052,-1.77,-1.69,black),(.048,-1.69,-1.673,metal),(.044,-1.673,-1.666,glass)]:parts.append(rod('Camera lens',(1.75,.965,z0),(1.75,.965,z1),r,ma,32))
parts.append(rod('Shutter dial',(1.82,1.024,-1.8),(1.82,1.043,-1.8),.022,metal,16)); group('camera_prop',parts)
# Mug and desk notebook
rod('Coffee mug',(-.10,.815,-.16),(-.10,.925,-.16),.04,black,24)
bpy.ops.mesh.primitive_torus_add(major_segments=20,minor_segments=8,location=p((-.052,.87,-.16)),major_radius=.026,minor_radius=.006,rotation=(math.pi/2,0,0));finish(bpy.context.object,'Mug handle',black)
box('Closed notebook',(.92,.826,-.19),(.27,.028,.19),covers[0],.006)
# Botanically structured leaves: tapered diamond meshes with folded central ridge.
def plant(name,loc,height):
 x,y,z=loc; parts=[rod('Ceramic planter',(x,y,z),(x,y+.21,z),.13,stone,24)]
 for j in range(9):
  a=j*2.4; top=(x+math.sin(a)*.13,y+.22+height*(.55+random.random()*.45),z+math.cos(a)*.13)
  parts.append(rod('Plant branch',(x,y+.15,z),top,.004,black,7))
  for k in range(4):
   t=.35+k*.19; origin=(x+(top[0]-x)*t,y+.19+(top[1]-y-.19)*t,z+(top[2]-z)*t); angle=a+k*2.1
   length=.15; end=(origin[0]+math.sin(angle)*length,origin[1]+.045,origin[2]+math.cos(angle)*length)
   coords=[];faces=[];axis=Vector(end)-Vector(origin);side=Vector((math.cos(angle),0,-math.sin(angle)))
   for row in range(13):
    t=row/12;center=Vector(origin)+axis*t;center.y+=.025*math.sin(math.pi*t)-.02*t*t
    width=.036*math.sin(math.pi*t)**.75
    for column in range(5):
     u=(column-2)/2;v=center+side*(width*u);v.y-=.012*abs(u)*math.sin(math.pi*t);coords.append(p(v))
   for row in range(12):
    for column in range(4):
     a0=row*5+column;faces.append((a0,a0+1,a0+6,a0+5))
   me=bpy.data.meshes.new('Curved elliptical leaf');me.from_pydata(coords,[],faces);me.update();o=bpy.data.objects.new('Leaf',me);bpy.context.collection.objects.link(o);o.data.materials.append(leafmat)
   for face in me.polygons:face.use_smooth=True
   parts.append(o)
 return group(name,parts)
plant('Desk plant',(-1.12,.817,.14),.28)
plant('Window plant',(2.99,.875,-1.95),.85)
plant('Shelf plant',(-.89,2.41,-2.1),.37)
# A pair of blank architectural pinboards, intentionally without invented artwork.
for z in [-1.46,-.58]:
 box('Gallery aluminum frame',(-3.475,1.96,z),(.038,1.16,.72),metal,.006)
 box('Blank gallery insert',(-3.449,1.96,z),(.006,1.124,.686),black,.001)
# Fine vertical acoustic timber strip in the left architectural reveal.
for z in [-2.22+i*.058 for i in range(8)]:
 box('Acoustic walnut slat',(-3.473,1.79,z),(.045,3.3,.025),wood,.004)
# Rug, tessellated trim and cable tray
box('Woven studio rug',(.25,.009,1.0),(2.9,.015,2.15),mesh,.025)
box('Cable management tray',(0,.665,-.27),(1.4,.035,.14),black,.005)
# Approved revised staging: diagonal working posture keeps face and monitor legible.
def stage(o,old,new,yaw):
 transform=Matrix.Translation(Vector(p(new))) @ Matrix.Rotation(math.radians(yaw),4,'Z') @ Matrix.Translation(-Vector(p(old)))
 o.matrix_world=transform @ o.matrix_world
# Move left-end accessories inward without stretching their shapes.
for o in list(bpy.context.scene.objects):
 if o.name.startswith(('Task lamp','Desk lamp','Desk plant')):o.location.x+=.5
 if o.name.startswith(('Coffee mug','Mug handle')):o.location.x+=.45; o.location.y-=.36
bpy.context.view_layer.update()
prefixes=('Monitor','monitor_screen','Keyboard','keyboard_keys','mouse','Task lamp','Desk lamp','Coffee mug','Mug handle','Closed notebook','Desk plant','Cable management')
for o in list(bpy.context.scene.objects):
 if o.name=='desk' or o.name.startswith(prefixes):stage(o,(0,0,-.05),(-.05,0,1.05),40)
stage(bpy.data.objects['chair'],(.8,0,.79),(1.244,0,.177),130)
# Keyboard faces the seated person; its center matches the measured hand contact area.
for o in list(bpy.context.scene.objects):
 if o.name.startswith(('Keyboard','keyboard_keys')):stage(o,(.324044,0,1.025940),(.825,0,.537),90)
# Mouse belongs at the seated person's right hand: mirrored across the keyboard's
# left-right plane (desk staging had left it on the person's left, screen-front side).
bpy.data.objects['mouse'].location+=Vector(p((-.121,0,-.194)))
bpy.context.view_layer.update()

# Seat the character at the long edge; keep the measured keyboard/hand contact fixed.
stage(bpy.data.objects['desk'],(.1415,0,.8893),(.55,0,.77),90)
for o in list(bpy.context.scene.objects):
 if o.name.startswith(('Monitor','monitor_screen')):stage(o,(-.035,0,.972),(.43,0,.87),40)
 if o.name.startswith(('Task lamp','Desk lamp')):o.location+=Vector(p((1.086,0,-.972)))
 if o.name.startswith('Desk plant'):o.location+=Vector(p((.383,0,-1.424)))
 if o.name.startswith(('Coffee mug','Mug handle')):o.location+=Vector(p((.801,0,-.016)))
 if o.name.startswith('Cable management'):stage(o,(.1415,0,.8893),(.55,0,.77),90)
bpy.context.view_layer.update()

group('task_lamp',[o for o in list(bpy.context.scene.objects) if o.name.startswith(('Task lamp','Desk lamp'))])

# Join architecture accents by material to keep exported draw calls practical while retaining named hero objects.
keep={'task_lamp','desk','chair','record_console','monitor_screen','camera_prop','keyboard_keys','mouse','Desk plant','Window plant','Shelf plant','book_01'}
for ma in list(bpy.data.materials):
 obs=[o for o in list(bpy.context.scene.objects) if o.type=='MESH' and o.name not in keep and not o.name.startswith('book_') and len(o.data.materials)==1 and o.data.materials[0]==ma]
 if len(obs)>1:group('room_detail_'+ma.name,obs)
books=[o for o in list(bpy.context.scene.objects) if o.type=='MESH' and o.name.startswith('book_') and o.name!='book_01']
group('library_books',books)
# Meaningful origins allow runtime hotspots and object transforms to use world position.
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.context.scene.objects:
 if o.type=='MESH':o.select_set(True)
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY',center='BOUNDS')
# Lighting for editable source and inspection. Runtime should recreate these intentional lights.
area('Warm desk key',(-1.8,2.7,1.1),(0,.7,0),230,(1,.65,.37),2.5)
area('Cool window fill',(2.1,2.5,-2.10),(.5,1,.5),300,(.32,.58,1),2.3)
area('Front soft fill',(1.5,3.3,3.5),(0,.8,0),220,(.77,.83,1),4)
area('Shelf wash',(-1.6,2.2,-1.85),(-1.6,1.6,-2.4),50,(1,.48,.15),1.2)
scene=bpy.context.scene; scene.world.color=(.16,.16,.16)
bpy.ops.object.camera_add(location=p((4.6,2.5,5.7)));cam=bpy.context.object;cam.name='Overview camera • runtime contract';cam.rotation_euler=(Vector(p((-.15,1.3,.6)))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='PERSP';cam.data.lens=45;scene.camera=cam
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.render.resolution_x=1400;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.render.image_settings.file_format='PNG';scene.render.filepath=ROOT+'/artifacts/portfolio-rebuild/room-inspection/room-overview.png'
bpy.ops.wm.save_as_mainfile(filepath=ROOT+'/explore/assets/source/studio-room-day-night.blend')
bpy.ops.object.select_all(action='DESELECT')
for o in scene.objects:
 if o.type=='MESH':o.select_set(True)
bpy.ops.export_scene.gltf(filepath=ROOT+'/explore/assets/room-day-night.glb',export_format='GLB',use_selection=True,export_apply=True,export_yup=True,export_texcoords=True,export_normals=True,export_materials='EXPORT',export_cameras=False,export_lights=False)
tris=sum(len(o.data.polygons) for o in scene.objects if o.type=='MESH');print('ROOM_STATS',json.dumps({'polygons':tris,'mesh_objects':len([o for o in scene.objects if o.type=='MESH']),'materials':len(bpy.data.materials),'glb_bytes':os.path.getsize(ROOT+'/explore/assets/room-day-night.glb')}))
if os.environ.get('STUDIO_RENDER')=='1':bpy.ops.render.render(write_still=True)
