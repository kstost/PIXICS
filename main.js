window.addEventListener('load', async () => {

   function setEvent(thing, names, fn) {
      thing.interactive = true;
      [names].flat(Infinity).forEach(name => thing.on(name, fn));
   }
   function setDragable(thing) {
      let startpoint = null;
      let base = null;
      let dotposes = null;
      let dn = false;
      const onDragStart = function (event) {
         this.data = event.data; this.dragging = true;
         const newPosition = this.data.getLocalPosition(this.parent);
         startpoint = (newPosition);
         base = { x: 0, y: 0 };
         dotposes = { x: thing.x, y: thing.y };
         dn = thing.isDynamic();
         thing.setStatic()
      }
      const onDragEnd = function () {
         this.dragging = false; this.data = null;
         startpoint = null;
         base = null;
         if (dn) thing.setDynamic()
      }
      const onDragMove = function (e) {
         if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            let cha = {
               x: (newPosition.x - startpoint.x),
               y: (newPosition.y - startpoint.y),
            };
            base.x += cha.x;
            base.y += cha.y;
            let cp = thing.getPosition();
            cp.x += cha.x;
            cp.y += cha.y;
            thing.setPosition(cp.x, -cp.y);
            startpoint = (newPosition);
         }
      }
      setEvent(thing.getGraphic(), ['mousedown', 'touchstart'], onDragStart);
      setEvent(thing.getGraphic(), ['mousemove', 'touchmove'], onDragMove);
      setEvent(thing.getGraphic(), ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);
   }

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
   // pixics.worldcenter.scale = 0.1;
   pixics.worldcenter.x = 0.5;
   pixics.worldcenter.y = 0.5;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('바운더리 생성');
   let tickness = 5 * ratio;
   // let shortground = new PIXICS.PhysicsGraphics({ world });
   // shortground.drawRect(0, 0, tickness, height);
   // shortground.drawRect(width - tickness, 0, tickness, height);
   // shortground.drawRect(0, height - tickness, width, tickness);
   // shortground.drawRect(0, 0, width, tickness);
   // app.stage.addChild(shortground.getGraphic());
   // await pixics.sleep(1000);
   pixics.moveWorldCenterBy(108 * ratio, 1920 * 0.5 * ratio)

   // pixics.update(function (dt) {
   //    pixics.moveWorldCenterBy(0, 0.001 * ratio)
   // });

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
   // console.log({ ...display });
   {
      for (let i = 0; i < 0; i++) {
         let polyObj = new PIXICS.PhysicsGraphics({ world });
         let xx = ((1080 * 0.5 * ratio) * Math.random()) - (1080 * 0.25 * ratio);
         let yy = ((1920 * 0.5 * ratio) * Math.random()) - (1920 * 0.25 * ratio);
         polyObj.drawCircle(xx, yy, 1080 * 0.02 * ratio);
         app.stage.addChild(polyObj.getGraphic());
         // polyObj.setPosition(0, 100*ratio)
         polyObj.setDynamic()
         polyObj.setDensity(1);
         polyObj.getGraphic().interactive = true
         polyObj.getGraphic().on('mousedown', e => {
            polyObj.getBody().SetLinearVelocity(new b2.Vec2(1, 0))
         });
         polyObj.setRestitution(0.95)
         // await pixics.sleep(10);
      }
      // setDragable(polyObj)
   }

   let vertices = [
      { x: (0) * ratio, y: (0) * ratio },
      { x: (0) * ratio, y: (1080 * 0.20) * ratio },
      { x: (1080 * 0.20) * ratio, y: (1080 * 0.20) * ratio },
      { x: (1080 * 0.25) * ratio, y: (0) * ratio },
   ];
   // vertices.push(new b2.Vec2(-20,-20));
   // vertices.push(new b2.Vec2(55,-20));
   // vertices.push(new b2.Vec2(11,15));
   // vertices.push(new b2.Vec2(-20,11));
   // sp4.Set(vertices);
   let ppp = new PIXICS.PhysicsGraphics({ world });
   ppp.drawPolygon(vertices);
   app.stage.addChild(ppp.getGraphic());
   // ppp.setPosition(0, 100*ratio)
   ppp.getBody().SetGravityScale(0)
   ppp.setDynamic()
   ppp.setDensity(1);
   ppp.getGraphic().interactive = true
   ppp.getGraphic().on('mousedown', e => {
      ppp.getBody().SetAngularVelocity(1)
   });
   ppp.setRestitution(0.95);
   ppp.planckBody.SetType(b2.BodyType.b2_kinematicBody); // https://piqnt.com/planck.js/BodyTypes

   if (false) {
      let dot = new PIXICS.PhysicsGraphics({ world });
      let xx = (1080 * 0 * ratio);// * Math.random()) - (1080 * 0.25 * ratio);
      let yy = (1920 * 0 * ratio);// * Math.random()) - (1920 * 0.25 * ratio);
      dot.drawCircle(xx, yy, 1080 * 0.007 * ratio);
      app.stage.addChild(dot.getGraphic());
      // dot.setPosition(0, 100*ratio)
      // dot.setDynamic()
      // dot.setDensity(1);
      dot.getGraphic().interactive = true
      dot.getGraphic().on('mousedown', e => {
         dot.getBody().SetLinearVelocity(new b2.Vec2(1, 0))
      });
      dot.setRestitution(0.95)
      dot.getGraphic().tint = 0x00af0f
   }

   {
      // let polyObj = new PIXICS.PhysicsGraphics({ world });
      // polyObj.drawRect(0, 1920 * 0.5 * ratio, 1080 * 0.1 * ratio, 1080 * 0.1 * ratio);
      // app.stage.addChild(polyObj.getGraphic());
      // // polyObj.setPosition(0, 100*ratio)
      // polyObj.setDynamic()
      // polyObj.getGraphic().interactive = true
      // polyObj.getGraphic().on('mousedown', e => {
      //    // polyObj.getBody().SetLinearVelocity(new b2.Vec2(0, 10))
      //    polyObj.setPosition(0, 1920 * 0.5 * ratio)
      // })
      // setDragable(polyObj)
   }
   {
      let polyObj = new PIXICS.PhysicsGraphics({ world });
      polyObj.drawRect(0, 1920 * 0.5 * ratio, 1080 * 0.5 * ratio, 2 * ratio);
      app.stage.addChild(polyObj.getGraphic());
   }
   {
      let polyObj = new PIXICS.PhysicsGraphics({ world });
      polyObj.drawRect(0, -1920 * 0.5 * ratio, 1080 * 0.5 * ratio, 2 * ratio);
      app.stage.addChild(polyObj.getGraphic());
   }
   {
      let polyObj = new PIXICS.PhysicsGraphics({ world });
      polyObj.drawRect(-1080 * 0.5 * ratio, 0, 2 * ratio, 1920 * 0.5 * ratio);
      app.stage.addChild(polyObj.getGraphic());
   }
   {
      let polyObj = new PIXICS.PhysicsGraphics({ world });
      polyObj.drawRect(1080 * 0.5 * ratio, 0, 2 * ratio, 1920 * 0.5 * ratio);
      app.stage.addChild(polyObj.getGraphic());
   }
   // polyObj.redrawFixture() // 그래픽요소의 내용을 모두 지우고서 생성된 fixture를 토대로 다시 그리기
   // polyObj.removeFixture(0)
   // await pixics.sleep(1000);

   // L('흔들거리게 하기');
   // (async () => {
   //    let toggle = false;
   //    let term = (Math.PI / 8);
   //    await polyObj.rotateEaseBy(term * 0.5, 1000 * 0.5, 'easeInOutQuad');
   //    while (true) {
   //       let val = (term * (!toggle ? -1 : 1));
   //       await polyObj.rotateEaseBy(val, 1000, 'easeInOutQuad');
   //       toggle = !toggle;
   //    }
   // })()
   // await pixics.sleep(1000);

   // L('푸른공 여러개 만들기');
   // for (let i = 0; i < 30; i++) {
   //    let blueBall = new PIXICS.PhysicsGraphics({ world });
   //    blueBall.drawCircle(0, 0, 50 * ratio, 0x00aaff);
   //    blueBall.setFriction(1)
   //    blueBall.setRestitution(0.6)
   //    blueBall.setPosition((1080) * Math.random() * ratio, ((1920 * 0.05) + (500 * Math.random())) * ratio)
   //    blueBall.setDynamic()
   //    app.stage.addChild(blueBall.getGraphic());
   //    await pixics.sleep(100);
   // }

});