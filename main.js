//------------------------------
function log(v) {
    if (!log.count) { log.count = 0; }
    log.count++;
    let el = document.querySelector('#log');
    if (el) {
        el.innerHTML += `${log.count} - ${v}<br />`
    }
}
//------------------------------
// 픽시스크린의 준비
// let display = displaySystem(1080, 1920, !true);
let display = {};
let app = new PIXI.Application({
    width: 300,//display.sizeCalc().width,
    height: 300,//display.sizeCalc().height,
    antialias: true,
    resolution: window.devicePixelRatio,
    autoDensity: true,
});
display.width = app.screen.width;
display.height = app.screen.height;
document.querySelector('body').appendChild(app.view);
app.stage.sortableChildren = true;

log(app.screen.width)
log(app.screen.height)

//------------------------------
// 피직스월드의 준비
const gravity = planck.Vec2(0, -10);
const pixics = PIXICS.createWorld(50, gravity);;
const world = pixics.world;
pixics.update(function (dt) { /*매프레임마다 수행시킬코드*/ });

//------------------------------
// 화면 사방을 막아주는 바운더리 요소를 만들어서 화면에 등장시키기
let 선굵기 = (1);
let 바운더리 = new PIXICS.PhysicsGraphics({ world });
바운더리.getBody().setBullet(true); // 컨티너스컬리젼디텍션 켜기
바운더리.drawRect(0, 0, (display.width), 선굵기);
바운더리.drawRect(0, (display.height) - 선굵기, (display.width), 선굵기);
바운더리.drawRect(0, 0, 선굵기, (display.height));
바운더리.drawRect((display.width) - 선굵기, 0, 선굵기, (display.height));
바운더리.getGraphic().tint = 0xffffff;
app.stage.addChild(바운더리.getGraphic());


let 여러가지조합 = new PIXICS.PhysicsGraphics({ world });
여러가지조합.setDynamic();
여러가지조합.getGraphic().tint = 0x00aa00; // 색 지정이 가능. 그래픽요소의 기본색은 흰색
여러가지조합.drawCircle(0, 0, 30);
여러가지조합.setPosition(150, 150)
여러가지조합.setDensity(1)
여러가지조합.setRestitution(0)
app.stage.addChild(여러가지조합.getGraphic()); // 그래픽요소를 화면에 추가
여러가지조합.getGraphic().interactive = true;
여러가지조합.getBody().setGravityScale(1)
let ev = e => {
    여러가지조합.getBody().setLinearVelocity(planck.Vec2(0, 9));
};
여러가지조합.getGraphic().on('mousedown', ev)
여러가지조합.getGraphic().on('touchstart', ev)


