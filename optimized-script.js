
const rng = {
    limit: { min: 0, max: 255 },
    number: () => Math.floor(Math.random() * (rng.limit.max - rng.limit.min + 1)) + rng.limit.min,
};

const color = {
    input1: document.getElementById('color-picker--1'),
    input2: document.getElementById('color-picker--2'),
    input3: document.getElementById('color-picker--3'),
    eraser: document.getElementById('eraser'),
    rainbowBtn: document.getElementById('rainbow'),
    clearBtn: document.getElementById('clear'),

    getInputValue: e => color.currentValue = e.currentTarget.value,
    applyBgColor: () => color.currentValue = 'transparent',
    applyRainbow: e => e.target.style.backgroundColor = `rgb(${rng.number()}, ${rng.number()}, ${rng.number()})`,
};

const grid = {
    wrapper: document.getElementById('wrapper'),

    getItems: () => [...grid.wrapper.children],
    createGrid: gridSize => {
            wrapper.style.display = 'flex';
            const itemWidth = wrapper.offsetWidth/gridSize + `px`;
            while(wrapper.hasChildNodes()) {
                wrapper.removeChild(wrapper.firstChild);
            };
            for (let i = 1; i < gridSize**2+1; i++) {
                const gridItem = document.createElement('div');
                gridItem.style.flexBasis = itemWidth;
                wrapper.appendChild(gridItem);
            };
        }
};

const paint = {    
    getCurrentValue: e => {
        e.currentTarget.style.backgroundColor = color.currentValue || 'black';
    },
    applyClick: () => {
        grid.getItems().forEach(divItem => {
            divItem.removeEventListener('mouseover', color.applyRainbow);
            divItem.removeEventListener('click', paint.previousColor);
            divItem.addEventListener('click', paint.getCurrentValue);
        });
        paint.previousColor = paint.getCurrentValue;
    },
    applyHover: () => {
        grid.getItems().forEach(divItem => {
            divItem.removeEventListener('click', paint.previousColor);
            divItem.addEventListener('mouseover', color.applyRainbow);
        });
        paint.previousColor = color.applyRainbow;
    }
};

const slider = {
    range: document.getElementById('myRange'),
    rangeOutput: document.getElementById('size-p'),

    updateRangeOutput: () => {
        slider.rangeOutput.textContent = `${slider.range.value} x ${slider.range.value}`
    }
}

const footer = {
    selectBtn: document.getElementById('select'),
    display: document.getElementById('footer-display'),

    toggleDisplay: element => {
        element.classList.toggle('hide-display');
    }
}

let setting = {
    backgroundColor: {
        leftBtn: document.getElementById('bg-clr--lft-btn'),
        rightBtn: document.getElementById('bg-clr--rght-btn'),
        label: document.getElementById('bg-clr-label'),
        index: 0,
        color: {
            Green: '#a4c266',
            White: '#FFFFFF', 
            Black: '#000000',        
        },

        chooseStg: function(op) {
            const colorKeys = Object.keys(this.color);

            if(op === 'left') {
                this.rightBtn.style.visibility = '';
                this.index--;
                this.storedStg = colorKeys[this.index];
            };  
              
            if(op === 'right') {
                this.leftBtn.style.visibility = '';
                this.index++;
                this.storedStg = colorKeys[this.index];
            };

            if(this.index < 1) {
                this.leftBtn.style.visibility = 'hidden';
            } else if(this.index === colorKeys.length-1) {
                this.rightBtn.style.visibility = 'hidden';
            };
        },
        setColor: function(color) {
            this.label.textContent = color;
            grid.wrapper.style.backgroundColor = this.color[color];              
        }            
    },

    gridLine: {
        leftBtn: document.getElementById('grid--lft-btn'),
        rightBtn: document.getElementById('grid--rght-btn'),
        label: document.getElementById('grid-show-label'),

        showLine: function(op) {
            this.label.textContent = 'Yes';
            grid.getItems().forEach( item => item.style.border = 'solid 1px #aaaaaa3d');
            
            this.leftBtn.style.visibility = 'hidden';
            this.rightBtn.style.visibility = 'visible';

            if(op === 'No') {
                this.label.textContent = op;
                grid.getItems().forEach( item => item.style.border = 'none')    

                this.leftBtn.style.visibility = '';
                this.rightBtn.style.visibility = 'hidden';
            };
        }         
    }
};

function initialize() {
    grid.createGrid(slider.range.value);
    paint.applyClick();
    slider.updateRangeOutput();
    setting.backgroundColor.chooseStg();
    setting.gridLine.showLine();
    setting.backgroundColor.setColor('Green')
};

function setupEventListeners() {
    color.input1.addEventListener('mouseleave', e => {
        color.getInputValue(e);
        paint.applyClick();
    });
    color.input2.addEventListener('mouseleave', e => {
        color.getInputValue(e);
        paint.applyClick();
    });
    color.input3.addEventListener('mouseleave', e => {
        color.getInputValue(e);
        paint.applyClick();
    });
    color.eraser.addEventListener('mouseleave', () => {
        color.applyBgColor();
        paint.applyClick();
    });
    color.rainbowBtn.addEventListener('click', paint.applyHover);
    color.clearBtn.addEventListener('click', () => {
        grid.createGrid(slider.range.value);
        setting.gridLine.showLine(setting.gridLine.storedStg);
    });

    slider.range.oninput = () => { slider.updateRangeOutput() };
    slider.range.onchange = () => {
        grid.createGrid(slider.range.value)
        paint.applyClick();
        setting.gridLine.showLine(setting.gridLine.storedStg);
    };

    footer.selectBtn.addEventListener('click', () => footer.toggleDisplay(footer.display));

    setting.backgroundColor.leftBtn.addEventListener('click', () => {
        setting.backgroundColor.chooseStg('left');
        setting.backgroundColor.setColor(setting.backgroundColor.storedStg)});
        
    setting.backgroundColor.rightBtn.addEventListener('click', () => {
        setting.backgroundColor.chooseStg('right');
        setting.backgroundColor.setColor(setting.backgroundColor.storedStg)});    

    setting.gridLine.leftBtn.addEventListener('click', () => {
        setting.gridLine.storedStg = 'Yes';
        setting.gridLine.showLine(setting.gridLine.storedStg);
    });
    setting.gridLine.rightBtn.addEventListener('click', () => {
        setting.gridLine.storedStg = 'No';
        setting.gridLine.showLine(setting.gridLine.storedStg);
    });    
};

initialize()
setupEventListeners()