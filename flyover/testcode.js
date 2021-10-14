
function delay(t) {
    return new Promise(r => setTimeout(r, t));
}
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
    [...document.querySelectorAll('div')].forEach((div, i) => { if (i === 7) { div.remove(); } })

    {
        let dot = null;
        const bod = new b2.BodyDef();
        dot = this.m_world.CreateBody(bod);
        dot.SetGravityScale(0)

        let position = new b2.Vec2(0, 0);
        const shape2 = new b2.CircleShape();
        // shape2.SetAsBox(0.1, 0.1, position)
        shape2.m_p.Set(position.x, position.y);
        shape2.m_radius = 1;

        const fd2 = new b2.FixtureDef();
        fd2.shape = shape2;
        fd2.density = 1;
        dot.CreateFixture(fd2);
    }

    {
        let ratio = 1;
        let dot = null;
        const bod = new b2.BodyDef();
        dot = this.m_world.CreateBody(bod);
        dot.getBody = () => dot;
        dot.setDynamic = () => dot.SetType(b2.BodyType.b2_dynamicBody);
        dot.setDensity = (v, k) => {
            let fx;
            fx = dot.GetFixtureList();
            let list = [];
            while (true) {
                fx && list.push(fx);
                fx = fx.GetNext();
                if (!fx) break;
            }
            list[list.length - 1 - k].SetDensity(v);
        };
        aaa = dot;

        {
            let position = new b2.Vec2(0, 0);
            const shape2 = new b2.PolygonShape();
            shape2.SetAsBox(4, 4, position)
            const fd2 = new b2.FixtureDef();
            fd2.shape = shape2;
            fd2.density = 1;
            dot.CreateFixture(fd2);
        }
        {
            let position = new b2.Vec2(4, -4);
            const shape2 = new b2.PolygonShape();
            shape2.SetAsBox(4, 4, position)
            const fd2 = new b2.FixtureDef();
            fd2.shape = shape2;
            fd2.density = 1;
            dot.CreateFixture(fd2);
        }
        dot.getBody().SetGravityScale(0)
        // dot.setDynamic();

        let histo = [];
        function check() {
            let val = [{ ...dot.GetPosition() }, dot.GetAngle()];
            histo.push(val);
            console.log(JSON.stringify(val));
        }



        //===========
        dot.setDensity(10, 1); dot.setDensity(1000, 0);
        dot.setDynamic();
        dot.SetAngle(Math.PI / 4); check();
        dot.SetPosition(new b2.Vec2(4 * ratio, 0)); check();
        dot.SetPosition(new b2.Vec2(4 * ratio, 4 * ratio)); check();
        dot.SetAngle(dot.GetAngle() + 0.4); check();
        dot.getBody().SetAngularVelocity(-1)
        await delay(500); dot.getBody().SetAngularVelocity(0); check();
        await delay(500); dot.getBody().SetType(b2.BodyType.b2_kinematicBody);
        await delay(500); dot.getBody().SetAngularVelocity(1);
        await delay(500); dot.getBody().SetAngularVelocity(0); check();
        console.log(md5(JSON.stringify(histo)))
          // dot.setDensity(1000, 1); dot.setDensity(1, 0);
        // dot.setDynamic();
        // await delay(500); dot.getBody().SetAngularVelocity(-1);
        // await delay(500); dot.getBody().SetAngularVelocity(0); check();
  

        //   .filter(div => div.querySelector('select')?.length !== null).forEach(div => div.remove())

        // return
        // dot.SetType(b2.BodyType.b2_kinematicBody)
        // console.log('==============')
        // dot.SetAngle(0.2);
        // console.log(dot.GetAngle())
        // console.log(dot.GetPosition())
        // dot.SetPosition(new b2.Vec2(-0.27, 2))
        // dot.SetType(b2.BodyType.b2_dynamicBody)
        // // dot.SetPosition(new b2.Vec2(0,2))
        // console.log(dot.GetPosition())
        // console.log(dot.GetAngle())
        // console.log(dot.GetLocalCenter())

        // // dot.SetAngle(0.98);
        // dot.SetAngularVelocity(1)
        // await delay(16 * 49)
        // dot.SetAngularVelocity(0)
        // console.log('...')
        // console.log(dot.GetPosition())
        // console.log(dot.GetAngle())
        // console.log(dot.GetLocalCenter())

        // dot.SetType(b2.BodyType.b2_staticBody)
        // dot.SetPosition(new b2.Vec2(1,1))
        // console.log('...')
        // console.log(dot.GetPosition())
        // console.log(dot.GetAngle())
        // console.log(dot.GetLocalCenter())


        // console.log(dot.GetLocalCenter())
        // dot.SetPosition(new b2.Vec2(0,0))
        // console.log(dot.GetPosition())

        // window.mm=dot;







        return
        dot.SetType(b2.BodyType.b2_dynamicBody)
        console.log(dot.GetLocalCenter())
        console.log(dot.GetLocalCenter())
        console.log(dot.GetPosition())
        dot.SetAngularVelocity(1)
        await delay(16 * 99)
        console.log(dot.GetPosition())
        console.log(dot.GetAngle())
        dot.SetAngularVelocity(0)

        aaa = dot
        return;



        dot.SetType(b2.BodyType.b2_kinematicBody)
        dot.SetAngularVelocity(1)
        await delay(16 * 99)
        dot.SetAngularVelocity(0)
        console.log(dot.GetAngle(), dot.GetPosition())
        await delay(500)
        dot.SetType(b2.BodyType.b2_dynamicBody)
        dot.SetAngularVelocity(1)
        await delay(16 * 99)
        dot.SetAngularVelocity(0)
        console.log(dot.GetAngle(), dot.GetPosition())
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);
        await delay(16 * 10); dot.SetAngle(dot.GetAngle() - 0.31415);

        // dot.SetType(b2.BodyType.b2_kinematicBody)

        // // dot.SetType(b2.BodyType.b2_kinematicBody)
        // dot.SetPosition(new b2.Vec2(0, 0));
        // dot.SetGravityScale(0)
        // console.log(dot.GetPosition())
        // setTimeout(a => {
        //     // dot.SetAngularVelocity(0);
        //     console.log(dot.GetAngle())
        //     console.log(dot.GetPosition())
        //     // dot.SetType(b2.BodyType.b2_dynamicBody)
        //     // dot.SetType(b2.BodyType.b2_kinematicBody)
        //     // setTimeout(a => {
        //     //     dot.SetAngularVelocity(0);
        //     //     console.log(dot.GetAngle())
        //     //     console.log(dot.GetPosition())

        //     //     // dot.SetAngle(0)
        //     //     console.log(dot.GetPosition())
        //     //     dot.SetType(b2.BodyType.b2_staticBody)

        //     // }, 16 * 99)

        // }, 16 * 99)
        // aaa = dot

    }
    // {
    //     let position = new b2.Vec2(2, 2);
    //     let dot = null;
    //     const bod = new b2.BodyDef();
    //     dot = this.m_world.CreateBody(bod);
    //     const shape2 = new b2.PolygonShape();
    //     shape2.SetAsBox(2, 2, position)
    //     const fd2 = new b2.FixtureDef();
    //     fd2.shape = shape2;
    //     fd2.density = 1;
    //     dot.CreateFixture(fd2);
    //     dot.SetType(b2.BodyType.b2_staticBody)
    //     dot.SetPosition(new b2.Vec2(0, 0));
    // }
    // {
    //     let position = new b2.Vec2(-2, -2);
    //     let dot = null;
    //     const bod = new b2.BodyDef();
    //     dot = this.m_world.CreateBody(bod);
    //     const shape2 = new b2.PolygonShape();
    //     shape2.SetAsBox(2, 2, position)
    //     const fd2 = new b2.FixtureDef();
    //     fd2.shape = shape2;
    //     fd2.density = 1;
    //     dot.CreateFixture(fd2);
    //     dot.SetType(b2.BodyType.b2_staticBody)
    //     dot.SetPosition(new b2.Vec2(0, 0));
    // }
    return;

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
    vertices.push(new b2.Vec2(-20, -20));
    vertices.push(new b2.Vec2(55, -20));
    vertices.push(new b2.Vec2(11, 15));
    vertices.push(new b2.Vec2(-20, 11));
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


function md5(string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}
