window.addEventListener('load', async () => {

    //------------------------------
    // 스크린의 준비
    const display = displaySystem(1080, 1920, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
    const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
    const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
    document.querySelector('body').appendChild(app.view);
 
    //------------------------------
    // 피직스월드의 준비
    const gravity = planck.Vec2(0, -300); // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
    const pixics = PIXICS.createWorld(300, ratio, gravity); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
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
    // shortground.getBody().setBullet(true);
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
    // 빠르게 움직이게 한다면 PIXICS.createWorld 의 첫번째인자인 스케일을 키워야한다
    // 키우지 않으면 물체를 통과해버리는 문제가 생길 수 있다
    // 스케일에 의해서 Velocity 의 한계가 정해지기 때문에 함께 적절히 조절되어야한다
    while (true) {
       L('위로');
       // 엄청나게 빠른 움직임이 필요한거면 ease 적용하지 않고 사용하는것을 강력추천한다
       // 엄청 빠른 움직임을 Ease로 할 경우 물체가 통과해버리는 문제가 생길 수 있다
       await shortground.moveBy(0, -1920 * 1 * ratio, 5000);
       L('아래로');
       await shortground.moveEaseBy(0, 1920 * 1 * ratio, 2000, 'easeInOutQuad');
    }
 
 });