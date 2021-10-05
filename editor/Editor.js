import Common from './Common.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
function createEditor(global) {
    let editor = document.createElement('textarea');
    global.editor = editor;
    editor.style.position = 'fixed';
    editor.style.right = '0px';
    editor.style.top = '0px';
    editor.style.width = '200px';
    editor.style.height = '200px';
    document.body.append(editor);
    editor.addEventListener('keyup', function () {
        try {
            let data = JSON.parse(this.value);
            getActiveObj(global).setColor(Number(data.color));
        } catch (e) { }
    });
}
export {
    createEditor
}