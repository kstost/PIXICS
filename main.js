let balls = [];
let goals = [];
window.addEventListener('load', async () => {
   function setEvent(thing, names, fn) {
      thing.interactive = true;
      [names].flat(Infinity).forEach(name => thing.on(name, fn));
   }

   const PIXICS = pixiInst();
   const display = PIXICS.displaySystem([1080, 1920], true, document.body); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   display.container.appendChild(app.view);
   const gravity = { x: 0, y: -10 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(130, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;

   let tickness = 10 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height);
   boundary.drawRect(-width / 2, 0, tickness, height);
   boundary.drawRect(0, height / 2, width, tickness);
   boundary.drawRect(0, -height / 2, width, tickness);
   app.stage.addChild(boundary.getGraphic());


   function genBalls() {
      let radius = 30 * ratio;
      let ball = new PIXICS.PhysicsGraphics({ world });
      ball.drawCircle(0, 0, radius, 0xffffff);
      ball.drawCircle(radius * 0.3, 0, radius * 0.3, 0xffffff);
      ball.drawCircle(-radius * 0.3, 0, radius * 0.3, 0x000000);
      ball.setDynamic()
      ball.setRestitution(0.5)
      ball.setFriction(0.1);
      ball.setPosition(Math.random(), 800 * ratio);
      ball.turnning = mode => ball.getGraphic().tint = mode ? 0xff0000 : 0x00aa00;
      ball.turnning(!false);
      balls.push(ball);
      app.stage.addChild(ball.getGraphic());
      const detect = function () {
         if (ball.isRelatedTo(baguni)) {
            ball.turnning(false);
         } else {
            ball.turnning(!false);
         }
      };
      ball.setUpdate(detect);
      setEvent(ball.getGraphic(), ['mousedown', 'touchstart'], e => {
         console.log(ball.getContactable());
         if (ball.getContactable()) {
            ball.setContactable(false);
         } else {
            ball.setContactable(!false);
         }

         // console.log(ball.getContactList(true));
         // if (ball.isUpdating(detect)) {
         //    ball.getGraphic().tint = 0xaa00aa;
         //    ball.remUpdate(detect);
         // } else {
         //    ball.setUpdate(detect);
         // }
      });
   }
   let cnt = 0;
   let pid = setInterval(() => {
      genBalls();
      cnt++;
      if (cnt > 100) clearInterval(pid);
   }, 50)


   let json = { "layers": [{ "dots": { "polygon": [{ "x": 630, "y": 60 }, { "x": 780, "y": 450 }, { "x": 750, "y": 480 }, { "x": 600, "y": 60 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 960, "y": 450 }, { "x": 1140, "y": 60 }, { "x": 1170, "y": 60 }, { "x": 990, "y": 480 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 780, "y": 450 }, { "x": 960, "y": 450 }, { "x": 990, "y": 480 }, { "x": 750, "y": 480 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }], "pivotpoint": { "x": 870, "y": 480 }, "scale": 30 }
   let baguni = new PIXICS.PhysicsGraphics({ world });
   baguni.drawJSON({ scale: 30, json: json })
   baguni.setFriction(0.1);
   baguni.setGravityScale(0);
   baguni.setPosition(0 * ratio, 0);
   app.stage.addChild(baguni.getGraphic());


});