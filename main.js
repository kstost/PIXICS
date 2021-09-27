//------------------------------
// 스크린의 준비
const display = displaySystem(1080, 1920, false); // 스크린너비, 스크린높이, 성능측정모니터사용여부
const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
document.querySelector('body').appendChild(app.view);

//------------------------------
// 피직스월드의 준비
const gravity = planck.Vec2(0, -20); // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
const pixics = PIXICS.createWorld(50 * ratio, gravity);
const world = pixics.world;
pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

// 사각형을 하나 생성
let rect = new PIXICS.PhysicsGraphics({ world });
rect.drawRect(0, 0, 100, 100);
rect.getGraphic().tint = 0xffffff;
app.stage.addChild(rect.getGraphic());

// 사각형의 색을 변경
pixics.setTimeout(() => {
    rect.getGraphic().tint = 0xffff00;
}, 1000);

// 중력의 영향을 받도록 적용
pixics.setTimeout(() => {
    rect.setDynamic();
}, 2000);

// 중력의 영향을 받지않는 요소로 전환
pixics.setTimeout(() => {
    rect.setStatic();
}, 3000);

// 다시 중력의 영향을 받도록 적용
pixics.setTimeout(() => {
    rect.setDynamic();
}, 4000);

// {
//     let dd = new Date();
//     pixics.setTimeout(() => {
//         console.log(new Date() - dd);
//         // rect.getGraphic().tint = 0xffff00;
//     }, 1000);

// }

