window.addEventListener('load', async () => {

    `
       Linked Contact
       --------------
       접촉의 연결을 구현해두었다.
       그리고 이것의 이름을 Linked Contact 라고 이름지었다.
       Linked Contact란 A와 B가 직접 붙어있지 않다 하더라도 A와 C가 연결되어있고 C와 B가 연결되어있다면 A와 B도 붙어있다고 보는것이다
 
       A.isRelatedTo(B) 의 방법으로 두 요소가 이어져있는지 확인 할 수 있다
 
       예시에서 흰색 바구니에 직간접적으로 닿게되는 공은 녹색이 된다
       바구니에 담기지 못하고 떨어지는 공들은 바닥에 쌓이게 되어 그 높이가 파란막대에 닿을정도로 쌓이게 된다
       파란막대는 직접적으로 흰색바구니와 닿아있고 바닥에 떨어진 공들은 파란막대를 통해서 간접적으로 바구니와 연결되게 된다
       
       요소를 터치하면 이 연결고리에서 제외시킬 수 있다.
       A B C 의 요소가 맞닿아있을때 B 를 터치해서 연결고리에서 제외시키면 A, C는 닿지 않은것이 된다
       화면상에서는 연결고리에서 제외시키면 흐려지게 표시해두었다
       setContactable 함수를 통해 연결고리에서 제외시킬 수 있으며 getContactable로 상태를 확인할 수 있다
       파란 막대는 바구니와 바닥에 떨어진 공들을 이어주는 매개체이다.
       파란 막대를 터치해서 파란막대를 연결고리에서 제외하면 바닥의 공들은 바구니와 간접적으로도 이어지지 못하게된다
 
       Contact가 이루어지기 위해서는 접촉대상이 될 두 요소중 적어도 한쪽의 BodyType 은 b2_kinematicBody 이거나 b2_dynamicBody 이도록 해야한다
    `

    const { app, pixics, world, size, PIXICS, b2 } = await initPixics({
        resolution: { width: 1080, height: 1920 },
        fpsmonitor: true,
        container: document.querySelector('body'),
        gravity: { x: 0, y: -10 },
        worldscale: 200,
        scriptlist: [
            "https://pixijs.download/v7.0.4/pixi.min.js",
            "../src/pixics.src.js",
            "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@52eb0773a59592dc573c4bc4d0f1451676a43ef9/dist/box2d.umd.js",
        ]
    });
    const { ratio } = size;
    const { width, height } = size.actualSize;
    const L = pixics.log;

    // 바운더리 생성
    let tickness = 10 * ratio;
    let boundary = new PIXICS.PhysicsGraphics({ world });
    boundary.getBody().SetBullet(true);
    boundary.drawRect(width / 2, 0, tickness, height);
    boundary.drawRect(-width / 2, 0, tickness, height);
    boundary.drawRect(0, height / 2, width, tickness);
    boundary.drawRect(0, -height / 2, width, tickness);
    boundary.setContactable(false);
    app.stage.addChild(boundary.getGraphic());

    // 파란막대 생성
    let bar = new PIXICS.PhysicsGraphics({ world });
    bar.getBody().SetBullet(true);
    bar.drawRect(0, (-height / 4) + 300 * ratio, tickness * 8, height / 4);
    bar.getGraphic().tint = 0x00aaff;
    bar.getBody().SetType(b2.BodyType.b2_kinematicBody);
    setEvent(bar.getGraphic(), ['mousedown', 'touchstart'], e => linkManage(bar));
    app.stage.addChild(bar.getGraphic());

    // 바구니 생성
    let json = { "layers": [{ "dots": { "polygon": [{ "x": 630, "y": 60 }, { "x": 780, "y": 450 }, { "x": 750, "y": 480 }, { "x": 600, "y": 60 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 960, "y": 450 }, { "x": 1140, "y": 60 }, { "x": 1170, "y": 60 }, { "x": 990, "y": 480 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 780, "y": 450 }, { "x": 960, "y": 450 }, { "x": 990, "y": 480 }, { "x": 750, "y": 480 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }], "pivotpoint": { "x": 870, "y": 480 }, "scale": 30 }
    let baguni = new PIXICS.PhysicsGraphics({ world });
    baguni.drawJSON({ scale: 30, json: json })
    baguni.setFriction(0);
    baguni.setGravityScale(0);
    baguni.setPosition(0 * ratio, 0);
    app.stage.addChild(baguni.getGraphic());
    setEvent(baguni.getGraphic(), ['mousedown', 'touchstart'], e => linkManage(baguni));

    //----
    function linkManage(item) {
        item.setContactable(!item.getContactable());
        item.getGraphic().alpha = !item.getContactable() ? 0.5 : 1;
    }
    function setEvent(thing, names, fn) {
        thing.interactive = true;
        [names].flat(Infinity).forEach(name => thing.on(name, fn));
    }
    function generateBall() {
        let radius = 50 * ratio;
        let ball = new PIXICS.PhysicsGraphics({ world });
        ball.drawCircle(0, 0, radius, 0xffffff);
        ball.setDynamic()
        ball.setRestitution(0.2)
        ball.setFriction(0); // 공의 마찰력이다. 이것을 0으로 하면 공끼리 닿을때 닿은 마찰로 인해 공이 돌아갈 일이없다. 숫자를 보기 쉽게하기 위함이다.
        ball.setPosition(Math.random(), 800 * ratio);
        ball.turnning = mode => ball.getGraphic().tint = mode ? 0xff0000 : 0x00aa00;
        ball.turnning(!false);

        // 닿은 요소 갯수 표시 텍스트 만들기
        let text = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 70 * ratio, fill: 0x000000, align: 'center' });
        ball.getGraphic().addChild(text);
        function setLabel(val) {
            text.text = val;
            text.x = -(text.width / 2)
            text.y = -(text.height / 2)
        }

        app.stage.addChild(ball.getGraphic());
        const detect = function () {
            setLabel(ball.getContactCount());
            if (ball.isRelatedTo(baguni)) {
                ball.turnning(false);
            } else {
                ball.turnning(!false);
            }
        };
        ball.setUpdate(detect); // ball.isUpdating(detect) 와 ball.remUpdate(detect) 사용가능
        setEvent(ball.getGraphic(), ['mousedown', 'touchstart'], e => linkManage(ball));

        // 컨택트 이벤트 등록 (Linked Contact의 작동과는 상관없음)
        bar.addEvent('contact', ball, function (ball) {
        });
        bar.addEvent('untact', ball, function (ball) {
        });
    }

    // 공 100개 생성
    let cnt = 0;
    let pid = setInterval(() => {
        generateBall();
        cnt++;
        if (cnt > 100) clearInterval(pid);
    }, 50)

    // 중력 변경을 통해 들썩거리게 하기
    while (true) {
        world.SetGravity(new b2.Vec2(0, 10))
        await pixics.sleep(100)
        world.SetGravity(new b2.Vec2(0, -10))
        await pixics.sleep(2000)
    }

});