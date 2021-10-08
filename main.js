window.addEventListener('load', async () => {

   //------------------------------
   // 스크린의 준비
   const display = displaySystem(1080, 1920, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   document.querySelector('body').appendChild(app.view);

   //------------------------------
   // 피직스월드의 준비
   const gravity = planck.Vec2(0, -30); // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(100, ratio, gravity); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('바운더리 생성');
   let tickness = 5 * ratio;
   let shortground = new PIXICS.PhysicsGraphics({ world });
   shortground.drawRect(0, 0, tickness, height);
   shortground.drawRect(width - tickness, 0, tickness, height);
   shortground.drawRect(0, height - tickness, width, tickness);
   shortground.drawRect(0, 0, width, tickness);
   app.stage.addChild(shortground.getGraphic());
   await pixics.sleep(1000);

   L('흔들대는 요소 만들기');
   /*
      json 변수안에 들어있는 내용을 토대로 polyObj에 요소를 그려내는 코드이다
      여기서 중요한 부분은 json의 내용인데 이 json 내용은 손으로 작성한것이아니라 편집기를 사용해서 생성해낸 데이터이다
      그 편집기는 https://kstost.github.io/PIXICS/editor.html 이다
      여기서 도형을 만들어내고 Save&Export 를 하면 json 코드가 클립보드로 복사되게된다

      반대로 코드상에 담은 json를 편집하고자 한다면 PIXICS.editorUrl(json, true) 를 실행하면 편집페이지로 이동한다
      아니면 json을 urlencode해서 아래의 주소와 같이 만들어서 접속해도 바로 로드가 가능하다
      https://kstost.github.io/PIXICS/editor.html#%7B%22layers%22%3A%5B%7B%22dots%22%3A%7B%22polygon%22%3A%5B%7B%22x%22%3A390%2C%22y%22%3A240%7D%2C%7B%22x%22%3A390%2C%22y%22%3A330%7D%2C%7B%22x%22%3A630%2C%22y%22%3A330%7D%5D%2C%22circle%22%3A%5B%5D%2C%22rect%22%3A%5B%5D%7D%2C%22color%22%3A%22ffffff%22%2C%22friction%22%3A0%2C%22density%22%3A0%2C%22restitution%22%3A0%2C%22class%22%3A%22polygon%22%7D%2C%7B%22dots%22%3A%7B%22polygon%22%3A%5B%7B%22x%22%3A390%2C%22y%22%3A330%7D%2C%7B%22x%22%3A630%2C%22y%22%3A240%7D%2C%7B%22x%22%3A630%2C%22y%22%3A330%7D%5D%2C%22circle%22%3A%5B%5D%2C%22rect%22%3A%5B%5D%7D%2C%22color%22%3A%22ffffff%22%2C%22friction%22%3A0%2C%22density%22%3A0%2C%22restitution%22%3A0%2C%22class%22%3A%22polygon%22%7D%5D%2C%22pivotpoint%22%3A%7B%22x%22%3A510%2C%22y%22%3A300%7D%2C%22scale%22%3A30%7D

      아래 예제 데이터는 오목한 부분이 존재하는 요소인데 폴리곤을 만들때 주의할 점은 볼록한 모습을 만들고자 할때는 두개의 요소를 덧대는 방법으로 볼록한 형태를 구현해내야한다
      자세한 모습은 아래 json을 위 툴에 넣어서 확인해보면 알 수 있다
      이 json 데이터는 drawJSON 함수에 아래와 같은 형태로 전달하면 된다
      전달될때 scale 값이 함께 전달되게되는데 scale을 1로 하게되면 편집기상에서 모눈한칸의 너비가
      displaySystem인자의 너비로 준값이 2라고 한다면 실제 화면상에서는 너비상 절반을 차지하는 크기가 된다
      scale값에는 ratio를 곱해주지않도록 주의하자
   */
   let polyObj = new PIXICS.PhysicsGraphics({ world });
   let json = {"layers":[{"dots":{"polygon":[],"circle":[],"rect":[{"x":390,"y":150},{"x":1290,"y":750}]},"color":"00ffff","friction":0,"density":0,"restitution":0,"class":"rect"},{"dots":{"polygon":[],"circle":[],"rect":[{"x":300,"y":180},{"x":1140,"y":720}]},"color":"ffffff","friction":0,"density":0,"restitution":0,"class":"rect"}],"pivotpoint":{"x":840,"y":450},"scale":30}
   polyObj.drawJSON({ scale: 13, json });
   polyObj.setPosition((1080) * 0.5 * ratio, 1920 * 0.5 * ratio)
   polyObj.redrawFixture() // 그래픽요소의 내용을 모두 지우고서 생성된 fixture를 토대로 다시 그리기
   app.stage.addChild(polyObj.getGraphic());
   // polyObj.removeFixture(0)
   await pixics.sleep(1000);

   L('흔들거리게 하기');
   (async () => {
      let toggle = false;
      let term = (Math.PI / 8);
      await polyObj.rotateEaseBy(term * 0.5, 1000 * 0.5, 'easeInOutQuad');
      while (true) {
         let val = (term * (!toggle ? -1 : 1));
         await polyObj.rotateEaseBy(val, 1000, 'easeInOutQuad');
         toggle = !toggle;
      }
   })()
   await pixics.sleep(1000);

   L('푸른공 여러개 만들기');
   for (let i = 0; i < 30; i++) {
      let blueBall = new PIXICS.PhysicsGraphics({ world });
      blueBall.drawCircle(0, 0, 50 * ratio, 0x00aaff);
      blueBall.setFriction(1)
      blueBall.setRestitution(0.6)
      blueBall.setPosition((1080) * Math.random() * ratio, ((1920 * 0.05) + (500 * Math.random())) * ratio)
      blueBall.setDynamic()
      app.stage.addChild(blueBall.getGraphic());
      await pixics.sleep(100);
   }

});