window.addEventListener('load', async () => {
   // return
   function pickRandomColor() {
      let colors = [0x6aaaaa, 0x6aaa6a, 0xaa6a6a, 0xaa6a6a, 0xfaa6a0, 0xaa0aa0];
      let rn = Math.floor(Math.random() * colors.length);
      return colors[rn];
   }
   const { app, pixics, world, size, PIXICS, b2, math } = await initPixics({
      resolution: { width: 1080, height: 1920 },
      fpsmonitor: true,
      container: document.querySelector('body'),
      gravity: { x: 0, y: -50 },
      worldscale: 100,
      scriptlist: [
         "https://pixijs.download/v6.2.1/pixi.min.js",
         "../src/pixics.js",
         "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@52eb0773a59592dc573c4bc4d0f1451676a43ef9/dist/box2d.umd.js",
      ]
   });
   const { ratio } = size;
   const { width, height } = size.actualSize;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });




   let tickness = 10 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height);
   boundary.drawRect(-width / 2, 0, tickness, height);
   boundary.drawRect(0, height / 2, width, tickness);
   boundary.drawRect(0, -height / 2, width, tickness);
   app.stage.addChild(boundary.getGraphic());

   let barLs = new Map();
   let balLs = new Map();
   let barOp = new PIXICS.ObjectPool();
   let balOp = new PIXICS.ObjectPool();
   balOp.log = true;

   pixics.update((a, b, c) => {
      if ((c % 6) === 0) {
         let odv = ((200 - barLs.size) / 80) * 2;
         for (let i = 0; i < 16 + odv; i++) {
            barOp.get(() => {
               let bar = new PIXICS.PhysicsGraphics({ world });
               bar[Symbol.for('kind')] = 'bar';
               if (Math.random() > 0.5) {
                  bar.drawRect(0, 0, width * 0.2, 100 * ratio, 0xffffff);
               } else {
                  bar.drawCircle(0, 0, 100 * ratio * 0.5, 0xffffff);
               }
               let colors = [0xfcdb03, 0xfc4103, 0xcc0000, 0xcc8f00, 0xcc0033];
               function pickRandomColor() {
                  let rn = Math.floor(Math.random() * colors.length);
                  return colors[rn];
               }

               bar.getGraphic().tint = pickRandomColor();
               bar.setDynamic();
               bar.setRestitution(0.2);
               return bar;
            }, bar => {
               bar.setActive(true);
               app.stage.addChild(bar.getGraphic());
               bar.setDynamic();
               bar.setPosition((-width * 0.25) + (Math.random() * (width * 0.5)), (-height / 2) + (60 * ratio));
               bar.setAngle(0);
               barLs.set(bar);
               setContact(bar);
            });
         }
      }
   }, -1);

   function genBal({ pos, vel, radius, first }) {
      balOp.get(() => {
         let bal = new PIXICS.PhysicsGraphics({ world });
         bal[Symbol.for('kind')] = 'bal';
         let size = 100 * ratio * 0.5;
         bal.drawRect(0, 0, size, size, 0xffffff);
         bal.getGraphic().tint = 0xdddddd;
         return bal;
      }, bal => {
         bal.setActive(true);
         app.stage.addChild(bal.getGraphic());
         bal.getGraphic().tint = first ? 0x00aeff : 0x00aeff;
         bal.radius = radius;
         bal.setDynamic()
         bal.getBody().SetLinearVelocity(vel ? vel : { x: 0, y: 0 });
         if (pos) {
            bal.setPosition(pos.x + (Math.random() * 10 * ratio), pos.y + (Math.random() * 10 * ratio));
         } else {
            bal.setPosition(0, (height / 2) + (-100 * ratio));
         }
         balLs.set(bal);
         setContact(bal);
      })
   }
   function remBal(bal) {
      if (!balLs.has(bal)) return;
      bomb(bal.getPosition());
      bal.removeAllContactEvent();
      balOp.put(bal, bal => balLs.delete(bal));
   }
   pixics.update((a, b, c) => {
      if ((c % (60 * 0.5)) === 0) {
         genBal({ radius: 0, first: true });
      }
   }, -1);

   function coll(ob, op) {
      let bal, bar;
      if (ob[Symbol.for('kind')] === 'bal') {
         bal = ob; bar = op;
      } else {
         bal = op; bar = ob;
      }
      if (!balLs.has(bal)) return;
      let radius = bal.radius;
      let pos = bal.getPosition();
      let vel = { ...bal.getBody().GetLinearVelocity() };
      remBal(bal)
      if (!barOp.put(bar, bar => barLs.delete(bar))) return;
      if (radius < 3) {
         for (let i = 0; i < 8; i++) {
            genBal({ pos, vel, radius: radius + 1 });
         }
      }
   }
   function setContact(ob) {
      let list = (ob[Symbol.for('kind')] === 'bal' ? barLs : balLs);
      [...list.keys()].forEach(op => ob.addEvent('contact', op, op => coll(ob, op)))
   }
   function bomb(pos) {
      const boom = new PIXI.Graphics();
      boom.beginFill(0xaaaaaa);
      boom.drawCircle(0, 0, width * 0.02);
      boom.endFill();
      boom.x = (width / 2) + pos.x;
      boom.y = (height / 2) + -pos.y;
      boom.alpha = 1.0;
      app.stage.addChild(boom);
      let v = 0;
      let ani = function () {
         v += 0.1; boom.alpha = 1 - v;
         boom.scale.set(1 + (v * 3), 1 + (v * 3))
         if (v > 1) { v = 1 };
         if (v === 1) { pixics.unupdate(ani); boom.parent.removeChild(boom); }
      }
      pixics.update(ani);
   }
   let speedMeter = new PIXI.Text(Math.random().toFixed(3), { fontFamily: 'Arial', fontSize: 40 * ratio, fill: 0xdddddd, align: 'center' });
   app.stage.addChild(speedMeter);
   speedMeter.x = (width - speedMeter.width) / 2;
   speedMeter.y = speedMeter.height;
   setInterval(() => {
      L(`${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(0)}MB`)
   }, 1000)


});