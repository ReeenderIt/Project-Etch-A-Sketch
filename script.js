
const rng = {
    limit: { min: 0, max: 255 },
    number: () => Math.floor(Math.random() * (rng.limit.max - rng.limit.min + 1)) + rng.limit.min,
};

const color = {
    input1: () => document.getElementById('color-picker--1'),
    input2: () => document.getElementById('color-picker--2'),
    input3: () => document.getElementById('color-picker--3'),
    eraser: () => document.getElementById('eraser'),
    rainbowBtn: () => document.getElementById('rainbow'),
    clearBtn: () => document.getElementById('clear'),

    inputValue1: e => e.target.style.backgroundColor = color.input1().value,
    inputValue2: e => e.target.style.backgroundColor = color.input2().value,
    inputValue3: e => e.target.style.backgroundColor = color.input3().value,
    RGB: () => `rgb(${rng.number()}, ${rng.number()}, ${rng.number()})`,
    rainbow: e => e.target.style.backgroundColor = color.RGB(),
    applyBgColor: e => e.target.style.backgroundColor = grid.wrapper().style.backgroundColor,
};

const grid = {
    wrapper: () => document.getElementById('wrapper'),
    wrapperWidth: () => wrapper.offsetWidth,
    items: () => gridArr = [...grid.wrapper().children],
    item: () => document.createElement('div'),
    newGrid: (gridSize) => {
            wrapper.style.display = 'flex';
            const itemWidth = grid.wrapperWidth()/gridSize + `px`;
            while(wrapper.hasChildNodes()) {
                wrapper.removeChild(wrapper.firstChild);
            };
            for (let i = 1; i < gridSize**2+1; i++) {
                const gridItem = grid.item();
                gridItem.style.flexBasis = itemWidth;
                wrapper.appendChild(gridItem);
            };
        }
};

const paint = {
    item: (colorInput) => {
        grid.items().forEach(divItem => {
            divItem.removeEventListener('mouseover', color.rainbow);
            divItem.removeEventListener('click', paint.previousColor);
            divItem.addEventListener('click', colorInput);
        });
        paint.previousColor = colorInput;
    },
    items: (colorInput) => {
        grid.items().forEach(divItem => {
            divItem.removeEventListener('click', paint.previousColor);
            divItem.addEventListener('mouseover', colorInput);
        });
        paint.previousColor = colorInput;
    }
};

const slider = {
    range: () => document.getElementById('myRange'),
    rangeOutput: () => document.getElementById('size-p'),
    showRange: () => {
        slider.rangeOutput().textContent = `${slider.range().value} x ${slider.range().value}`
    }
}

const footer = {
    selectBtn: () => document.getElementById('select'),
    display: () => document.getElementById('footer-display'),
    toggleDisplay: (object) => {
        object.classList.toggle('hide-display');
    }
}

let menu = {
    bgStg: {
        leftBtn: () => document.getElementById('bg-clr--lft-btn'),
        rightBtn: () => document.getElementById('bg-clr--rght-btn'),
        selBG: () => document.getElementById('bg-clr-label'),
        index: 0,
        color: {
            'Default': '#a4c266',
            White: '#FFFFFF', 
            Black: '#000000',        
        },
        chooseStg: function(op) {
            const colorKeys = Object.keys(this.color);

            if(op === 'left') {
                this.rightBtn().style.visibility = '';
                this.index--;
                this.storedStg = colorKeys[this.index];
            };  
              
            if(op === 'right') {
                this.leftBtn().style.visibility = '';
                this.index++;
                this.storedStg = colorKeys[this.index];
            };

            if(this.index < 1) {
                this.leftBtn().style.visibility = 'hidden';
            } else if(this.index === colorKeys.length-1) {
                this.rightBtn().style.visibility = 'hidden';
            };
        },
        setBg: function(setting = 'Default') {
            this.selBG().textContent = setting;
            grid.wrapper().style.backgroundColor = this.color[setting];              
        }            
    },
    gridStg: {
        leftBtn: () => document.getElementById('grid--lft-btn'),
        rightBtn: () => document.getElementById('grid--rght-btn'),
        optLabel: () => document.getElementById('grid-show-label'),
        setGrid: function(op) {
            this.optLabel().textContent = 'Yes';
            grid.items().forEach((item)=>item.style.border = 'solid 1px #aaaaaa3d');
            
            this.leftBtn().style.visibility = 'hidden';
            this.rightBtn().style.visibility = '';

            if(op === 'No') {
                this.optLabel().textContent = op;
                grid.items().forEach((item)=>item.style.border = 'none')    

                this.leftBtn().style.visibility = '';
                this.rightBtn().style.visibility = 'hidden';
            };
        }         
    }
};

function mainFunction() {
    grid.newGrid(slider.range().value);
    paint.item(color.inputValue1);
    slider.showRange();
    menu.bgStg.chooseStg();
    menu.gridStg.setGrid();
};

function eventListeners() {
    color.input1().addEventListener('click', () => paint.item(color.inputValue1));
    color.input2().addEventListener('click', () => paint.item(color.inputValue2));
    color.input3().addEventListener('click', () => paint.item(color.inputValue3));
    color.eraser().addEventListener('click', () => paint.item(color.applyBgColor));
    color.rainbowBtn().addEventListener('click', () => paint.items(color.rainbow));
    color.clearBtn().addEventListener('click', () => {
        grid.newGrid(slider.range().value);
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    });

    slider.range().oninput = () => {
        slider.showRange();
    };
    slider.range().onchange = () => {
        grid.newGrid(slider.range().value)
        paint.item();
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    };

    footer.selectBtn().addEventListener('click', () => footer.toggleDisplay(footer.display()));

    menu.bgStg.leftBtn().addEventListener('click', () => {
        menu.bgStg.chooseStg('left');
        menu.bgStg.setBg(menu.bgStg.storedStg)});
    menu.bgStg.rightBtn().addEventListener('click', () => {
        menu.bgStg.chooseStg('right');
        menu.bgStg.setBg(menu.bgStg.storedStg)});    
    menu.gridStg.leftBtn().addEventListener('click', () => {
        menu.gridStg.storedStg = 'Yes';
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    });
    menu.gridStg.rightBtn().addEventListener('click', () => {
        menu.gridStg.storedStg = 'No';
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    });    
};

mainFunction()
eventListeners()