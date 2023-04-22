const eraser = document.getElementById('eraser');
eraser.textContent = 'Eraser';
const clrButton1 = document.getElementById('color1');
const clrButton2 = document.getElementById('color2');
const clrButton3 = document.getElementById('color3');

const rainbowBtn = document.getElementById('rainbow');
const clearBtn = document.getElementById('clear');
// rainbowBtn.textContent = 'Rainbow';
// clearBtn.textContent = 'Clear';

const slider = document.getElementById('myRange');
const sizeP = document.getElementById('size-p');
sizeP.textContent = `${slider.value} x ${slider.value}`;




const rnd = {
    limit: {
        min: 0,
        max: 255
    },
    number: () => Math.floor(Math.random() * (rnd.limit.max - rnd.limit.min + 1)) + rnd.limit.min,
    RGB: () => `rgb(${rnd.number()}, ${rnd.number()}, ${rnd.number()})`
};

const clr = {
    def: e => e.target.style.backgroundColor = "black",
    rainbow: e => e.target.style.backgroundColor = rnd.RGB(),
    option1: e => e.target.style.backgroundColor = document.getElementById('color1').value,
    option2: e => e.target.style.backgroundColor = document.getElementById('color2').value,
    option3: e => e.target.style.backgroundColor = document.getElementById('color3').value,
    eraser: e => e.target.style.backgroundColor = "#FFFFFF",
};

const grid = {
    wrapper: () => document.getElementById('wrapper'),
    wrapperWidth: () => wrapper.offsetWidth,
    item: () => document.createElement('div'),
    newGrid:
            // Use gridFill to create new grid faster than flexFill
        // (gridCount) => {
            // wrapper.style.display = 'grid';
            // wrapper.style.gridTemplateColumns = `repeat(${gridCount}, auto)`;
            // while(wrapper.hasChildNodes()) {
                // wrapper.removeChild(wrapper.firstChild);
            // };
            // for (let i = 1; i < gridCount**2+1; i++) {
                // wrapper.appendChild(grid.item());
            // };    
        // }

        (gridSize) => {
            wrapper.style.display = 'flex';
            const itemWidth = grid.wrapperWidth()/gridSize + `px`;
            while(wrapper.hasChildNodes()) {
                wrapper.removeChild(wrapper.firstChild);
            };
            for (let i = 1; i < gridSize**2+1; i++) {
                const test = grid.item();
                test.style.flexBasis = itemWidth;
                wrapper.appendChild(test);
            };
        }
};

const clrItem = {
    clickClr: (color = clr.def) => {
        document.querySelectorAll('#wrapper > div').forEach(divItem => {
            divItem.removeEventListener('mouseover', clr.rainbow);
            divItem.removeEventListener('click', color);
            divItem.addEventListener('click', color);
        });
    },
    hoverClr: (color = clr.def) => {
        document.querySelectorAll('#wrapper > div').forEach(divItem => {
            divItem.removeEventListener('click', color);
            divItem.removeEventListener('mouseover', clr.rainbow);
            divItem.addEventListener('mouseover', color);
        });

    }
};

clrButton1.addEventListener('click', () => clrItem.clickClr(clr.option1));
clrButton2.addEventListener('click', () => clrItem.clickClr(clr.option2));
clrButton3.addEventListener('click', () => clrItem.clickClr(clr.option3));
eraser.addEventListener('click', () => clrItem.clickClr(clr.eraser));
rainbowBtn.addEventListener('click', () => clrItem.hoverClr(clr.rainbow));
clearBtn.addEventListener('click', () => grid.newGrid(slider.value));
slider.oninput = () => {
    sizeP.textContent=`${slider.value} x ${slider.value}`;
};
slider.onchange = () => {
    sizeP.textContent=`${slider.value} x ${slider.value}`;
    grid.newGrid(slider.value)
    clrItem.clickClr();
};
grid.newGrid(slider.value)
clrItem.clickClr();