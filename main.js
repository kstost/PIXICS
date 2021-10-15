window.addEventListener('load', async () => {

   //------------------------------
   // 스크린의 준비
   const display = displaySystem(1080, 1920, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   document.querySelector('body').appendChild(app.view);

   //------------------------------
   // 피직스월드의 준비
   const gravity = { x: 0, y: -30 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(100, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('바운더리 생성');
   let tickness = 10 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height);
   boundary.drawRect(-width / 2, 0, tickness, height);
   boundary.drawRect(0, height / 2, width, tickness);
   boundary.drawRect(0, -height / 2, width, tickness);
   app.stage.addChild(boundary.getGraphic());

   L('복합도형을 JSON으로 만들어보자');
   /*
      JSON은 여기서 만들면 된다
      https://kstost.github.io/PIXICS/editor.html
   */
   let json = {"layers":[{"dots":{"polygon":[{"x":240,"y":300}],"circle":[{"x":240,"y":360},{"x":300,"y":360}],"rect":[]},"color":"ffffff","friction":0,"density":0,"restitution":2,"class":"circle"},{"dots":{"polygon":[],"circle":[],"rect":[{"x":300,"y":300},{"x":420,"y":420}]},"color":"ffffff","friction":0,"density":0,"restitution":3,"class":"rect"},{"dots":{"polygon":[{"x":240,"y":270},{"x":300,"y":150},{"x":360,"y":270}],"circle":[],"rect":[]},"color":"ffffff","friction":0,"density":0,"restitution":0,"class":"polygon"},{"dots":{"polygon":[],"circle":[],"rect":[{"x":420,"y":420},{"x":480,"y":480}]},"color":"ffffff","friction":0,"density":0,"restitution":0,"class":"rect"},{"dots":{"polygon":[],"circle":[{"x":450,"y":510},{"x":480,"y":510}],"rect":[]},"color":"ff00ff","friction":0,"density":0,"restitution":2,"class":"circle"}],"pivotpoint":{"x":300,"y":360},"scale":30}
   let body = new PIXICS.PhysicsGraphics({ world });
   body.drawJSON({ scale: 30, json: json })
   body.setDynamic();
   app.stage.addChild(body.getGraphic());

});