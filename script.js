const optionsBtn = document.querySelectorAll('.options > button');
optionsBtn.forEach(optionsBtn => optionsBtn.classList.toggle('btn'));
const rainbowBtn = document.getElementById('rainbow');
const clearBtn = document.getElementById('clear');
rainbowBtn.textContent = 'Rainbow';
clearBtn.textContent = 'Clear';

const slider = document.getElementById('myRange');
const sizeP = document.getElementById('size-p');
sizeP.textContent = `${slider.value} x ${slider.value}`;

const wrapper = document.getElementById('wrapper');



const rnd = {
    limit: {
        min: 0,
        max: 255
    },
    number: () => Math.floor(Math.random() * (rnd.limit.max - rnd.limit.min + 1)) + rnd.limit.min,
    RGB: () => `rgb(${rnd.number()}, ${rnd.number()}, ${rnd.number()})`
};

const clr = {
    def: (e) => {e.target.style.backgroundColor = "black";},
    rainbow: (e) => {e.target.style.backgroundColor = rnd.RGB();},
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

function clrItem(color = clr.def) {
    document.querySelectorAll('#wrapper > div').forEach(divItem => {
        divItem.addEventListener('mouseover', color)
    });
    console.log(color);
};



rainbowBtn.addEventListener('click', clrItem(clr.rainbow));
clearBtn.addEventListener('click', () => {
    grid.clearGrid();
    grid.fillGrid(slider.value);
    clrItem()
});
slider.oninput = () => {
    sizeP.textContent=`${slider.value} x ${slider.value}`;
    grid.clearGrid();
    grid.fillGrid(slider.value)
    clrItem();
};
grid.fillGrid(slider.value)
clrItem();