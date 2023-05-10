
const rnd = {
    limit: {
        min: 0,
        max: 255
    },
    number: () => Math.floor(Math.random() * (rnd.limit.max - rnd.limit.min + 1)) + rnd.limit.min,
};

const clr = {
    eraser: () => document.getElementById('eraser'),
    eraserBtn: () => this.eraser().textContent = 'Eraser',
    input1: () => document.getElementById('color-picker--1'),
    input2: () => document.getElementById('color-picker--2'),
    input3: () => document.getElementById('color-picker--3'),
    rainbowBtn: () => document.getElementById('rainbow'),
    clearBtn: () => document.getElementById('clear'),

    def: e => e.target.style.backgroundColor = "black",
    inputValue1: e => e.target.style.backgroundColor = clr.input1().value,
    inputValue2: e => e.target.style.backgroundColor = clr.input2().value,
    inputValue3: e => e.target.style.backgroundColor = clr.input3().value,
    RGB: () => `rgb(${rnd.number()}, ${rnd.number()}, ${rnd.number()})`,
    rainbow: e => e.target.style.backgroundColor = clr.RGB(),
    white: e => e.target.style.backgroundColor = "#FFFFFF",
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

const clrItem = {
    clickClr: (color = clr.def) => {
        grid.items().forEach(divItem => {
            divItem.removeEventListener('mouseover', clr.rainbow);
            divItem.removeEventListener('click', color);
            divItem.addEventListener('click', color);
        });
    },
    hoverClr: (color = clr.def) => {
        grid.items().forEach(divItem => {
            divItem.removeEventListener('click', color);
            divItem.removeEventListener('mouseover', clr.rainbow);
            divItem.addEventListener('mouseover', color);
        });
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

const menu = {
    bgStg: {
        leftBtn: () => document.getElementById('bg-clr--lft-btn'),
        rightBtn: () => document.getElementById('bg-clr--rght-btn'),
        selBG: () => document.getElementById('bg-clr-label'),
        index: 0,
        clr: {
            'Default': '#a4c266',
            White: '#FFFFFF', 
            Black: '#000000',        
        },
        storedStg: '',
        chooseStg: function(op) {
            const clrKeys = Object.keys(this.clr);

            if(op === 'decrement') {
                this.rightBtn().style.visibility = '';
                this.index--;
                this.storedStg = clrKeys[this.index];
            };  
              
            if(op === 'increment') {
                this.leftBtn().style.visibility = '';
                this.index++;
                this.storedStg = clrKeys[this.index];
            };

            if(this.index < 1) {
                this.leftBtn().style.visibility = 'hidden';
            } else if(this.index === clrKeys.length-1) {
                this.rightBtn().style.visibility = 'hidden';
            };
        },
        setBg: function(setting = 'Default') {
            this.selBG().textContent = setting;
            grid.wrapper().style.backgroundColor = this.clr[setting];              
        }            
    },
    gridStg: {
        leftBtn: () => document.getElementById('grid--lft-btn'),
        rightBtn: () => document.getElementById('grid--rght-btn'),
        optLabel: () => document.getElementById('grid-show-label'),
        storedStg: '',
        chooseStg: function(op) {
            this.storedStg = op;
        },
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
    clrItem.clickClr();
    slider.showRange();
    menu.bgStg.chooseStg();
    menu.gridStg.setGrid();
};

function eventListeners() {
    clr.input1().addEventListener('click', () => clrItem.clickClr(clr.inputValue1));
    clr.input2().addEventListener('click', () => clrItem.clickClr(clr.inputValue2));
    clr.input3().addEventListener('click', () => clrItem.clickClr(clr.inputValue3));
    clr.eraser().addEventListener('click', () => clrItem.clickClr(clr.white));
    clr.rainbowBtn().addEventListener('click', () => clrItem.hoverClr(clr.rainbow));
    clr.clearBtn().addEventListener('click', () => {
        grid.newGrid(slider.range().value);
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    });

    slider.range().oninput = () => {
        slider.showRange();
    };
    slider.range().onchange = () => {
        grid.newGrid(slider.range().value)
        clrItem.clickClr();
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    };

    footer.selectBtn().addEventListener('click', () => footer.toggleDisplay(footer.display()));

    menu.bgStg.leftBtn().addEventListener('click', () => {
        menu.bgStg.chooseStg('decrement');
        menu.bgStg.setBg(menu.bgStg.storedStg)});
    menu.bgStg.rightBtn().addEventListener('click', () => {
        menu.bgStg.chooseStg('increment');
        menu.bgStg.setBg(menu.bgStg.storedStg)});    
    menu.gridStg.leftBtn().addEventListener('click', () => {
        menu.gridStg.chooseStg('Yes');
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    });
    menu.gridStg.rightBtn().addEventListener('click', () => {
        menu.gridStg.chooseStg('No');
        menu.gridStg.setGrid(menu.gridStg.storedStg);
    });    
};

mainFunction()
eventListeners()