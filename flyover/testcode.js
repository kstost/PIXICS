
async function init(m_world) {
    // let dd = null;
    // const ds = new b2.BodyDef();
    // dd = this.m_world.CreateBody(ds);
    // const sfs = new b2.CircleShape();
    // sfs.m_radius = 1;
    // const dfsd = new b2.FixtureDef();
    // dfsd.shape = sfs;
    // dd.CreateFixture(dfsd);
    // dd.SetType(b2.BodyType.b2_staticBody)
    // dd.SetPosition(new b2.Vec2(0, -0));

    let dot = null;
    const bod = new b2.BodyDef();
    dot = this.m_world.CreateBody(bod);
    const shape2 = new b2.CircleShape();
    shape2.m_radius = 2;
    // shape2.m_p.Set(0,0);
    const fd2 = new b2.FixtureDef();
    fd2.shape = shape2;
    fd2.density = 1;
    dot.CreateFixture(fd2);
    dot.SetType(b2.BodyType.b2_staticBody)
    dot.SetPosition(new b2.Vec2(0, 0));

    // let squ = null;
    // const bod2 = new b2.BodyDef();
    // squ = this.m_world.CreateBody(bod2);
    // const sp3 = new b2.PolygonShape();
    // sp3.SetAsBox(10, 10)
    // const fd3 = new b2.FixtureDef();
    // fd3.shape = sp3;
    // fd3.density = 1;
    // squ.CreateFixture(fd3);
    // // squ.SetType(b2.BodyType.b2_dynamicBody)
    // squ.SetPosition(new b2.Vec2(0, 0));

    let vvf = null;
    const bod3 = new b2.BodyDef();
    vvf = this.m_world.CreateBody(bod3);
    const sp4 = new b2.PolygonShape();
    let vertices = [];
    vertices.push(new b2.Vec2(-20,-20));
    vertices.push(new b2.Vec2(55,-20));
    vertices.push(new b2.Vec2(11,15));
    vertices.push(new b2.Vec2(-20,11));
    sp4.Set(vertices);

    const fd4 = new b2.FixtureDef();
    fd4.shape = sp4;
    fd4.density = 1;
    vvf.CreateFixture(fd4);
    vvf.SetType(b2.BodyType.b2_dynamicBody)
    vvf.SetPosition(new b2.Vec2(0, 0));
    vvf.SetGravityScale(0)
    // vvf.SetAngle(0.1)
    vvf.SetType(b2.BodyType.b2_kinematicBody);
    // vvf.SetAngularVelocity(1)


    // const jd = new b2.DistanceJointDef();
    // jd.Initialize(dot, squ, new b2.Vec2(-1, 0), new b2.Vec2(0, -10));
    // jd.collideConnected = true;
    // this.m_joint = this.m_world.CreateJoint(jd);
    // this.m_length = jd.length;
    // this.m_minLength = jd.minLength = jd.length - 3;
    // this.m_maxLength = jd.maxLength = jd.length + 3;
    // b2.LinearStiffness(jd, this.m_hertz, this.m_dampingRatio, jd.bodyA, jd.bodyB);

    // ground.SetAwake(false);
    return
    let floor = null;
    const bd = new b2.BodyDef();
    floor = this.m_world.CreateBody(bd);
    const shape = new b2.PolygonShape();
    shape.SetAsBox(100, 0.1);
    const fd = new b2.FixtureDef();
    fd.shape = shape;
    fd.density = 1;
    floor.CreateFixture(fd);
    floor.SetType(b2.BodyType.b2_staticBody)
    floor.SetPosition(new b2.Vec2(0, -25));
    {
        let ground = null;
        const bd = new b2.BodyDef();
        ground = this.m_world.CreateBody(bd);
        const shape = new b2.PolygonShape();
        shape.SetAsBox(3, 3);
        const fd = new b2.FixtureDef();
        fd.shape = shape;
        fd.density = 1;
        ground.CreateFixture(fd);
        ground.SetType(b2.BodyType.b2_dynamicBody)
        ground.SetPosition(new b2.Vec2(0, 13));


        const jd = new b2.DistanceJointDef();
        jd.Initialize(ground, dot, new b2.Vec2(0, 10), new b2.Vec2(0, 0));
        // jd.collideConnected = true;
        // this.m_length = jd.length;
        // this.m_minLength = jd.minLength = jd.length - 3;
        // this.m_maxLength = jd.maxLength = jd.length + 3;
        // b2.LinearStiffness(jd, this.m_hertz, this.m_dampingRatio, jd.bodyA, jd.bodyB);
        this.m_joint = this.m_world.CreateJoint(jd);
    }
    return;
    // {
    //     const bd = new b2.BodyDef();
    //     ground = this.m_world.CreateBody(bd);
    //     const shape = new b2.EdgeShape();
    //     shape.SetTwoSided(new b2.Vec2(-40.0, 0.0), new b2.Vec2(40.0, 0.0));
    //     ground.CreateFixture(shape, 0.0);
    // }
    // {
    //     const bd = new b2.BodyDef();
    //     bd.type = b2.BodyType.b2_dynamicBody;
    //     bd.angularDamping = 0.1;
    //     bd.position.Set(0.0, 5.0);
    //     const body = this.m_world.CreateBody(bd);
    //     const shape = new b2.PolygonShape();
    //     shape.SetAsBox(0.5, 0.5);
    //     body.CreateFixture(shape, 5.0);
    //     this.m_hertz = 1.0;
    //     this.m_dampingRatio = 0.7;
    //     const jd = new b2.DistanceJointDef();
    //     jd.Initialize(ground, body, new b2.Vec2(0.0, 15.0), bd.position);
    //     jd.collideConnected = true;
    //     this.m_length = jd.length;
    //     this.m_minLength = jd.minLength = jd.length - 3;
    //     this.m_maxLength = jd.maxLength = jd.length + 3;
    //     b2.LinearStiffness(jd, this.m_hertz, this.m_dampingRatio, jd.bodyA, jd.bodyB);
    //     this.m_joint = this.m_world.CreateJoint(jd);
    // }
    // return
    // {
    //     let bd = new b2.BodyDef();
    //     bd.position.Set(0.0, 0.0);
    //     bd.type = b2.BodyType.b2_kinematicBody;
    //     let tumblerBox = m_world.CreateBody(bd);
    //     var shape = new b2.PolygonShape();
    //     shape.SetAsBox(30, 0.3, new b2.Vec2(0, 0), Math.PI);
    //     tumblerBox.CreateFixture(shape, 1.0);
    //     tumblerBox.SetPosition(new b2.Vec2(0, -24));

    //     aaa = tumblerBox;
    // }
    // {
    //     let bd = new b2.BodyDef();
    //     bd.position.Set(0.0, 0.0);
    //     bd.type = b2.BodyType.b2_kinematicBody;
    //     let tumblerBox = m_world.CreateBody(bd);
    //     var shape = new b2.PolygonShape();
    //     shape.SetAsBox(30, 0.3, new b2.Vec2(0, 0), Math.PI);
    //     tumblerBox.CreateFixture(shape, 1.0);
    //     tumblerBox.SetPosition(new b2.Vec2(0, 24));
    // }
    // {
    //     let bd = new b2.BodyDef();
    //     bd.position.Set(0.0, 0.0);
    //     bd.type = b2.BodyType.b2_kinematicBody;
    //     let tumblerBox = m_world.CreateBody(bd);
    //     var shape = new b2.PolygonShape();
    //     shape.SetAsBox(0.3, 30, new b2.Vec2(0, 0), Math.PI);
    //     tumblerBox.CreateFixture(shape, 1.0);
    //     tumblerBox.SetPosition(new b2.Vec2(-24, 0));
    // }
    // {
    //     let bd = new b2.BodyDef();
    //     bd.position.Set(0.0, 0.0);
    //     bd.type = b2.BodyType.b2_kinematicBody;
    //     let tumblerBox = m_world.CreateBody(bd);
    //     var shape = new b2.PolygonShape();
    //     shape.SetAsBox(0.3, 30, new b2.Vec2(0, 0), Math.PI);
    //     tumblerBox.CreateFixture(shape, 1.0);
    //     tumblerBox.SetPosition(new b2.Vec2(24, 0));
    // }
    // {
    //     for (let i = 0; i < 1000; i++) {
    //         await delay(1);
    //         let bd = new b2.BodyDef();
    //         bd.position.Set(0.0, 0.0);
    //         bd.type = b2.BodyType.b2_dynamicBody;
    //         let tumblerBox = m_world.CreateBody(bd);
    //         // var shape = new b2.CircleShape();
    //         // shape.m_radius = 0.5
    //         var shape = new b2.PolygonShape();
    //         shape.SetAsBox(0.2, 0.2, new b2.Vec2(0, 0), 0.0);

    //         let fixture = tumblerBox.CreateFixture(shape, 1.0);
    //         tumblerBox.SetPosition(new b2.Vec2((40 * Math.random()) - 20, 20));
    //         fixture.SetRestitution(1.1)
    //     }
    // }

}