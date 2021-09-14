
//------------------------------
// 픽시스크린의 준비
let display = displaySystem(1080, 1920, true);
let app = new PIXI.Application({
    width: display.sizeCalc().width,
    height: display.sizeCalc().height,
    antialias: true,
    resolution: window.devicePixelRatio,
    autoDensity: true,
});
display.actualWidth = app.screen.width;
display.actualHeight = app.screen.height;
document.querySelector('body').appendChild(app.view);
app.stage.sortableChildren = true;

//------------------------------
// 피직스월드의 준비
let gravity = planck.Vec2(0, -10);
let world = new planck.World(gravity);

//------------------------------
// 매 프레임마다 물리연산을 해서 나오는 수치를 픽시 그래픽요소의 상태에 반영
PIXI.Ticker.shared.add(dt => {
    world.step(((1 * dt) / 60));
    world.clearForces();
    for (let body = world.getBodyList(); body; body = body.getNext()) {
        body.getUserData()?.syncState();
    }
});

//------------------------------
// 화면 사방을 막아주는 바운더리 요소를 만들어서 화면에 등장시키기
let 선굵기 = display.tr(10);
let 바운더리 = new PIXICS.PhysicsGraphics({ world });
바운더리.drawRect(0, 0, display.tr(display.width), 선굵기);
바운더리.drawRect(0, display.tr(display.height) - 선굵기, display.tr(display.width), 선굵기);
바운더리.drawRect(0, 0, 선굵기, display.tr(display.height));
바운더리.drawRect(display.tr(display.width) - 선굵기, 0, 선굵기, display.tr(display.height));
바운더리.getGraphic().tint = 0x666600;
app.stage.addChild(바운더리.getGraphic());

//------------------------------
let 여러가지조합 = new PIXICS.PhysicsGraphics({ world });
여러가지조합.getGraphic().tint = 0x00aaff; // 색 지정이 가능. 그래픽요소의 기본색은 흰색
여러가지조합.setDynamic(); // 중력법칙 적용
// pg그래픽요소에 여러가지 도형을 그려서 합쳐버릴수 있다
여러가지조합.drawPolygon([ // 다각형그리기
    planck.Vec2(display.tr(0), display.tr(0)),
    planck.Vec2(display.tr(30), display.tr(70)),
    planck.Vec2(display.tr(70), display.tr(150)),
    planck.Vec2(display.tr(200), display.tr(150)),
    planck.Vec2(display.tr(40), display.tr(2)),
]);
여러가지조합.drawCircle(display.tr(210), display.tr(110), display.tr(50)); // 원그리기
여러가지조합.drawRect(display.tr(250), display.tr(110), display.tr(50), display.tr(50)); // 사각형 그리기
여러가지조합.setDensity(1000, 2); // 세번째 요소인 Rect의 밀도를 1000으로 지정 (기본은 1)
console.log(여러가지조합.getDensity(2)); // 밀도 확인 가능
app.stage.addChild(여러가지조합.getGraphic()); // 그래픽요소를 화면에 추가
setDraggable(여러가지조합); // 그래그 이벤트 붙이기

//------------------------------
// 동그라미들 만들어서 추가
for (let i = 0; i < 10; i++) {
    let pg = new PIXICS.PhysicsGraphics({ world }); // 픽시 그래픽요소를 생성해서 물리법칙에 영향받도록 피직스월드에 추가
    pg.drawCircle( // 원을 그림
        display.actualWidth * Math.random(), // 중심점의 X좌표
        display.actualHeight * Math.random(), // 중심점의 Y좌표
        display.tr((display.width - 선굵기 * 2) / 20) // 반지름
    );
    pg.setDynamic(); // 물리법칙의 영향을 받도록 해줌
    pg.setRestitution(0); // 탄성. 수치가 낮으면 안튕김, 수치가 높으면 튕김
    pg.setFriction(0); // 마찰. 수치가 낮으면 얼음, 수치가 높으면 까끌까끌사포
    pg.setDensity(1); // 밀도. 수치가 낮으면 탁구공, 수치가 높으면 쇠구슬
    app.stage.addChild(pg.getGraphic()); // 픽시그래픽 요소를 픽시스테이지에 추가

    // 픽시그래픽요소에 드래그 인터랙션 정의
    setDraggable(pg);
}

//--------------------------------
// 드래그 이벤트 붙이기
function setDraggable(pg) {
    function onDragStart(event) {
        this.data = event.data;
        this.prevstep = this.data.getLocalPosition(this.parent);
        this.dragging = true;
    }
    function onDragEnd() {
        this.dragging = false;
        this.data = null;
    }
    function onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            let x = this.prevstep.x - newPosition.x;
            let y = this.prevstep.y - newPosition.y;
            this.prevstep = newPosition;
            let xx = PIXICS.transScale(display.actualWidth);
            pg.planckBody.setLinearVelocity(planck.Vec2(-x * xx, y * xx));
        }
    }
    pg.getGraphic().interactive = true;
    pg.getGraphic().on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
}
