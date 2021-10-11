
async function init(m_world) {

    {
        let bd = new b2.BodyDef();
        bd.position.Set(0.0, 0.0);
        bd.type = b2.BodyType.b2_kinematicBody;
        let tumblerBox = m_world.CreateBody(bd);
        var shape = new b2.PolygonShape();
        shape.SetAsBox(30, 0.3, new b2.Vec2(0, 0), Math.PI);
        tumblerBox.CreateFixture(shape, 1.0);
        tumblerBox.SetPosition(new b2.Vec2(0, -24));

        aaa=tumblerBox;
    }
    {
        let bd = new b2.BodyDef();
        bd.position.Set(0.0, 0.0);
        bd.type = b2.BodyType.b2_kinematicBody;
        let tumblerBox = m_world.CreateBody(bd);
        var shape = new b2.PolygonShape();
        shape.SetAsBox(30, 0.3, new b2.Vec2(0, 0), Math.PI);
        tumblerBox.CreateFixture(shape, 1.0);
        tumblerBox.SetPosition(new b2.Vec2(0, 24));
    }
    {
        let bd = new b2.BodyDef();
        bd.position.Set(0.0, 0.0);
        bd.type = b2.BodyType.b2_kinematicBody;
        let tumblerBox = m_world.CreateBody(bd);
        var shape = new b2.PolygonShape();
        shape.SetAsBox(0.3, 30, new b2.Vec2(0, 0), Math.PI);
        tumblerBox.CreateFixture(shape, 1.0);
        tumblerBox.SetPosition(new b2.Vec2(-24, 0));
    }
    {
        let bd = new b2.BodyDef();
        bd.position.Set(0.0, 0.0);
        bd.type = b2.BodyType.b2_kinematicBody;
        let tumblerBox = m_world.CreateBody(bd);
        var shape = new b2.PolygonShape();
        shape.SetAsBox(0.3, 30, new b2.Vec2(0, 0), Math.PI);
        tumblerBox.CreateFixture(shape, 1.0);
        tumblerBox.SetPosition(new b2.Vec2(24, 0));
    }
    {
        for (let i = 0; i < 1000; i++) {
            await delay(1);
            let bd = new b2.BodyDef();
            bd.position.Set(0.0, 0.0);
            bd.type = b2.BodyType.b2_dynamicBody;
            let tumblerBox = m_world.CreateBody(bd);
            // var shape = new b2.CircleShape();
            // shape.m_radius = 0.5
            var shape = new b2.PolygonShape();
            shape.SetAsBox(0.2, 0.2, new b2.Vec2(0, 0), 0.0);

            let fixture = tumblerBox.CreateFixture(shape, 1.0);
            tumblerBox.SetPosition(new b2.Vec2((40 * Math.random()) - 20, 20));
            fixture.SetRestitution(1.1)
        }
    }

}