# Game of Life 3D

## User guide


As soon as the page loads the game matrix will appear still in front of you: 

![intro](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Intro.png)

It is possible to see an FPS counter on the left, a short recap of the game options in the center and 
finally the menu button on the right. The cubes colored in gray are part of the terrain and not of the game matrix.

### Rotations and zoom

It is possible to control the position of the camera by left clicking and dragging (or by swiping on mobile devices) and it is possible to zoom in and out with by using the mouse wheel (or by pinching).

![rotations](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Rotations.png)

## Menu options
After pressing the pen icon an option menu will show up:

![intro](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Menu.png)

### Help overlay
By pressing help (or H on the keyboard) it is possible to display a simple overlay showing the keyboard shortcuts

![Help](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/HelpMsg.png)

### Dimension Sliders

It is possible to change the dimension of the 3D game matrix by using the relative sliders. Take care that very high 
values might affect your FPS.

![Dimensions](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Dims.png)

### Random spawn probability

The probability that a cell is alive or dead at the initial state of the game is decided by this parameter,
use the reset button to generate a new matrix and so a new initial state.

![l](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/low.png)
![h](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/high.png)

### Life and death ranges

The rules of the game of life are very simple. A cell is considered alive in the next itaration of the game either if it is alive (visible) and the number of alive cells in the cube around it is in the Stay-alive range, or if it the cell is dead (not visible) and the number of alive cells in the cube around it is in the Become-alive range. In all the other cases the cell will be dead in the next iteration. The sliders in the menu can modify these ranges. Cells that will stay alive in the next iteration are colored in green, if they die for too few neighbours they are colored in blue otherwise in red. 

![life-death](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/ranges.png)

### Game execution

The game can be executed manually step-by-step using the "N" key or the "NEXT STEP" button. It is also
possible to automatically pass to the next iteration by pressing "A" or the "AUTO UPDATE" button. The time interval between updates can be modified with the relative slider.

Initial state
![s1](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/step1.png)
Second itaration
![s1](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/step2.png)

### Clear HUD

By pressing "X" or the "ENABLE-DISABLE HUD" button it is possible to hide-show the overlay with FPS and game options. 
It is also possible to scale the HUD dimension to enhance view on low or high DPI displays with the relative slider.

![hud](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/NoHud.png)

### Change camera type

By pressing "P" or the button "CHANGE CAMERA TYPE" it is possible to switch between Perspective and Ortographic cameras.

![ct](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/CameraType.png)

### Explosion

By pressing "E" or the button "EXPLOSION ANIMATION" it is possible to trigger an animation simulating the explosion
of the game matrix and the underlying terrain. 

![s1](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Explosion.png)

### Other options for rotation

In desktop mode it is possible to have the game matrix rotate around its axes of 45° by pressing the arrow keyes. It is
also possible to rotate the cube so that it is again aligned with the camera by pressing ".".

![s1](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Rotations_arrow.png)

![s1](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/tutorial/Face.png)




