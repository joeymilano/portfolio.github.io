import bpy,sys,os,json
from mathutils import Vector
source=sys.argv[sys.argv.index('--')+1]
out=os.path.dirname(source)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=source)
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@Vector(c) for o in meshes for c in o.bound_box]
lo=Vector(tuple(min(p[i] for p in points) for i in range(3)));hi=Vector(tuple(max(p[i] for p in points) for i in range(3)))
print('HEAD_BOUNDS',list(lo),list(hi))
print('HEAD_MATERIALS',[(m.name,[(n.type,n.image.name if n.type=='TEX_IMAGE' and n.image else '') for n in m.node_tree.nodes]) for m in bpy.data.materials if m.use_nodes])
center=(lo+hi)/2;size=hi-lo
sc=bpy.context.scene;sc.render.engine='CYCLES';sc.cycles.samples=16;sc.render.resolution_x=1000;sc.render.resolution_y=1000;sc.render.resolution_percentage=100;sc.world.color=(.25,.25,.25);sc.view_settings.view_transform='Standard';sc.view_settings.look='None'
for pos,power in [((1,-2,2),100),((-2,-1,1),60)]:
 d=bpy.data.lights.new('Softbox','AREA');d.energy=power;d.size=3;o=bpy.data.objects.new('Softbox',d);sc.collection.objects.link(o);o.location=center+Vector(pos);o.rotation_euler=(center-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.type='ORTHO';cam.data.ortho_scale=max(size)*1.15;sc.camera=cam
for name,pos in [('front',(0,-3,0)),('three-quarter',(2,-3,0)),('side',(3,0,0))]:
 cam.location=center+Vector(pos);cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler();sc.render.filepath=os.path.join(out,'inspect-'+name+'.png');bpy.ops.render.render(write_still=True)
