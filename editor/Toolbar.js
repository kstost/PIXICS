import Common from './Common.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
import { saveData, loadData } from './Data.js'
function createToolbar(global) {
    let toolbar = document.createElement('div');
    toolbar.style.padding = '20px';
    toolbar.style.position = 'fixed';
    toolbar.style.left = '0px';
    toolbar.style.bottom = '0px';
    document.body.appendChild(toolbar);
    {
        let btn = document.createElement('button');
        btn.innerText = 'Remove';
        toolbar.appendChild(btn);
        btn.addEventListener('click', function () {
            getActiveObj(global)?.cleaner();
            getActiveObj(global)?.remove();
        });
    }
    {
        let btn = document.createElement('button');
        btn.innerText = 'Save';
        toolbar.appendChild(btn);
        btn.addEventListener('click', function () {
            saveData(global);
        });
    }
}
export {
    createToolbar
}