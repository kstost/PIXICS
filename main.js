// let 스케일 = 100;
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
    const pixics = PIXICS.createWorld(700, ratio, gravity); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
    const world = pixics.world;
    const L = pixics.log;
    pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

    //------------------------------
    L('메인 코드의 시작');
    await pixics.sleep(10);

    let tickness = 0.2 * ratio;
    let shortground = new PIXICS.PhysicsGraphics({ world });
    shortground.drawRect(0, 0, tickness, height);
    shortground.drawRect(width - tickness, 0, tickness, height);
    shortground.drawRect(0, height - tickness, width, tickness);
    shortground.drawRect(0, 0, width, tickness);
    app.stage.addChild(shortground.getGraphic());
    // await pixics.sleep(1000);
    // setInterval(() => {
    let tick = 300;
    let ball = new PIXICS.PhysicsGraphics({ world });
    // ball.setDensity(1000)
    ball.getBody().setBullet(true);
    ball.getGraphic().tint = 0xddaa00;
    ball.drawRect(0, -(tick * ratio), width, (tick * ratio));
    app.stage.addChild(ball.getGraphic());
    ball.getGraphic().interactive = true;
    // console.log(ratio)
    // console.log(app.view.width / window.devicePixelRatio)
    // console.log(window.devicePixelRatio)

    // const 가능한최대속도의벨로시티 = () => {
    //     return 한프레임당이동하기를원하는벨로시티(한프레임당최대이동한계거리());
    // }
    ball.getGraphic().on('mousedown', async e => {
        // console.log(ball.getPosition())
        function pythagorean(sideA, sideB) {
            return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
        }
        // console.log(pixics);
        let x = 1080 * 0.5 * ratio;
        let y = 1920 * 0.5 * ratio;
        let velocity = pixics.getVelocityFor(pythagorean(x, y), 1);

        // let 벨로시티 = 50;
        // let 이동거리 = 10 * ratio;
        // let xx = (이동거리 * (Math.random() * 100)) * (Math.random() < 0.5 ? -1 : 1);
        // let yy = (이동거리 * (Math.random() * 100)) * (Math.random() < 0.5 ? -1 : 1);
        // 이동거리 = pythagorean(xx, yy);
        // let ddd = new Date();
        // await ball.moveTo(xx, yy, 벨로시티);
        // console.log('걸린시간', new Date() - ddd);
        // console.log({ x: xx, y: yy });
        // console.log(ball.getPosition())
        // ball.getBody().setLinearVelocity(planck.Vec2(0, 500000))
        let start = new Date();
        await ball.moveTo(x, y, velocity);
        console.log(new Date() - start);

        // console.log(ball.getBody().getLinearVelocity());
    })
    ball.getGraphic().emit('mousedown')
    let massive = new PIXICS.PhysicsGraphics({ world });
    massive.drawRect(0, 0, (100 * ratio), (100 * ratio));
    massive.setPosition(width / 2, height / 2);
    massive.setDynamic()
    massive.setDensity(1000)
    massive.getBody().setGravityScale(0)
    app.stage.addChild(massive.getGraphic());
    // massive.getGraphic().interactive = true;
    // massive.getGraphic().on('mousedown', e => {
    //     massive.getBody().setLinearVelocity(planck.Vec2(0, 10))
    //     console.log(123);
    // })
    // }, 1000);
    // await pixics.sleep(1000);

    // L('중력 영향 받는 요소생성');
    // shortground.getGraphic().tint = 0xaa0000;
    // let butter = new PIXICS.PhysicsGraphics({ world });
    // butter.drawCircle(0, 0, 100 * ratio);
    // butter.getGraphic().tint = 0xddaa00;
    // app.stage.addChild(butter.getGraphic());
    // butter.setPosition((1080) * 0.5 * ratio, 1920 * 0.5 * ratio)
    // butter.setDynamic()
    // await pixics.sleep(1000);

    // L('붉은 막대를 계속 움직여주는 작동을 한다. 이 작동은 무한히 반복된다');
    // // 이동할 거리값에 ratio 를 붙이는것을 잊지말자
    // while (true) {
    //    L('위로');
    //    await shortground.moveEaseBy(0, -1920 * 0.1 * ratio, 300, 'easeInOutQuad');
    //    L('아래로');
    //    await shortground.moveEaseBy(0, 1920 * 0.1 * ratio, 1000, 'easeInOutQuad');
    // }

});