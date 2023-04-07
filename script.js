const optionsBtn = document.querySelectorAll('.options > button');
optionsBtn.forEach(optionsBtn => optionsBtn.classList.toggle('btn'));
optionsBtn[0].textContent = 'Rainbow';
optionsBtn[1].textContent = 'Clear';

const canvasWrapper = document.querySelector('.canvas-wrapper');
const wrapper = document.getElementById('wrapper');



const changeColor = {
    defColor: (e) => {e.target.style.backgroundColor = "black"},
    rainbowClr: (e) => {e.target.style.backgroundColor = rndColor()},
};




const grid = {
    sizes: [1, 2, 4, 16, 32, 64],
    fillGrid: (gridCount, exeFunction) => {
        wrapper.style.gridTemplateColumns = `repeat(${gridCount}, auto)`;
        for (let i = 1; i < gridCount**2+1; i++) {
            const item = document.createElement('div');
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

function getGridSize() {
     const gridSize = Math.round(parseInt(prompt('Enter grid size.', '')));
     if (gridSize > 100) { return 100};
     return gridSize;
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

function gridBox() {
    const size = getGridSize();    
    if (isNaN(size)) {
        return;
    };
    grid.clearGrid();
    grid.fillGrid(size, gridEvent);
};


// button.addEventListener('click', gridBox);
// grid.fillGrid(grid.sizes[3], gridEvent);