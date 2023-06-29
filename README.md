# Project-Etch-A-Sketch

Etch-A-Sketch App README
This repository contains the code for a simple paint application built using HTML, CSS, and JavaScript. The paint app allows users to draw and paint on a grid using different colors and tools.

Features
The etch-a-sketch app includes the following features:

Color Picker: There are three color input fields (color-picker--1, color-picker--2, color-picker--3) that allow users to select custom colors for painting. The selected color is applied when the mouse leaves the color input field.

Eraser: The eraser tool (eraser) sets the current color to transparent, effectively erasing any previously applied colors. It is activated when the mouse leaves the eraser element.

Rainbow Brush: The rainbow brush tool (rainbow) applies random rainbow colors to the grid cells when clicked.

Clear Grid: The clear button (clear) resets the grid, clearing all painted colors.

Grid Size Slider: The grid size slider (myRange) allows users to adjust the size of the grid dynamically. The selected grid size is displayed next to the slider.

Background Color: The background color of the grid (wrapper) can be changed using the left and right buttons (bg-clr--lft-btn, bg-clr--rght-btn). The available colors are Green, White, and Black. The currently selected background color is displayed in the label (bg-clr-label).

Grid Lines: The grid lines can be toggled on and off using the left and right buttons (grid--lft-btn, grid--rght-btn). When grid lines are enabled, each cell of the grid has a border. The current state of grid lines is displayed in the label (grid-show-label).

Usage
To use the etch-a-sketch app, follow these steps:

Clone the repository or download the code files.

Open the index.html file in a web browser.

The etch-a-sketch app will be loaded, and you can start drawing on the grid.

Select a color from one of the color buttons (color-picker--1, color-picker--2, color-picker--3) by clicking on it. The selected color will be applied when the mouse leaves the color input field and mouse-clicked a grid item.

To erase colors, select the eraser button and click the colored grid item. The current applied color will be set to transparent, erasing any previously drawn colors.

Click the rainbow button to activate the rainbow brush tool. When you move the mouse over the grid cells, random colors will be applied.

Click the clear button to reset the grid, clearing all applied colors.

Use the grid-size slider to adjust the size of the grid. The selected grid size will be displayed next to the slider.

Change the background color of the grid by clicking the left and right buttons (bg-clr--lft-btn, bg-clr--rght-btn). The available colors are Green, White, and Black. The currently selected background color will be displayed in the label (bg-clr-label).

Toggle grid lines on and off using the left and right buttons (grid--lft-btn, grid--rght-btn). When grid lines are enabled, each cell of the grid will have a border. The current state of grid lines will be displayed in the label (grid-show-label).

Customization
You can customize the paint app by modifying the following elements:

Colors: You can change the available colors or add more color options by updating the setting.backgroundColor.color object. The keys represent the color names, and the values represent the color codes.

Grid Size Range: You can adjust the minimum and maximum values of the grid-size slider by modifying the min and max properties of the input element.

Styling: You can modify the CSS styles in the style.css file to change the appearance of the etch-a-sketch app.

Compatibility
The paint app is built using standard HTML, CSS, and JavaScript and should be compatible with most modern web browsers.

Credits
The paint app code was developed by Ren G.