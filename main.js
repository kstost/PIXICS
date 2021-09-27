window.addEventListener('load', async () => {

    //------------------------------
    // 스크린의 준비
    const display = displaySystem(1080, 1920, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
    const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
    const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
    document.querySelector('body').appendChild(app.view);
 
    //------------------------------
    // 피직스월드의 준비
    const gravity = planck.Vec2(0, -100); // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
    const pixics = PIXICS.createWorld(30, ratio, gravity); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
    const world = pixics.world;
    const L = pixics.log;
    pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });
 
    //------------------------------
    L('메인 코드의 시작');
    await pixics.sleep(10);
 
    L('붉은막대 생성');
    let shortground = new PIXICS.PhysicsGraphics({ world });
    shortground.drawRect(
       -(1000 * ratio * 0.5),
       -(30 * ratio * 0.5),
       1000 * ratio,
       30 * ratio
    );
    shortground.getGraphic().tint = 0xaa0000;
    app.stage.addChild(shortground.getGraphic());
    shortground.setPosition(1080 * 0.5 * ratio, (1920 - 15) * ratio)
    await pixics.sleep(1000);
 
    L('중력 영향 받는 요소생성');
    let butter = new PIXICS.PhysicsGraphics({ world });
    butter.drawCircle(0, 0, 100 * ratio);
    butter.getGraphic().tint = 0xddaa00;
    app.stage.addChild(butter.getGraphic());
    butter.setPosition((1080) * 0.5 * ratio, 1920 * 0.5 * ratio)
    butter.setDynamic()
    await pixics.sleep(1000);
 
    L('붉은 막대를 계속 움직여주는 작동을 한다. 이 작동은 무한히 반복된다');
    // 이동할 거리값에 ratio 를 붙이는것을 잊지말자
    while (true) {
       L('위로');
       await shortground.moveEaseBy(0, -1920 * 0.1 * ratio, 300, 'easeInOutQuad');
       L('아래로');
       await shortground.moveEaseBy(0, 1920 * 0.1 * ratio, 1000, 'easeInOutQuad');
    }
 
 });