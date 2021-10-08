import Common from './Common.js'
import { saveData, loadData } from './Data.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
function createEditor(global) {
    let editors = {};
    let bodies = {};
    let tabs = {};
    let shapeButtons = {};

    let container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.right = '0px';
    container.style.top = '0px';
    container.style.padding = '10px';
    document.body.appendChild(container);

    let tabbar = document.createElement('div');
    container.appendChild(tabbar);
    // tabbar.style.position = 'fixed';
    // tabbar.style.right = '0px';
    // tabbar.style.top = '0px';

    function button() {
        let btn = document.createElement('button');
        btn.style.color = '#ffffff'
        btn.style.background = '#000000'
        btn.style.border = '1px solid green'
        btn.style.padding = '10px'
        return btn;

    }
    {
        let key = 'general';
        let btn = button();
        btn.innerText = 'General';
        tabbar.appendChild(btn);
        btn.addEventListener('click', e => turn(key));
        tabs[key] = btn;
        //--
        let editorbody = document.createElement('div');
        container.append(editorbody);
        let editor = document.createElement('textarea');
        // editor.style.display = 'none';
        editor.style.width = '200px';
        editor.style.height = '200px';
        editorbody.append(editor);
        editor.addEventListener('keyup', function () {
        });
        editors[key] = editor;
        bodies[key] = editorbody;
        {
            let input = document.createElement('div');
            input.innerText = 'Save & Export as JSON';
            input.style.cursor = 'pointer'
            input.style.color = 'white'
            input.style.padding = '5px'
            input.style.border = '1px solid #777'
            input.style.textAlign = 'center'
            input.style.background = '#000'
            editorbody.appendChild(input);
            input.addEventListener('click', e => {
                function copyToClipboard(val) {
                    const t = document.createElement("textarea");
                    document.body.appendChild(t);
                    t.value = val;
                    t.select();
                    document.execCommand('copy');
                    document.body.removeChild(t);
                }
                copyToClipboard(saveData(global));
                Swal.fire('Saved and Copied to your clipboard')
            });
        }
        {
            let input = document.createElement('div');
            input.innerText = 'Load JSON';
            input.style.cursor = 'pointer'
            input.style.color = 'white'
            input.style.padding = '5px'
            input.style.border = '1px solid #777'
            input.style.textAlign = 'center'
            input.style.background = '#000'
            editorbody.appendChild(input);
            input.addEventListener('click', e => {
                let json = prompt('JSON을 넣어주세요');
                try {
                    if (json) {
                        JSON.parse(json)
                        // { "layers": [{ "dots": { "polygon": [{ "x": 390, "y": 240 }, { "x": 390, "y": 330 }, { "x": 630, "y": 330 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }, { "dots": { "polygon": [{ "x": 390, "y": 330 }, { "x": 630, "y": 240 }, { "x": 630, "y": 330 }], "circle": [], "rect": [] }, "color": "ffffff", "friction": 0, "density": 0, "restitution": 0, "class": "polygon" }], "pivotpoint": { "x": 510, "y": 300 }, "scale": 30 }
                        while (getActiveObj(global)) {
                            getActiveObj(global)?.cleaner();
                            getActiveObj(global)?.remove();
                        }
                        loadData(global, json);
                    }
                } catch (e) { }
            });
        }
    }
    {
        let key = 'layer';
        let btn = button();
        btn.innerText = 'Layer';
        tabbar.appendChild(btn);
        btn.addEventListener('click', e => turn(key));
        tabs[key] = btn;
        //--
        let editorbody = document.createElement('div');
        container.append(editorbody);
        let editor = document.createElement('textarea');
        // editor.style.display = 'none';
        editor.style.width = '200px';
        editor.style.height = '200px';
        editorbody.append(editor);
        editor.addEventListener('keyup', function () {
            try {
                let data = JSON.parse(this.value);
                getActiveObj(global).setJSON(data);
                editor.style.color = '';
            } catch (e) {
                editor.style.color = 'red';
            }
        });
        editors[key] = editor;
        bodies[key] = editorbody;
        //--

        ['polygon', 'circle', 'rect'].forEach(type => {
            let input = document.createElement('div');
            input.classList.add('type');
            shapeButtons[type] = input;
            input.innerText = type;
            input.style.cursor = 'pointer'
            input.style.color = 'white'
            input.style.padding = '5px'
            // input.style.background = '#000000'
            input.style.border = '0px solid red'
            editorbody.appendChild(input);
            input.addEventListener('click', e => {
                [...editorbody.children].filter(el => el.classList.contains('type')).forEach(el => el.style.background = '')
                const group = getActiveObj(global).getGroup();
                group.class = type;
                getActiveObj(global).setJSON(group)
                input.style.background = 'green';
            })
        });
        {
            let input = document.createElement('div');
            input.innerText = 'Clear Shapes';
            input.style.cursor = 'pointer'
            input.style.color = 'white'
            input.style.padding = '5px'
            input.style.border = '1px solid #777'
            input.style.textAlign = 'center'
            input.style.background = '#000'
            editorbody.appendChild(input);
            input.addEventListener('click', e => {
                getActiveObj(global)?.cleaner();
                // getActiveObj(global)?.remove();
            });
        }
        {
            let input = document.createElement('div');
            input.innerText = 'Remove Layer';
            input.style.cursor = 'pointer'
            input.style.color = 'red'
            input.style.padding = '5px'
            input.style.border = '1px solid #770000'
            input.style.textAlign = 'center'
            input.style.background = '#000'
            editorbody.appendChild(input);
            input.addEventListener('click', e => {
                getActiveObj(global)?.cleaner();
                getActiveObj(global)?.remove();
            });
        }
    }

    //-------------------
    {
        // let key = 'layer';

    }
    //-------------------
    {

    }
    function getEditor(key) {
        return editors[key];
    }
    function turn(key) {
        if (!global.group && key !== 'general') return;
        Object.values(bodies).forEach(el => el.style.display = 'none')
        Object.values(tabs).forEach(el => el.style.opacity = '0.3')
        // getEditor(key).style.display = 'block';
        bodies[key].style.display = 'block';
        tabs[key].style.opacity = '1';
    }
    function selectShape(key) {
        shapeButtons[key].click();
    }
    function active(global) {
        // console.log(global.group);
        // container.style.display = 'block';
        turn('layer');
        if (!global.group) {
            turn('general');
            // container.style.display = 'none';
        }
    }
    turn('general');

    return {
        active,
        getEditor,
        turn,
        selectShape
    }
}
export {
    createEditor
}