window.addEventListener('load', async () => {

   //------------------------------
   // 스크린의 준비
   const display = displaySystem(1080, 1920, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   document.querySelector('body').appendChild(app.view);

   //------------------------------
   // 피직스월드의 준비
   const gravity = planck.Vec2(0, 100); // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(100, ratio, gravity); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('붉은막대 생성');
   // let shortground = new PIXICS.PhysicsGraphics({ world });
   // shortground.drawRect(
   //    -(1000 * ratio * 0.5),
   //    -(30 * ratio * 0.5),
   //    1000 * ratio,
   //    30 * ratio
   // );
   // // shortground.getBody().setBullet(true);
   // shortground.getGraphic().tint = 0xaa0000;
   // app.stage.addChild(shortground.getGraphic());
   // shortground.setPosition(1080 * 0.5 * ratio, (1920 - 15) * ratio)

   L('바운더리 생성');
   let tickness = 5 * ratio;
   let shortground = new PIXICS.PhysicsGraphics({ world });
   shortground.drawRect(0, 0, tickness, height);
   shortground.drawRect(width - tickness, 0, tickness, height);
   shortground.drawRect(0, height - tickness, width, tickness);
   shortground.drawRect(0, 0, width, tickness);
   app.stage.addChild(shortground.getGraphic());


   let data = { "layers": [{ "dots": { "polygon": [{ "x": 300, "y": 390 }, { "x": 210, "y": 540 }, { "x": 300, "y": 540 }, { "x": 330, "y": 510 }, { "x": 390, "y": 570 }, { "x": 420, "y": 510 }, { "x": 390, "y": 450 }, { "x": 480, "y": 510 }, { "x": 420, "y": 450 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 270, "y": 360 }, { "x": 300, "y": 390 }, { "x": 330, "y": 360 }, { "x": 300, "y": 300 }], "circle": [{ "x": 330, "y": 570 }, { "x": 330, "y": 540 }], "rect": [] }, "color": "ff00ff", "friction": 0, "density": 0, "restitution": 0, "class": "circle" }, { "dots": { "polygon": [], "circle": [], "rect": [{ "x": 210, "y": 570 }, { "x": 270, "y": 630 }] }, "color": "ffff00", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }], "pivotpoint": { "x": 330, "y": 570 }, "scale": 30 }
   data = { "layers": [{ "dots": { "polygon": [{ "x": 210, "y": 390 }, { "x": 210, "y": 540 }, { "x": 300, "y": 510 }, { "x": 390, "y": 540 }, { "x": 480, "y": 540 }, { "x": 480, "y": 480 }, { "x": 480, "y": 450 }, { "x": 480, "y": 390 }, { "x": 360, "y": 420 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }, { "dots": { "polygon": [{ "x": 270, "y": 360 }, { "x": 300, "y": 390 }, { "x": 330, "y": 360 }, { "x": 300, "y": 300 }], "circle": [{ "x": 330, "y": 570 }, { "x": 330, "y": 540 }], "rect": [] }, "color": "ff00ff", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }, { "dots": { "polygon": [], "circle": [], "rect": [{ "x": 210, "y": 570 }, { "x": 270, "y": 630 }] }, "color": "ffff00", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 270, "y": 480 }, { "x": 330, "y": 510 }, { "x": 390, "y": 480 }, { "x": 390, "y": 600 }, { "x": 360, "y": 570 }, { "x": 270, "y": 600 }, { "x": 300, "y": 540 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }], "pivotpoint": { "x": 330, "y": 570 }, "scale": 30 }
   data = { "layers": [{ "dots": { "polygon": [{ "x": 210, "y": 390 }, { "x": 210, "y": 540 }, { "x": 300, "y": 510 }, { "x": 390, "y": 540 }, { "x": 480, "y": 540 }, { "x": 480, "y": 480 }, { "x": 480, "y": 450 }, { "x": 480, "y": 390 }, { "x": 360, "y": 420 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }, { "dots": { "polygon": [{ "x": 270, "y": 360 }, { "x": 300, "y": 390 }, { "x": 330, "y": 360 }, { "x": 300, "y": 300 }], "circle": [{ "x": 330, "y": 570 }, { "x": 330, "y": 540 }], "rect": [] }, "color": "ff00ff", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }, { "dots": { "polygon": [], "circle": [], "rect": [{ "x": 210, "y": 570 }, { "x": 270, "y": 630 }] }, "color": "ffff00", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 270, "y": 480 }, { "x": 330, "y": 510 }, { "x": 390, "y": 480 }, { "x": 390, "y": 600 }, { "x": 330, "y": 630 }, { "x": 270, "y": 600 }, { "x": 300, "y": 540 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }], "pivotpoint": { "x": 330, "y": 570 }, "scale": 30 }
   data = { "layers": [{ "dots": { "polygon": [{ "x": 210, "y": 390 }, { "x": 210, "y": 540 }, { "x": 300, "y": 510 }, { "x": 390, "y": 540 }, { "x": 480, "y": 540 }, { "x": 480, "y": 480 }, { "x": 480, "y": 450 }, { "x": 480, "y": 390 }, { "x": 360, "y": 420 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }, { "dots": { "polygon": [{ "x": 270, "y": 360 }, { "x": 300, "y": 390 }, { "x": 330, "y": 360 }, { "x": 300, "y": 300 }], "circle": [{ "x": 330, "y": 570 }, { "x": 330, "y": 540 }], "rect": [] }, "color": "ff00ff", "friction": 0, "density": 0, "restitution": 0, "class": "rect" }, { "dots": { "polygon": [], "circle": [], "rect": [{ "x": 210, "y": 570 }, { "x": 270, "y": 630 }] }, "color": "ffff00", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 270, "y": 480 }, { "x": 330, "y": 510 }, { "x": 390, "y": 480 }, { "x": 390, "y": 540 }, { "x": 330, "y": 570 }, { "x": 270, "y": 600 }, { "x": 300, "y": 540 }, { "x": 270, "y": 510 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 390, "y": 600 }, { "x": 300, "y": 540 }, { "x": 390, "y": 510 }], "circle": [], "rect": [] }, "color": "ff00ff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }], "pivotpoint": { "x": 330, "y": 570 }, "scale": 30 }
   let butter = new PIXICS.PhysicsGraphics({ world });
   butter.drawJSON({ scale: 100, json: data });
   console.log(data.scale);
   L('중력 영향 받는 요소생성');
   // butter.getGraphic().tint = 0xddaa00;
   app.stage.addChild(butter.getGraphic());
   butter.setPosition((1080) * 0.5 * ratio, 1920 * 0.5 * ratio)
   for (let i = 0; i < 1; i++) {
      // butter.redrawFixture();
   }
   console.log(butter.getFixtures())
   // butter.removeFixture(0)
   // butter.setDynamic()

   let center = new PIXICS.PhysicsGraphics({ world });
   center.drawCircle(0, 0, 10 * ratio, 0xffffff);
   center.setPosition((1080) * 0.5 * ratio, 1920 * 0.5 * ratio)
   app.stage.addChild(center.getGraphic());

   for (let i = 0; i < 300; i++) {
      let center = new PIXICS.PhysicsGraphics({ world });
      center.drawRect(0, 0, 10 * ratio, 10 * ratio, 0x0000ff);
      // center.setRestitution(0)
      // center.setFriction(1)
      center.setPosition((1080) * Math.random() * ratio, 1920 * 0.9 * ratio)
      center.setDynamic()
      app.stage.addChild(center.getGraphic());
   }

   L('붉은 막대를 계속 움직여주는 작동을 한다. 이 작동은 무한히 반복된다');
   // 이동할 거리값에 ratio 를 붙이는것을 잊지말자
   // 빠르게 움직이게 한다면 PIXICS.createWorld 의 첫번째인자인 스케일을 키워야한다
   // 키우지 않으면 물체를 통과해버리는 문제가 생길 수 있다
   // 스케일에 의해서 Velocity 의 한계가 정해지기 때문에 함께 적절히 조절되어야한다
   while (false) {
      L('위로');
      // 엄청나게 빠른 움직임이 필요한거면 ease 적용하지 않고 사용하는것을 강력추천한다
      // 엄청 빠른 움직임을 Ease로 할 경우 물체가 통과해버리는 문제가 생길 수 있다
      await shortground.moveBy(0, -1920 * 1 * ratio, 5000);
      L('아래로');
      await shortground.moveEaseBy(0, 1920 * 1 * ratio, 2000, 'easeInOutQuad');
   }

});