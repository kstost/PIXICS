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
    pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

    //------------------------------
    // 메인 코드의 시작
    await pixics.sleep(10);

    // 복합도형 오브젝트 생성
    let rectsize = (1080 * 0.4) * ratio;
    let rect = new PIXICS.PhysicsGraphics({ world });
    rect.drawCircle(0, 0, rectsize / 2); // 원그리고
    rect.drawRect(0, 0, rectsize * 1.5, rectsize * 0.1); // 길다란사각형그렸다
    rect.getGraphic().tint = 0xaaff00;
    app.stage.addChild(rect.getGraphic());
    await pixics.sleep(1000);

    // 화면의 가운데로 오도록 좌표변경
    rect.setPosition(1080 * 0.5 * ratio, 1920 * 0.5 * ratio)
    await pixics.sleep(1000);

    // 붉은막대 생성
    let shortground = new PIXICS.PhysicsGraphics({ world });
    shortground.drawRect(
        -(1000 * ratio * 0.5),
        -(30 * ratio * 0.5),
        1000 * ratio,
        30 * ratio
    );
    shortground.getGraphic().tint = 0xaa0000;
    app.stage.addChild(shortground.getGraphic());
    shortground.setPosition(1080 * 0.5 * ratio, 1920 * 0.8 * ratio)

    // 복합도형이 중력의 영향 받도록 설정
    rect.setDynamic();
    await pixics.sleep(1000);

    // 붉은막대 움직여보기
    // 이 움직임은 중력의 영향을 받는 Dynamic 상태의 움직임과는 다른 움직임이다
    // 중력에 전혀 영향을 받지 않고 다른 오브젝트로부터의 저항에도 전혀 영향받지 않는 절대적인 힘을 가진다
    // 각 함수의 리턴은 Promise이며 움직임이 종료되면 resolve 된다
    // 만약 해당 요소가 dynamic 상태라면 아래 코드를 수행함으로써 자동적으로 kinematic 상태로 전환된다
    // dynamic = 중력에 영향받는 상태
    // kinematic = 중력에 영향받지 않는 절대적인 힘의 움직임을 가지는 상태
    await shortground.rotateEaseBy(-(Math.PI / 10), 1000, 'easeInOutQuad');
    await shortground.rotateEaseBy((Math.PI / 10), 300, 'easeInOutQuad');
    await shortground.moveEaseBy(0, -100, 200, 'easeInOutQuad');

});