if (false) {
    //------------------------------
    // 화면 사방을 막아주는 바운더리 요소를 만들어서 화면에 등장시키기
    let 선굵기 = (11 * ratio);
    let 바운더리 = new PIXICS.PhysicsGraphics({ world });
    바운더리.getBody().setBullet(true); // 컨티너스컬리젼디텍션 켜기
    바운더리.drawRect(0, 0, (display.width), 선굵기);
    // 바운더리.drawRect(0, (display.height) - 선굵기, (display.width), 선굵기);
    바운더리.drawRect(0, 0, 선굵기, (display.height));
    바운더리.drawRect((display.width) - 선굵기, 0, 선굵기, (display.height));
    바운더리.getGraphic().tint = 0xffffff;
    app.stage.addChild(바운더리.getGraphic());

    let 바닥 = new PIXICS.PhysicsGraphics({ world });
    바닥.getBody().setBullet(true); // 컨티너스컬리젼디텍션 켜기
    바닥.drawRect(0, (display.height) - 선굵기, (display.width), 선굵기);
    바닥.getGraphic().tint = 0x9944aa;
    app.stage.addChild(바닥.getGraphic());

    // 막대기.getGraphic().tint = 0xffffff;

    let 가장위막대기;
    for (let i = 1; i < 0; i++) {
        let 길이 = 1080 / 2 * ratio;
        let 막대기 = new PIXICS.PhysicsGraphics({ world });
        막대기.setFriction(1);
        막대기.drawRect(0, 0, (길이), (10)); // 사각형 그리기. 사각형을 그려주는 위치는 회전축과 연관이 있게된다
        if (i % 2) {
            막대기.setPosition(0 * ratio, (1920 * 0.02 * ratio) * (i + 1))
        } else {
            막대기.setPosition(1080 / 2 * ratio, (1920 * 0.02 * ratio) * (i + 1))
        }
        막대기.getBody().setBullet(true);
        막대기.getBody().setKinematic();
        app.stage.addChild(막대기.getGraphic());
        1 && (async () => {
            while (true) {
                if (false) {
                    if (i % 2) {
                        await 막대기.moveBy(1080 / 2 * ratio, 0, 100, 'easeInOutQuad');
                        await 막대기.moveBy(-1080 / 2 * ratio, 0, 100, 'easeInOutQuad');
                    } else {
                        await 막대기.moveBy(-1080 / 2 * ratio, 0, 100, 'easeInOutQuad');
                        await 막대기.moveBy(1080 / 2 * ratio, 0, 100, 'easeInOutQuad');
                    }
                } else {
                    if (i % 2) {
                        await 막대기.moveEaseBy(1080 / 2 * ratio, 0, 2100, 'easeInOutQuad');
                        await 막대기.moveEaseBy(-1080 / 2 * ratio, 0, 2100, 'easeInOutQuad');
                    } else {
                        await 막대기.moveEaseBy(-1080 / 2 * ratio, 0, 2100, 'easeInOutQuad');
                        await 막대기.moveEaseBy(1080 / 2 * ratio, 0, 2100, 'easeInOutQuad');
                    }
                }
            }
        })();
        if (i === 1) {
            가장위막대기 = 막대기;
        }
    }
    if (false) {
        let 길이 = 1080 / 2 * ratio;
        let 막대기 = new PIXICS.PhysicsGraphics({ world });
        막대기.setFriction(1);
        막대기.drawRect(0, 0, (길이), (10)); // 사각형 그리기. 사각형을 그려주는 위치는 회전축과 연관이 있게된다
        막대기.setPosition(0 * ratio, (1920 * 0.2 * ratio) * 3)
        막대기.getBody().setBullet(true);
        막대기.getBody().setKinematic();
        // 막대기.getBody().setAngularVelocity(0.1);
        app.stage.addChild(막대기.getGraphic());
        1 && (async () => {
            while (true) {
                // await 막대기.moveBy(0, 100, 3);
                // await 막대기.moveBy(0, -100, 30);
                await 막대기.moveEaseBy(1080 / 2 * ratio, 0, 2000, 'easeInOutQuad');
                await 막대기.moveEaseBy(-1080 / 2 * ratio, 0, 2000, 'easeInOutQuad');
                // await 막대기.moveEaseBy(0, 0, 1000, 'easeInOutQuad');
                // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/3, 1000, 'easeInOutQuad');
                // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/2, 1000, 'easeInOutCubic');
                // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/3, 1000, 'easeInOutCubic');
            }
        })();
    }
    // {
    //     let 길이 = 1080 / 2 * ratio;
    //     let 막대기 = new PIXICS.PhysicsGraphics({ world });
    //     막대기.setFriction(1);
    //     막대기.drawRect(0, 0, (길이), (10)); // 사각형 그리기. 사각형을 그려주는 위치는 회전축과 연관이 있게된다
    //     막대기.setPosition(0 * ratio, (1920 * 0.2 * ratio) * 2)
    //     막대기.getBody().setBullet(true);
    //     막대기.getBody().setKinematic();
    //     // 막대기.getBody().setAngularVelocity(0.1);
    //     app.stage.addChild(막대기.getGraphic());
    //     1 && (async () => {
    //         while (true) {
    //             // await 막대기.moveBy(0, 100, 3);
    //             // await 막대기.moveBy(0, -100, 30);
    //             await 막대기.moveEaseBy(1080 / 2 * ratio, 0, 3000, 'easeInOutQuad');
    //             await 막대기.moveEaseBy(-1080 / 2 * ratio, 0, 3000, 'easeInOutQuad');
    //             // await 막대기.moveEaseBy(0, 0, 1000, 'easeInOutQuad');
    //             // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/3, 1000, 'easeInOutQuad');
    //             // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/2, 1000, 'easeInOutCubic');
    //             // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/3, 1000, 'easeInOutCubic');
    //         }
    //     })();
    // }
    // {
    //     let 길이 = 1080 / 2 * ratio;
    //     let 막대기 = new PIXICS.PhysicsGraphics({ world });
    //     막대기.setFriction(1);
    //     막대기.graphic.tint = 0xff0000;
    //     막대기.drawRect(0, 0, (길이), (10)); // 사각형 그리기. 사각형을 그려주는 위치는 회전축과 연관이 있게된다
    //     막대기.setPosition(0 * ratio, (1920 * 0.2 * ratio) * 1)
    //     막대기.getBody().setBullet(true);
    //     막대기.getBody().setKinematic();
    //     // 막대기.getBody().setAngularVelocity(0.1);
    //     app.stage.addChild(막대기.getGraphic());
    //     1 && (async () => {
    //         while (true) {
    //             // await 막대기.moveBy(0, 100, 3);
    //             // await 막대기.moveBy(0, -100, 30);
    //             await 막대기.moveEaseBy(1080 / 2 * ratio, 0, 4000, 'easeInOutQuad');
    //             await 막대기.moveEaseBy(-1080 / 2 * ratio, 0, 4000, 'easeInOutQuad');
    //             // await 막대기.moveEaseBy(0, 0, 1000, 'easeInOutQuad');
    //             // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/3, 1000, 'easeInOutQuad');
    //             // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/2, 1000, 'easeInOutCubic');
    //             // await 막대기.moveEaseTo(1080/4*ratio, 1920*ratio/3, 1000, 'easeInOutCubic');
    //         }
    //     })();
    //     가장위막대기 = 막대기;

    // }

    // 막대기.drawRect(-((display.width / 2)/2), -5, (display.width / 2), 10);
    // 막대기.setPosition(1080 / 3 * ratio, 1920 / 2 * ratio);
    // 막대기
    // 막대기.getBody().setLinearVelocity(planck.Vec2(2,0))
    // let { x, y } = 막대기.getPosition();
    // setTimeout(()=>{
    // },100);

    // let 돌아가는막대 = new PIXICS.PhysicsGraphics({ world });
    // 돌아가는막대.drawRect((-10000 / 2), (-5), (10000), (10)); // 사각형 그리기. 사각형을 그려주는 위치는 회전축과 연관이 있게된다
    // 돌아가는막대.setPosition((1080 / 2) * ratio, (1920 / 2) * ratio)
    // 돌아가는막대.getBody().setBullet(true); // 막대는 얇고 얇은만큼 이 옵션을 안켜주면 충돌체가 투과해버릴 수 있다
    // 돌아가는막대.getBody().setKinematic(); // 다이나믹과 다르게 중력에 영향을 받지 않으며 Velocity 값이 영속적이게 된다
    // 돌아가는막대.getBody().setAngularVelocity(1); // 자율적이고 영속적인 회전힘을 부여
    // app.stage.addChild(돌아가는막대.getGraphic()); // 그래픽요소를 화면에 추가

    // function moveEase() {

    // }
    // console.log(pixics.update)

    // for (let i = 0; i < 1; i++) {
    // 여러가지조합.drawRect(50 * ratio, 50 * ratio, 550 * ratio, 90 * ratio);
    // 여러가지조합.getBody().setBullet(true);
    function getBox() {
        let alive = true;
        let 여러가지조합 = new PIXICS.PhysicsGraphics({ world });
        여러가지조합.setDynamic();
        여러가지조합.getGraphic().tint = 0x00aa00; // 색 지정이 가능. 그래픽요소의 기본색은 흰색
        여러가지조합.drawRect(0, 0, 100 * ratio, 100 * ratio);
        여러가지조합.setPosition(1080 / 2 * ratio, 1920 * 0.9 * ratio)
        여러가지조합.setDensity(1000000)
        여러가지조합.setRestitution(0)
        여러가지조합.setFriction(1);
        app.stage.addChild(여러가지조합.getGraphic()); // 그래픽요소를 화면에 추가
        여러가지조합.getGraphic().interactive = true;
        여러가지조합.getBody().setGravityScale(0.2)
        let ev = e => {
            if (!alive) return;
            if (여러가지조합.getContactList().filter(a => a !== 바운더리.getBody()).length === 0) return;
            let vel = 여러가지조합.getBody().getLinearVelocity();
            여러가지조합.getBody().setLinearVelocity(planck.Vec2(0 + vel.x, 50 + vel.y));
        };
        여러가지조합.getGraphic().on('mousedown', ev)
        여러가지조합.getGraphic().on('touchstart', ev)
        let timen = 0;
        pixics.update(function uup(dt) {
            let posdi = (Math.abs(가장위막대기.getBody().getLinearVelocity().x - 여러가지조합.getBody().getLinearVelocity().x));
            // let contact = 여러가지조합.getContactList();
            if (currentRect.isConnectedWith(가장위막대기) && posdi < 5) {
                timen += dt;
                if (timen > 1 * 120) {
                    alive = false;
                    pixics.unupdate(uup);
                    currentRect.setDensity(1000);
                    currentRect = getBox();
                }
            } else {
                timen = 0;
            }
        });
        return 여러가지조합;
    }
    if (false) {
        let currentRect = getBox();


        let 투명스프라이트 = new PIXI.Graphics();
        투명스프라이트.beginFill(0x00ffff);
        투명스프라이트.drawRect(0, 0, display.width, display.height);
        투명스프라이트.endFill();
        투명스프라이트.alpha = 0;
        투명스프라이트.interactive = true;
        app.stage.addChild(투명스프라이트);
        let tcc = () => {
            currentRect.getGraphic().emit('mousedown');
        }
        투명스프라이트.on('touchstart', tcc);
        투명스프라이트.on('mousedown', tcc);
        // app.stage.interactive = true;
        // 
        // setInterval(ev, 1000 + (Math.random() * 1000))
        // }
        // setInterval(ev, 1000)
        if (false) {
            let bbb = 여러가지조합;
            let contactList = new Map();
            for (let b = bbb.planckBody.getContactList(); b; b = b.next) {
                let aa = b.contact.getFixtureA().getBody();
                let bb = b.contact.getFixtureB().getBody();
                if (bbb.planckBody !== aa) { !contactList.has(aa) && contactList.set(aa, true) }
                if (bbb.planckBody !== bb) { !contactList.has(bb) && contactList.set(bb, true) }
            }
            console.log([...contactList.keys()]);

        }
    }




    let 길이 = 1080 / 2 * ratio;
    let 막대기 = new PIXICS.PhysicsGraphics({ world });
    막대기.graphic.tint = 0x00aaff
    막대기.setFriction(1);
    막대기.drawRect(-10, -10, (길이), (20)); // 사각형 그리기. 사각형을 그려주는 위치는 회전축과 연관이 있게된다
    막대기.setPosition(1080 / 2 * ratio, (1920 / 2 * ratio))
    막대기.getBody().setBullet(true);
    막대기.getBody().setKinematic();

    // 막대기.getBody().setAngularVelocity(-0.1);
    app.stage.addChild(막대기.getGraphic());
    1 && (async () => {
        // await 막대기.moveEaseBy(-(Math.PI/4), null, 210, 'easeInOutQuad');
        while (true) {
            await 막대기.rotateEaseBy(-(Math.PI / 4), 1100, 'easeInOutQuad');
            await 막대기.rotateEaseBy((Math.PI / 4), 110, 'easeInOutQuad');
            // await 막대기.moveEaseBy(-1080 / 2 * ratio, null, 2100, 'easeInOutQuad');
        }
    })();
}