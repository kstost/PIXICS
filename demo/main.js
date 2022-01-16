window.addEventListener('load', async () => {

   const { app, pixics, world, size, PIXICS, b2, math } = await initPixics({
      resolution: { width: 1080, height: 1920 },
      fpsmonitor: true,
      container: document.querySelector('body'),
      gravity: { x: 0, y: -30 },
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

   //------------------------------
   // let ddd;
   // ddd = new Promise(rrr => {
   //    // rrr()
   // });
   // (async()=>{
   //    await ddd;
   //    console.log(123);
   // })();
   // Promise.resolve(ddd)
   // console.log(ddd);
   // console.log(aaa);
   //------------------------------
   L('메인 코드의 시작');

   L('붉은막대 생성');
   let redbar = new PIXICS.PhysicsGraphics({ world });
   redbar.drawRect(0, 0, 1000 * ratio, 230 * ratio);
   redbar.getGraphic().tint = 0xaa0000;
   app.stage.addChild(redbar.getGraphic());

   L('중력 영향 받는 요소생성');
   let ball = new PIXICS.PhysicsGraphics({ world });
   ball.drawCircle(0, 0, 100 * ratio);
   ball.getGraphic().tint = 0xddaa00;
   app.stage.addChild(ball.getGraphic());
   ball.setPosition(0, 1920 * 0.25 * ratio)
   ball.setDynamic()

   let prm = redbar.moveEaseBy(0, 1920 * 0.4 * ratio, 3000, 'easeInOutQuad');
   (async () => {
      console.log(await prm)
   })();
   // setTimeout(() => prm.abort(), 1000)
   setTimeout(() => redbar.destroy(), 1000)
   // console.log(prm);
   // L('붉은 막대를 계속 움직여주는 작동을 한다. 이 작동은 무한히 반복된다');
   // // 이동할 거리값에 ratio 를 붙이는것을 잊지말자
   // while (true) {
   //    // L('위로');
   //    // L(await redbar.moveEaseBy(0, -1920 * 0.1 * ratio, 300, 'easeInOutQuad'));
   //    // L('아래로');
   //    const prm = redbar.moveEaseBy(0, 1920 * 0.1 * ratio, 1000, 'easeInOutQuad');
   //    // L(await );
   //    setTimeout(() => prm.abort(), 200)
   //    L(JSON.stringify(await prm));
   // }


   return

   class Bar {
      constructor({ width }) {
         this.width = width;
         let _static = new PIXICS.PhysicsGraphics({ world });
         _static.drawRect(0, 0, this.width, 30 * ratio, 0xffffff);
         _static.getGraphic().tint = 0x00ff00;
         app.stage.addChild(_static.getGraphic());
         this.pg = _static;
      }
      run() {
         this.pg.setUpdate(e => {
            console.log(e)
         });
      }
      set pos(pos) {
         this.pg.setPosition((this.width * pos) + (-width / 2) + this.width / 2, 0)
      }
   }
   let bar = new Bar({ width: width / 4 });
   bar.pos = 1;

   // bar.run()

   // let dd=
   console.log(bar.pg.moveEaseBy(0, -1920 * 0.2 * ratio, 1000, 'easeOutElastic'))
   await pixics.sleep(2001)
   console.log(bar.pg.moveEaseBy(0, -1920 * 0.2 * ratio, 1000, 'easeOutElastic'))
   // console.log(bar.pg.moveEaseBy(0, -1920 * 0.2 * ratio, 400, 'easeOutElastic'))
   // bar.pg.rotateEaseBy(Math.PI, 40000, 'easeOutElastic');

   // bar.pg.moveEaseBy(-1920 * 0.1 * ratio, 0, 2000, 'easeInQuad');
   // await bar.pg.moveEaseBy(0, -1920 * 0.1 * ratio, 2000, 'easeInQuad');

   // await pixics.update(async function (deltatime, resolver, accumulator) {
   //    if (!(accumulator % 60)) {
   //       await bar.pg.moveEaseBy(0, -1920 * 0.1 * ratio, 2000, 'easeInQuad');
   //       // console.log(1);
   //    }
   // })
   // await bar.pg.setUpdate(function (deltatime, resolver, accumulator) {
   //    // cnt += v;
   //    // 0 && console.log(Math.floor(cnt / 60), new Date() - tm)
   //    // console.log(p);
   //    // p()
   //    console.log(accumulator);
   //    if (accumulator === 60) resolver()
   //    // console.log((p - 1) % 2);
   // }, 50);
   // console.log(123)



});