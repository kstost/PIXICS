let balls = [];
let goals = [];
window.addEventListener('load', async () => {

   const PIXICS = pixiInst();
   const display = PIXICS.displaySystem([1080, 1920], true, document.body); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   display.container.appendChild(app.view);
   const gravity = { x: 0, y: -10 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(300, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
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

   let movingBars = [];
   class MovingBar {
      constructor({ type, pos, width, color }) {
         let tick = 10;
         let height = 50;
         let movingbar = new PIXICS.PhysicsGraphics({ world });
         width *= ratio;
         movingbar.drawRect(0, 0, width, 10 * ratio);
         if (type === 0) {
            movingbar.drawRect(width / 2, ((height - tick) / 2) * ratio, tick * ratio, height * ratio);
         }
         if (type === 1) {
            movingbar.drawRect(-width / 2, ((height - tick) / 2) * ratio, tick * ratio, height * ratio);
         }
         app.stage.addChild(movingbar.getGraphic());
         movingbar.setPosition(pos.x * ratio, pos.y * ratio);
         let angle = Math.PI / 16;
         let state = [-angle, 0, angle];
         this.cstate = 1;
         let prev;
         let giuri;
         let duration = 100;
         pixics.update(async (dt) => {
            if (this.cstate !== prev) {
               giuri && await giuri.abort();
               let diff = state[this.cstate] - movingbar.getAngle();
               if (diff) {
                  let _duration = duration * (diff / (state[this.cstate] - state[prev]));
                  giuri = movingbar.rotateEaseBy(diff, _duration, 'linearTween');
               }
            }
            prev = this.cstate;
         });
      }
      giurigi(stat) {
         if (stat === 2 || stat === 0) {
            if (this.cstate === 1) {
               this.cstate = stat;
            }
         } else {
            this.cstate = stat;
         }
      }
   }
   //getContactCount
   let destroyRun = false;
   let ballColors = [
      0xa0af00,
      0xf0afa0,
      0x0fafa0,
      0xf0faa0,
      0xa0aff0,
   ];
   let bars = [
      { type: 1, pos: { x: -200, y: 600 }, width: 600, color: 0x0f00ff },
      { type: 0, pos: { x: 100, y: 200 }, width: 800 },
      { type: 1, pos: { x: -200, y: -200 }, width: 600, color: 0x0f00ff },
   ];
   bars.forEach(info => movingBars.push(new MovingBar(info)));
   let giuri = {
      up: (e) => movingBars.forEach(bar => bar.giurigi(1)),
      down: (e) => movingBars.forEach(bar => {
         bar.giurigi({ ArrowLeft: 2, ArrowRight: 0 }[e.code])
      })
   }
   window.addEventListener('keyup', giuri.up);
   window.addEventListener('keydown', giuri.down);
   [true, false].forEach(function (mode) {
      const btn = new PIXI.Graphics();
      btn.beginFill(0xffffff);
      btn.drawRect(0, 0, width / 2, height);
      btn.endFill();
      btn.x = mode ? 0 : width / 2;
      btn.y = 0;
      btn.alpha = 0.1;
      btn.interactive = true;
      app.stage.addChild(btn);
      ['touchstart', 'mousedown'].forEach(en => {
         btn.on(en, e => giuri.down({ code: mode ? 'ArrowLeft' : 'ArrowRight' }))
      });
      ['touchend', 'mouseup'].forEach(en => btn.on(en, e => giuri.up()));
      return btn;
   });

   function shuffle(array) { return array.sort(() => Math.random() - 0.5); }
   function remObj(object) {
      if (object.isDestroy()) return;
      return new Promise(resolve => {
         let sprite = object.getGraphic();
         let destination = 5;
         let current = 0;
         let max = 1;
         function ani() {
            current += 0.1;
            if (current > max) current = max;
            sprite.scale.set(1 + (destination * current), 1 + (destination * current))
            sprite.alpha = 1 - current
            if (current === max) {
               object.destroy();
               pixics.unupdate(ani);
               resolve();
            }
         }
         pixics.update(ani);
      });
   }
   async function destroy() {
      if (destroyRun) return;
      destroyRun = true;
      await Promise.all([balls, goals].map(balls => Promise.all(balls.map(ball => remObj(ball)))))
      destroyRun = !true;
      goals = [];
      balls = [];
   }
   function genGoals() {
      shuffle(ballColors).forEach((color, i) => {
         let height = 50;
         let goal = new PIXICS.PhysicsGraphics({ world });
         goal.drawRect(0, 0, 1080 * 0.9 * ratio, height * ratio);
         goal.getGraphic().tint = color;
         goal.setTag(color);
         goal.setPosition(0, (-(height * 1.2) * i + (-1080 * 0.6)) * ratio);
         goals.push(goal);
         app.stage.addChild(goal.getGraphic());
      })
   }
   function genBalls() {
      shuffle(ballColors).forEach((color, i) => {
         let radius = 30;
         let ball = new PIXICS.PhysicsGraphics({ world });
         ball.drawCircle(0, 0, radius * ratio, color);
         ball.drawCircle(radius * 0.3, 0, radius * 0.3 * ratio, 0x000000);
         ball.drawCircle(-radius * 0.3, 0, radius * 0.3 * ratio, color);
         ball.setTag(color);
         ball.setDynamic()
         ball.setRestitution(0.5)
         ball.setPosition((-300 + (balls.length * radius * 2)) * ratio, 800 * ratio);
         balls.push(ball);
         app.stage.addChild(ball.getGraphic());
      })
   }
   function setContacts() {
      for (let i = 0; i < balls.length; i++) {
         for (let j = 0; j < goals.length; j++) {
            goals[j].addEvent('contact', balls[i], async function (ball) {
               if (destroyRun) return;
               if (ball.getTag() === goals[j].getTag()) {
                  remObj(ball)
                  remObj(goals[j])
               } else {
                  await destroy()
                  init();
               }
            });
            goals[j].addEvent('untact', balls[i], function (ball) { });
         }
      }
   }
   function init() {
      genBalls();
      genGoals();
      setContacts();
   }
   init()



   setTimeout(() => {
      console.log(balls[3].getRelations())
      console.log(balls[3].isRelatedTo(goals[3]))
   }, 1000)
   // console.log();



});