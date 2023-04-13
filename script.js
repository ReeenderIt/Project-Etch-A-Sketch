const eraser = document.getElementById('eraser');
const clrButton1 = document.getElementById('color1');
const clrButton2 = document.getElementById('color2');
const clrButton3 = document.getElementById('color3');

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
    option1: (e) => {e.target.style.backgroundColor = document.getElementById('color1').value},
    option2: (e) => {e.target.style.backgroundColor = document.getElementById('color2').value},
    option3: (e) => {e.target.style.backgroundColor = document.getElementById('color3').value},
    eraser: (e) => {e.target.style.backgroundColor = "#FFFFFF"},
};

const grid = {
    item: () => document.createElement('div'),
    newGrid: (gridCount) => {
        wrapper.style.gridTemplateColumns = `repeat(${gridCount}, auto)`;
        while(wrapper.hasChildNodes()) {
            wrapper.removeChild(wrapper.firstChild);
        };
        for (let i = 1; i < gridCount**2+1; i++) {
            const test = grid.item();
            test.style.border = "1px solid black";
            wrapper.appendChild(test);
        };    
    },
};

function clrItem(color = clr.def) {
    document.querySelectorAll('#wrapper > div').forEach(divItem => {
        divItem.addEventListener('mouseover', color)
    });
    console.log(color);
};

clrButton1.addEventListener('click', () => clrItem(clr.option1));
clrButton2.addEventListener('click', () => clrItem(clr.option2));
eraser.addEventListener('click', () => clrItem(clr.eraser));
rainbowBtn.addEventListener('click', () => {clrItem(clr.rainbow)});
clearBtn.addEventListener('click', () => {
    grid.newGrid(slider.value);
    clrItem()
});
slider.oninput = () => {
    sizeP.textContent=`${slider.value} x ${slider.value}`;
    grid.newGrid(slider.value)
    clrItem();
};
grid.newGrid(slider.value)
clrItem();