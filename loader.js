async function initPixics() {
    let scriptlist = [
        "https://pixijs.download/v6.1.2/pixi.js",
        "https://cdn.jsdelivr.net/gh/kstost/ksttool/ksttool.js",
        "https://cdn.jsdelivr.net/gh/kstost/PIXICS@latest/PIXICS.js",
        "https://cdn.jsdelivr.net/gh/kstost/PIXICS@latest/system.js",
        "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@4bea859e7b1bab55429d76e03f72b1de72edc5f8/dist/box2d.umd.js",
        // "https://rawcdn.githack.com/flyover/box2d.ts/master/dist/box2d.umd.js",
    ];
    for (let i = 0; i < scriptlist.length; i++) {
        let scr = document.createElement('script');
        scr.src = scriptlist[i];
        document.querySelector('head').appendChild(scr);
        await new Promise((resolve, reject) => {
            scr.addEventListener('load', resolve);
        });
    }
    return { displaySystem, };
}
