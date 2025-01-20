const container = document.querySelector('.container');
let gridSize = 16 * 16; 
// Function to create the grid
function createGrid(size) {
    container.innerHTML = ''; 
    const gridSizePerRow = Math.sqrt(size);
    const gridItemSize = 640 / gridSizePerRow; 

    let i = 0;
    while (i < size) {
        const newGrid = document.createElement('div');
        newGrid.setAttribute('class', 'grid');
        newGrid.style.width = `${gridItemSize}px`;
        newGrid.style.height = `${gridItemSize}px`;
        container.appendChild(newGrid);
        i++;
    }
}

// Event listener for coloring the grid on hover
container.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('grid')) {
        event.target.style.backgroundColor = 'black'; 
    }
});

// Initial grid creation
createGrid(gridSize);

// Event listener for changing the grid size
const changeGrid = document.querySelector('.change-grid');
changeGrid.addEventListener('click', () => {
    let input = prompt('Enter Height and Width (max 100)', 32);
    input = parseInt(input);

    if (isNaN(input) || input > 100 || input <= 0) {
        alert('Please enter a valid number less than or equal to 100.');
    } else {
        gridSize = input * input; 
        createGrid(gridSize);
    }
});

// Event Listener for clearing grid
const clearGrid = document.querySelector('.eraser')
clearGrid.addEventListener('click', ()=>{
    gridItems = document.querySelectorAll('.grid')
    gridItems.forEach(item => {
        item.style.backgroundColor = 'lightgray'
        
    });
})
const shadeButton = document.querySelector('.opacity');
let shadingEnabled = false;

// Function to toggle shading mode
shadeButton.addEventListener('click', () => {
    shadingEnabled = !shadingEnabled;
    shadeButton.textContent = shadingEnabled ? 'STOP SHADING' : 'SHADE';
});

// Event listener for coloring the grid with or without shading effect on hover
container.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('grid')) {
        if (shadingEnabled) {
            let currentOpacity = parseFloat(event.target.style.opacity) || 0.1;
            if (currentOpacity < 1) {
                event.target.style.opacity = currentOpacity + 0.1;
            }
        } else {
            event.target.style.backgroundColor = 'black';
        }
    }
});
const colorButton = document.querySelector('.new-color');
let colorEnabled = false;

// Function to toggle color mode
colorButton.addEventListener('click', () => {
    colorEnabled = !colorEnabled;
    colorButton.textContent = colorEnabled ? 'STOP COLOR' : 'COLOR';
});

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// Event listener for coloring the grid with or without random colors on hover
container.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('grid')) {
        if (colorEnabled) {
            event.target.style.backgroundColor = getRandomColor();
        } else if (shadingEnabled) {
            let currentOpacity = parseFloat(event.target.style.opacity) || 0.1;
            if (currentOpacity < 1) {
                event.target.style.opacity = currentOpacity + 0.1;
            }
        } else {
            event.target.style.backgroundColor = 'black';
        }
    }
});
