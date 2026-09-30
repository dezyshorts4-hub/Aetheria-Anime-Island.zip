/* 400 original villagers + 10 palace NPCs. Shared instanced geometry. */
(function(){
const people=[],N=410;const skin=['#f4d4bc','#e5b393','#cf9c7a','#f8dec9','#b98165'],hairColors=['#4d4144','#c4a778','#8b6250','#dfd8c9','#686176','#443c38'],outfits=['#8b9cb2','#a89ac1','#b38b82','#7f9b86','#b5a17a','#858eaa','#bf9cac'];
function person(id,x,z,mode,extra={}){return Object.assign({id,x,z,y:5,mode,gender:id%2,scale:.92+rand()*.18,skin:skin[id%skin.length],hair:hairColors[id%hairColors.length],cloth:outfits[id%outfits.length],phase:rand()*Math.PI*2,rot:0,speed:1+rand()*.65,dir:id%2?1:-1,talking:false,role:'villager'},extra);}
for(let i=0;i<280;i++){let row=i%10,z=-56.5+row*27+(i%3-1)*1.6;people.push(person(i,-142+rand()*284,z,'walk'));}
for(let i=280;i<340;i++){let group=groupCenters[Math.floor((i-280)/3)],a=(i%3)*Math.PI*2/3;let seated=i%3===0;people.push(person(i,seated?group.x:group.x+Math.sin(a)*2.5,seated?group.z-1.3:group.z+Math.cos(a)*2.5,seated?'sit':'chat',{rot:seated?0:a+Math.PI,group:Math.floor((i-280)/3)}));}
for(let i=340;i<365;i++){let s=shops[i-340];people.push(person(i,s.x,s.z-4,'merchant',{role:'merchant',shop:s.name}));}
for(let i=365;i<400;i++){let col=i%10,x=[-143,-117,-91,-65,-39,39,65,91,117,143][col];people.push(person(i,x,-46+Math.floor((i-365)/10)*57,'idle'));}
people.push(person(400,-8,-110,'sit',{role:'gate',gender:0,cloth:'#748997',hair:'#514747',scale:1.1}));people.push(person(401,8,-110,'sit',{role:'gate',gender:0,cloth:'#748997',hair:'#665448',scale:1.1}));
for(let i=402;i<406;i++)people.push(person(i,i%2?-9:9,i<404?-190:-195,'guard',{role:'elite',gender:0,cloth:'#455873',scale:1.17,hair:'#4e4145'}));
people.push(person(406,0,-203,'sit',{role:'king',gender:0,cloth:'#7f4057',scale:1.12,y:5.27,hair:'#806142'}));people.push(person(407,5,-202.7,'sit',{role:'queen',gender:1,cloth:'#7b668f',scale:1.07,y:5.27,hair:'#dcc393'}));people.push(person(408,-4.5,-202.3,'sit',{role:'princess',gender:1,cloth:'#b290b1',scale:.72,y:5.6,hair:'#b09168'}));people.push(person(409,3.4,-181,'accountant',{role:'accountant',gender:0,cloth:'#6e8275',hair:'#868078',scale:1.03}));
const sphere=new THREE.SphereGeometry(1,10,8),cylinder=new THREE.CylinderGeometry(1,1,1,8),boxgeo=new THREE.BoxGeometry(1,1,1),dressgeo=new THREE.CylinderGeometry(.38,1,1,14);const batches={},dummy=new THREE.Object3D(),color=new THREE.Color(),v1=new THREE.Vector3(),v2=new THREE.Vector3(),dir=new THREE.Vector3(),up=new THREE.Vector3(0,1,0),headQ=new THREE.Quaternion(),yawQ=new THREE.Quaternion(),q=new THREE.Quaternion();
function batch(name,g,count){let m=new THREE.MeshToonMaterial({color:'#ffffff'});let o=new THREE.InstancedMesh(g,m,count);o.instanceMatrix.setUsage(THREE.DynamicDrawUsage);o.frustumCulled=false;o.castShadow=false;o.receiveShadow=true;scene.add(o);batches[name]=o;return o;}
batch('heads',sphere,N);batch('hair',sphere,N);batch('backhair',sphere,N);batch('bangs',sphere,N*3);batch('eyes',new THREE.SphereGeometry(1,8,6),N*2);batch('iris',new THREE.SphereGeometry(1,8,6),N*2);batch('glints',new THREE.SphereGeometry(1,4,3),N*2);batch('brows',boxgeo,N*2);batch('mouth',sphere,N);batch('torsos',sphere,N);batch('skirts',dressgeo,N);batch('limbs',cylinder,N*8);batch('hands',sphere,N*2);batch('feet',sphere,N*2);batch('belt',sphere,N);batch('accessory',sphere,N);batch('ear',sphere,N*2);batch('crown',new THREE.CylinderGeometry(1,1,.22,12,true),3);batch('crownTips',new THREE.ConeGeometry(.12,.45,5),18);
const tmpR=new THREE.Quaternion();function stamp(name,index,a,x,y,z,sx,sy,sz,c,partQ=null){const co=Math.cos(a.rot),si=Math.sin(a.rot),s=a.scale;dummy.position.set(a.x+(x*co+z*si)*s,a.y+y*s,a.z+(z*co-x*si)*s);dummy.scale.set(sx*s,sy*s,sz*s);dummy.quaternion.setFromAxisAngle(up,a.rot);if(partQ)dummy.quaternion.multiply(partQ);dummy.updateMatrix();let b=batches[name];b.setMatrixAt(index,dummy.matrix);if(!a.colored)b.setColorAt(index,color.set(c));}
function bone(index,a,start,end,r,c){v1.set(...start);v2.set(...end);dir.copy(v2).sub(v1);let len=dir.length();q.setFromUnitVectors(up,dir.normalize());v1.add(v2).multiplyScalar(.5);stamp('limbs',index,a,v1.x,v1.y,v1.z,r,len,r,c,q);}
function pose(a,t){let sit=a.mode==='sit',walk=a.mode==='walk'&&!a.stopped,step=walk?Math.sin(t*a.speed*5+a.phase)*.58:0,speak=a.talking||a.mode==='chat',gest=speak?Math.sin(t*3+a.phase)*.24:Math.sin(t*1.3+a.phase)*.04,id=a.slot===undefined?a.id:a.slot,breath=Math.sin(t*1.6+a.phase)*.012;let hip=sit?.94:1.25,shoulder=hip+.83,headY=shoulder+.44+breath;let nod=Math.sin(t*.8+a.phase)*.016;
 // Full bodies, long skirts for women, short tunics for men.
 stamp('torsos',id,a,0,hip+.47+breath,0,.32,.48,.19,a.cloth);stamp('skirts',id,a,0,hip-.23,sit?.12:0,a.gender?.48:.31,a.gender?.78:.35,a.gender?.38:.23,a.cloth);stamp('belt',id,a,0,hip+.13,0,.326,.055,.20,['king','queen','princess'].includes(a.role)?'#d3b775':'#d4c5ab');
 const hrot=Math.sin(t*.65+a.phase)*.09;const old=a.rot;a.rot+=hrot;
 stamp('heads',id,a,0,headY,0,.25,.3,.218,a.skin);stamp('hair',id,a,0,headY+.15,-.03,.265,.22,.225,a.hair);stamp('backhair',id,a,0,headY-(a.gender?.30:.015),-.12,.26,a.gender?.55:.20,.15,a.hair);
 for(let j=0;j<3;j++)stamp('bangs',id*3+j,a,-.15+j*.15,headY+.195,.145,.075,.12,.10,a.hair);
 for(let side of [-1,1]){let k=id*2+(side>0?1:0);stamp('eyes',k,a,side*.092,headY+.008,.204,.068,.064,.013,'#fff9ec');stamp('iris',k,a,side*.094,headY,.218,.032,.05,.01,a.id%3===0?'#6867a0':'#526c77');stamp('glints',k,a,side*.094-.01,headY+.023,.228,.01,.014,.007,'#ffffff');stamp('brows',k,a,side*.095,headY+.09,.193,.075,.009,.015,a.hair);stamp('ear',k,a,side*.25,headY-.04,0,.032,.066,.038,a.skin);}
 stamp('mouth',id,a,0,headY-.123,.209,.03,a.talking?.009+Math.abs(Math.sin(t*14))*.018:.007,.008,'#b77e7b');a.rot=old;
 for(let side of [-1,1]){let k=side>0?1:0,legphase=step*side,thigh=[side*.16,hip,0],knee=sit?[side*.17,.61,.43]:[side*.16,.69,Math.sin(legphase)*.27],ankle=sit?[side*.17,.12,.48]:[side*.16,.14,Math.sin(legphase)*.48];bone(id*8+k*4,a,thigh,knee,.10,a.gender?'#e8d9c6':'#626774');bone(id*8+k*4+1,a,knee,ankle,.08,a.gender?'#efdfcb':'#626774');stamp('feet',id*2+k,a,ankle[0],ankle[1]-.01,ankle[2]+.075,.11,.105,.20,'#574c48');let elbow=[side*(.42+Math.abs(gest)*.2),shoulder-.34,speak?.08+gest:.03-legphase*.24],hand=[side*(.44+Math.abs(gest)*.35),shoulder-.69+(speak?Math.abs(gest)*1.8:0),speak?.22+gest:.09-legphase*.3];if(sit&&!speak){elbow=[side*.42,hip+.46,.03];hand=[side*.32,hip+.09,.40];}bone(id*8+k*4+2,a,[side*.29,shoulder,0],elbow,.105,a.cloth);bone(id*8+k*4+3,a,elbow,hand,.065,a.skin);stamp('hands',id*2+k,a,...hand,.058,.09,.043,a.skin);}
 let armored=a.role==='elite'||a.role==='gate';stamp('accessory',id,a,0,armored?headY+.15:hip+.45,armored?-.03:.19,armored?.28:.025,armored?.23:.04,armored?.23:.022,armored?'#b2b8b8':'#d5bb7c');
 if(['king','queen','princess'].includes(a.role)){let ci=a.id-406;stamp('crown',ci,a,0,headY+.295,0,.245,1,.215,'#e0bc65');for(let j=0;j<6;j++){let angle=j*Math.PI/3;stamp('crownTips',ci*6+j,a,Math.sin(angle)*.24,headY+.5,Math.cos(angle)*.21,.7,.65,.7,'#e0bc65');}}
 a.colored=true;
}
people.forEach(a=>pose(a,0));for(let b of Object.values(batches)){b.instanceMatrix.needsUpdate=true;if(b.instanceColor)b.instanceColor.needsUpdate=true;}
// Spears and accountant ledger are separate accessories.
for(let a of people.filter(a=>a.role==='elite'||a.role==='gate')){const spear=new THREE.Group();spear.position.set(a.x+.7,5,a.z);scene.add(spear);const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,3.4,6),mat('#83735c'));shaft.position.y=1.7;spear.add(shaft);const tip=new THREE.Mesh(new THREE.ConeGeometry(.13,.5,5),mat('#cad0ce'));tip.position.y=3.65;spear.add(tip);}
const ledger=new THREE.Mesh(new THREE.BoxGeometry(.55,.08,.4),mat('#b28d60'));ledger.position.set(3.4,6.7,-180.65);ledger.rotation.x=.4;scene.add(ledger);
let currentSpeaker=-1,soundEnabled=true,unlocked=false,lastSpeech=-20,speechUntil=0,clip=null,turn=0;const captions=$('captions');
function chooseLine(a){const female=a.gender===1;let keys=a.role==='king'?['king']:a.role==='queen'?['queen']:a.role==='princess'?['princess']:a.role==='accountant'?['accountant']:a.role==='gate'||a.role==='elite'?['guard']:a.role==='merchant'?['merchant1','merchant2']:female?['villageF1','villageF2','villageF3']:['villageM1','villageM2','villageM3'];return keys[(turn++)%keys.length];}
window.initVoices=()=>{unlocked=true; // Playback begins within a user gesture; subsequent lines follow proximity.
 window.talkNearest(true);
};
window.toggleSound=()=>{soundEnabled=!soundEnabled;$('sound').textContent=soundEnabled?'♫ Ovoz yoqilgan':'♫ Ovoz o‘chiq';if(!soundEnabled){clip?.pause();captions.hidden=true;}};$('sound').onclick=()=>{if(!unlocked)unlocked=true;window.toggleSound();};
window.talkNearest=(force=false)=>{if(!unlocked||!soundEnabled)return;let now=performance.now()/1000;if(!force&&now-lastSpeech<8)return;if(clip&&!clip.paused&&!clip.ended)return;let nearest=null,d=force?13:8;for(let a of people){let dist=Math.hypot(player.x-a.x,player.z-a.z);if(dist<d&&Math.abs(player.y-a.y)<6){d=dist;nearest=a;}}if(!nearest)return;const a=nearest,line=window.VOICE_LINES?.[chooseLine(a)];if(!line)return;clip=new Audio(line.src);clip.volume=Math.min(.9,Math.max(.22,1-d/14));lastSpeech=now;currentSpeaker=a.id;speechUntil=now+7;captions.hidden=false;const names={king:'Qirol Alden',queen:'Qirolicha Elara',princess:'Malika Mira',accountant:'Qirollik hisobchisi',gate:'Darvoza qo‘riqchisi',elite:'Qirollik gvardiyasi',merchant:a.shop||'Savdogar',villager:'Qishloq aholisi'};captions.textContent=(names[a.role]||'Qishloq aholisi')+' — “'+line.text+'”';clip.onended=()=>{speechUntil=0;currentSpeaker=-1;captions.hidden=true;};clip.play().catch(()=>{captions.textContent=line.text+' · Ovoz uchun E ni bosing';currentSpeaker=-1;});};
// Distance LOD: all 410 agents simulate; up to 120 nearby NPCs have full faces and limbs.
const lowBody=new THREE.InstancedMesh(new THREE.CylinderGeometry(.24,.30,1.4,5),new THREE.MeshLambertMaterial({color:'#ffffff'}),N);
const lowHead=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.25,0),new THREE.MeshLambertMaterial({color:'#ffffff'}),N);
lowBody.frustumCulled=lowHead.frustumCulled=false;scene.add(lowBody,lowHead);
const mult={bangs:3,eyes:2,iris:2,glints:2,brows:2,ear:2,limbs:8,hands:2,feet:2};
window.updatePeople=(dt,t,frame)=>{const now=performance.now()/1000;let near=[],far=[];
 for(let a of people){const distance=Math.hypot(player.x-a.x,player.z-a.z);a.distance=distance;a.talking=a.id===currentSpeaker&&now<speechUntil;
 if(a.mode==='walk'){a.stopped=distance<1.8;if(!a.stopped)a.x+=a.dir*a.speed*dt;if(a.x>145){a.x=145;a.dir=-1;}if(a.x< -145){a.x=-145;a.dir=1;}a.rot=a.dir>0?Math.PI/2:-Math.PI/2;}
 if(a.talking&&a.mode!=='walk')a.rot=Math.atan2(player.x-a.x,player.z-a.z);
 if(distance<75)near.push(a);else if(distance<260)far.push(a);}
 near.sort((a,b)=>a.distance-b.distance);far.push(...near.splice(120));
 for(let name of ['crown','crownTips']){let bb=batches[name];dummy.scale.setScalar(0);dummy.updateMatrix();for(let i=0;i<bb.count;i++)bb.setMatrixAt(i,dummy.matrix);}
 near.forEach((a,i)=>{a.slot=i;a.colored=false;pose(a,t);});
 for(let [name,b] of Object.entries(batches)){if(name!=='crown'&&name!=='crownTips')b.count=near.length*(mult[name]||1);b.instanceMatrix.needsUpdate=true;if(b.instanceColor)b.instanceColor.needsUpdate=true;}
 far.forEach((a,i)=>{dummy.rotation.set(0,a.rot,0);dummy.scale.setScalar(a.scale);dummy.position.set(a.x,a.y+1.2*a.scale,a.z);dummy.updateMatrix();lowBody.setMatrixAt(i,dummy.matrix);lowBody.setColorAt(i,color.set(a.cloth));dummy.position.y=a.y+2.15*a.scale;dummy.updateMatrix();lowHead.setMatrixAt(i,dummy.matrix);lowHead.setColorAt(i,color.set(a.hair));});
 for(let b of [lowBody,lowHead]){b.count=far.length;b.instanceMatrix.needsUpdate=true;if(b.instanceColor)b.instanceColor.needsUpdate=true;}
 if(clip&&!clip.paused&&currentSpeaker>=0){let a=people[currentSpeaker],d=Math.hypot(player.x-a.x,player.z-a.z);clip.volume=Math.max(0,Math.min(.9,1-d/16));if(d>20){clip.pause();currentSpeaker=-1;captions.hidden=true;}}
 ledger.rotation.z=Math.sin(t*.7)*.025;
};
window.AETHERIA.people=people;window.AETHERIA.peopleBatches=batches;
})();
