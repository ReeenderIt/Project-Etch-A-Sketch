const optionsBtn = document.querySelectorAll('.options > button');
optionsBtn.forEach(optionsBtn => optionsBtn.classList.toggle('btn'));
const rainbow = document.getElementById('rainbow');
const clear = document.getElementById('clear');
rainbow.textContent = 'Rainbow';
clear.textContent = 'Clear';

const slider = document.getElementById('myRange');
const sizeP = document.getElementById('size-p');
sizeP.textContent = `${slider.value} x ${slider.value}`;

const wrapper = document.getElementById('wrapper');



const changeColor = {
    defColor: (e) => {e.target.style.backgroundColor = "black"},
    rainbowClr: (e) => {e.target.style.backgroundColor = rndColor()},
};

const grid = {
    fillGrid: (gridCount, exeFunction) => {
        wrapper.style.gridTemplateColumns = `repeat(${gridCount}, auto)`;
        for (let i = 1; i < gridCount**2+1; i++) {
            const item = document.createElement('div');
            item.style.border = "1px solid black";
            wrapper.appendChild(item);
        };    
        (exeFunction)();
    },
    clearGrid: () => {
        while(wrapper.hasChildNodes()) {
            wrapper.removeChild(wrapper.firstChild);
        };
    }
};

function gridEvent() {
    document.querySelectorAll('#wrapper > div').forEach(divItem => {
        divItem.addEventListener('mouseover', changeColor.defColor)
    });
};

const rnd = {
    limit: {
        min: 0,
        max: 255
    },
    number: () => Math.floor(Math.random() * (rnd.limit.max - rnd.limit.min + 1)) + rnd.limit.min,
    clr: () => `rgb(${rnd.number()}, ${rnd.number()}, ${rnd.number()})`
};


grid.fillGrid(slider.value, gridEvent);
slider.oninput = () => {
    grid.clearGrid();
    grid.fillGrid(slider.value, gridEvent)
    sizeP.textContent=`${slider.value} x ${slider.value}`;
};
clear.addEventListener('click', () => {
    grid.clearGrid();
    grid.fillGrid(slider.value, gridEvent);
});