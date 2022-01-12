let balls = [];
let goals = [];
window.addEventListener('load', async () => {

   const PIXICS = pixiInst();
   const display = PIXICS.displaySystem([1080, 1920], true, document.body); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   display.container.appendChild(app.view);
   const gravity = { x: 0, y: -10 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(130, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;

   function makePlanet(pos) {
      let gravitationalInfluence = new PIXICS.PhysicsGraphics({ world });
      gravitationalInfluence.getGraphic().alpha = 0.2;
      gravitationalInfluence.drawCircle(pos.x, pos.y, (pos.radius * 30));
      gravitationalInfluence.setSensor(true)
      gravitationalInfluence.setUpdate(() => {
         gravitationalInfluence.setAngle(planet.getAngle());
         let center = planet.getBody().GetWorldPoint(planet.getFixtures()[0].GetShape().m_p, new b2.Vec2());
         gravityCenter.setPosition(center.x * PIXICS.worldscale, center.y * PIXICS.worldscale)
      })
      app.stage.addChild(gravitationalInfluence.getGraphic());

      function getCenter() {
         let center = planet.getBody().GetWorldPoint(planet.getFixtures()[0].GetShape().m_p, new b2.Vec2());
         return {
            x: center.x * PIXICS.worldscale,
            y: center.y * PIXICS.worldscale
         }
      }

      let planet = new PIXICS.PhysicsGraphics({ world });
      planet.getGraphic().alpha = 1;
      planet.getGraphic().tint = 0xffffaa;
      planet.drawCircle(pos.x, pos.y, (pos.radius));
      app.stage.addChild(planet.getGraphic());

      let gravityCenter = new PIXICS.PhysicsGraphics({ world });
      gravityCenter.getGraphic().alpha = 1;
      gravityCenter.getGraphic().tint = 0xaa00ff;
      gravityCenter.drawCircle(0, 0, pos.radius * 0.2 * ratio);
      app.stage.addChild(gravityCenter.getGraphic());
      if (pos.start !== undefined) {
         planet.setAngle(pos.start);
         (async () => {
            while (true) {
               await planet.rotateEaseBy(pos.speed, 400, '');
            }
         })();
      }

      return {
         getCenter,
         gravitationalInfluence,
         planet,
         radius: pos.radius
      }
   }
   let planets = [
      makePlanet({ color: 0x00ffdd, x: 0, y: 0, radius: 7 * ratio, speed: 1 * ratio, start: 0 }),
      makePlanet({ color: 0x00ffdd, x: 600 * ratio, y: 0, radius: 5 * ratio, speed: 0.5 * ratio, start: Math.PI * 2 * Math.random() }),
      makePlanet({ color: 0x00ffdd, x: 200 * ratio, y: 0, radius: 6 * ratio, speed: 0.6 * ratio, start: Math.PI * 2 * Math.random() }),
      makePlanet({ color: 0x00ffdd, x: 300 * ratio, y: 0, radius: 7 * ratio, speed: 0.7 * ratio, start: Math.PI * 2 * Math.random() }),
      makePlanet({ color: 0x00ffdd, x: 400 * ratio, y: 0, radius: 8 * ratio, speed: 0.8 * ratio, start: Math.PI * 2 * Math.random() }),
      makePlanet({ color: 0x00ffdd, x: 500 * ratio, y: 0, radius: 9 * ratio, speed: 0.9 * ratio, start: Math.PI * 2 * Math.random() }),
   ]

   let rocket = new PIXICS.PhysicsGraphics({ world });
   rocket.getGraphic().alpha = 1;
   rocket.drawCircle(0, 0, 5 * ratio);
   rocket.setPosition(50 * ratio, -800 * ratio)
   rocket.setGravityScale(0)
   rocket.setDynamic();

   planets.forEach(_planet => {
      let { gravitationalInfluence, planet, getCenter, radius } = _planet;
      let pin = { force: radius * 0.01, pos: getCenter };
      gravitationalInfluence.addEvent('contact', rocket, function (rocket) { rocket.setPinGravity(pin); });
      gravitationalInfluence.addEvent('untact', rocket, function (rocket) { rocket.remPinGravity(pin); });

      planet.addEvent('contact', rocket, function (rocket) {
         let pos = rocket.getPosition();
         const boom = new PIXI.Graphics();
         boom.beginFill(0xff0000);
         boom.drawCircle(0, 0, width * 0.02);
         boom.endFill();
         boom.x = (width / 2) + pos.x;
         boom.y = (height / 2) + -pos.y;
         boom.alpha = 1.0;
         app.stage.addChild(boom);
         rocket.destroy();
         let v = 0;
         let ani = function () {
            v += 0.02;
            boom.alpha = 1 - v;
            boom.scale.set(1 + (v * 3), 1 + (v * 3))
            if (v > 1) { v = 1 };
            if (v === 1) {
               pixics.unupdate(ani);
            }
         }
         pixics.update(ani);
      });
   });
   app.stage.addChild(rocket.getGraphic());

   let speedMeter = new PIXI.Text('행성의 중력의 도움을 받아 푸른색 행성으로 도착해주세요', { fontFamily: 'Arial', fontSize: 40 * ratio, fill: 0xdddddd, align: 'center' });
   app.stage.addChild(speedMeter);
   speedMeter.x = (width - speedMeter.width) / 2;
   speedMeter.y = height - speedMeter.height - 20 * ratio;

   for (let i = 0; i < 0; i++) {
      const pan = new PIXI.Graphics();
      pan.beginFill(0xffffff);
      pan.drawCircle(0, 0, width * 0.0015);
      pan.endFill();
      pan.x = Math.random() * width;
      pan.y = Math.random() * height;
      pan.interactive = true;
      app.stage.addChild(pan);
   }

   let goal = new PIXICS.PhysicsGraphics({ world });
   goal.getGraphic().alpha = 1;
   goal.getGraphic().tint = 0x0088aa;
   goal.drawCircle(0, 0, 100 * ratio);
   goal.setPosition(0, height / 2);
   goal.setSensor(true);
   app.stage.addChild(goal.getGraphic());
   goal.addEvent('contact', rocket, function (rocket) {
      Swal.fire({
         icon: 'success',
         title: '무사히 도착!',
         text: '성공',
         footer: '<a href="https://www.youtube.com/channel/UCRpOIr-NJpK9S483ge20Pgw" target="_blank">유튜브 코드깎는노인 구독해주세요</a>'
      }).then(async (result) => {
         if (result.isConfirmed) {
         }
      })
   });

   const screenButton = new PIXI.Graphics();
   screenButton.beginFill(0xffffff);
   screenButton.drawRect(0, 0, width, height);
   screenButton.endFill();
   screenButton.x = 0;
   screenButton.y = 0;
   screenButton.alpha = 0.1;
   screenButton.interactive = true;
   app.stage.addChild(screenButton);
   ['touchstart', 'mousedown'].forEach(en => {
      screenButton.on(en, e => rocket.getBody().SetLinearVelocity(new b2.Vec2(0, 2.5)))
   });

});