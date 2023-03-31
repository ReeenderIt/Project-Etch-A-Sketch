const body = document.querySelector('body');
const container = document.createElement('div');
container.setAttribute('id', 'container');
const button = document.createElement('button');
button.textContent = 'Change Grid';
button.classList.toggle('btn')
const gridContainer = document.getElementById('grid-container');



body.prepend(container);
container.appendChild(gridContainer);
gridContainer.before(button);



const changeColor = {
    defColor: (e) => {e.target.classList.add('high-lighted')}
};




const grid = {
    sizes: [1, 2, 4, 16, 32, 64],
    fillGrid: function(gridCount, exeFunction) {
        gridContainer.style.gridTemplateColumns = `repeat(${gridCount}, auto)`;
        for (let i = 1; i < gridCount**2+1; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.toggle('grid-item');
            gridContainer.appendChild(gridItem);
        };    
        (exeFunction)();
    },
    clearGrid: function() {
        while(gridContainer.hasChildNodes()) {
            gridContainer.removeChild(gridContainer.firstChild);
        };
    }
};

function getGridSize() {
     const gridSize = Math.round(parseInt(prompt('Enter grid size.', '')));
     if (gridSize > 100) { return 100};
     return gridSize;
};

function gridEvent() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(function(divItem) {
        divItem.addEventListener('mouseover', changeColor.defColor)
    });
};

function rainbowColor() {
    const limit = {
        max: 255,
        min: 0
    };
    const randomNumber = () => Math.floor(Math.random() * (limit.max - limit.min + 1)) + limit.min;
    const color = {
        red: randomNumber(),
        green: randomNumber(),
        blue: randomNumber()
    }
};

function gridBox() {
    const size = getGridSize();    
    if (isNaN(size)) {
        return;
    };
    grid.clearGrid();
    grid.fillGrid(size, gridEvent);
};


button.addEventListener('click', gridBox);
grid.fillGrid(grid.sizes[3], gridEvent);