# Report - Game of Life
Students: Nicolò Rossi, Lorenzo Iuri, Simone Mezzavilla

<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/main.png" width="100%">

Notice: the number of commits of each github account does not represent the actual amount of worktime and codelines of each member of the team; this is because most of the project was done while all the team members where working together in the same place, and usually the commit procedure was preceded by a code-merging phase, in which the various parts of the new codelines (already tested) were reviewed and merged.

## Introduction
The basic idea of this project is to adapt the 2D "Game of Life" to a 3D version, maintaining the core rules of the standard game. The traditional 2D version provide a `n x m` cell matrix, which evolves during the game activating ("keeping alive") and deactivating ("killing") its cells at every step. The rules are as follows:
* One cell needs to have a set amount of neighbouring cells to survive the next step and be kept alive. If the amount it has is too low or too high, the cell is killed. Using the same line of reasoning a cell can also resurrect, if it has the correct number of neighbouring cells. 
* The amount of neighbouring cells must be included between a minimum and a maximum number, set at the beginning of the game. 
* At the first step cells are randomly activated or deactivated.

What makes this game interesting are the various patterns that are created during the progression of the game, which may be endless.
As for the 3D version, implemented in this project, the rules are maintained but adapted to a 3D environment. The cells are represented as colored voxels.

For a quick guide on how to play, please consult `Tutorial.md`.

For a live demo, visit: http://lorenzoiuri.xyz/GOL/.

## Scene composition
In this section are described the components of the game scene.
### Voxels matrix
The main component of the scene is the game matrix, an `m x n x p` parallelepiped composed of colored cubes. Active cubes are shown with a given color, while deactiveted cubes are not. The matrix is centered in the origin.
#### Coloring
The color assigned to each voxel depends on the number of its neighbours:
- Green cells will be still alive after the next game step
- Blue cells have not enough neighbours and will die after the next step
- Red cells have too many neighbours and will die after the next step

So, the colors of the game stands for the "health" of the cubes. Colors ranging from yellow to red represents the cubes that will die from overpopulation and the range of blues represents the ones that doesn't have enough neightbours to stay alive.

In order to improve the memory usage of the game the 26 colored materials are computed during the game reset phase and assigned to the cubes during the game progress. Note that the materials cannot be computed before the game setup (hardcoded) because these depends from the game parameters settings.

### Terrain
The terrain underlying the game is a pyramid built using transparent cubes, it is procedurally generated from a 15x15 pixel heightmap file. This dimension is a good compromise between efficiency and appearance quality.

<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/terrain2.PNG" width="100%">


### HUD
The game HUD shows:
* Current FPS
* Height, depth and length of the voxel matrix selected for the current game
* Number range representing the amount of neighbouring cells necessary to a cell to stay active
* Number range representing the amount of neighbouring cells necessary to a cell to become active
* Command list (if toggled)

The HUD may be hidden using the corrisponding command.

<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/hud.PNG" width="100%">
<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/help.PNG">


#### Font
In order to produce a better-looking HUD interface, the development team decided to create a custom 3D font inspired by the `Arcade Classics` font. This was made by preparing a multitude of text documents (one for each character) containing a `7x7` 0-1 matrix representing a single character. These documents are then loaded into the system whenever the game page is opened. Every character is a `Three.js Object3D` composed by voxels and following the associated matrix pattern. We can then produce arbitrary strings as single objects and perpare
additional information for screen alignement and positioning.

The font generation was made in such a way that each character is easily replaceable and modifiable.

### Options menu
The options menu, which can be opened pressing the blue pencil icon on the top-right of the scene, displays the various modifiable game options, as well as the interface ones. This way, the user is able to:
* Change the size of the game matrix
* Modify the spawn probability of the cubes (a higher percentage means more initially alive cells)
* Reset and manually progress into the game
* Set the value ranges of the cells to activate or deactivate during the next step
* Toggle the auto progress of the game and set the time between each step
* Show/hide HUD and scale it
* Change camera type
* Apply the explosion effect

Every change in the options is immediately applied.

![](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/settings1.png) ![](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/settings2.PNG)


## Functions
In this section are described the various functions of the system.
### Rotation
A function which allows the rotation of the voxels matrix was added to the system. The user is able to rotate the game scene of 45 degrees in 4 directions, based on the position of the voxels matrix, since the rotations are made on its axis. In addition, the user is also able to reposition the game scene, in which case the matrix will rotate and end up facing the camera.

![main2](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/main2.PNG)

### Explosion
It has been added a function which consist in "exploding" the game matrix and the terrain. Each single cube will move away from the origin following a projectile motion. Such a motion is composed by a rectilinear uniform motion on a direction parallel to the XZ plane and a uniform accelerated motion on another
direction that is instead orthogonal to the XZ plane.

<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/explosion_combined.png" width="100%">

### Game progression
The game evolves at each step, and the user has two ways to advance from one step of the game to the
following, so to produce a new voxel matrix. 
#### Manual next step
Using a command, the user can advance in the game by a single step.
#### Auto mode
By activating the relative option in the menu the game will progress automatically, advancing by one step every set amount of time, wich can be also user-modified.
### Camera
The scene camera captures the game starting from a default position. The user is able to move the camera
using standard commands that permits zoom and rotation around the voxel matrix (using `OrbitControl.js`).
#### Camera alignment
This function will reposition the voxel matrix so that it is aligned to the current position of the camera.
#### Toggle camera
This function switches from a perspective camera to an ortographic camera, and viceversa. After each toggle the camera will reurn to the last position had by the camera in the given mode.
### Window scaling
The HUD and the game scene automatically scale according to the size of the window. This behaviour also applies whenever the browser window is resized.
![mobile](https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto1/report/mobile.png)
## Planning steps
The planning and development process followed these steps:
* Starting from the initial idea of creating a 3D version of the game of life we made a working prototype to assess the feasibility of the task.
* Once we made sure the prototype was working and the performances were in line with the expectations, a full requirement analysis was made stating the most important functions and the wanted look of the final product and modularizing the various development steps.
* We then added the option to rotate the game and the camera, the colors and the terrain.
* After that, the explosion effect was added, along with the menu, the fonts and the HUD.
* During all the process the journal was daily updated, and once it was completed, we started working on the report.

### Future improvements
A set of improvements may be added to the project in the near future:
* The possibility to initialize the game matrix using a matrix indicating which cubes will begin the game activated, via `.jjba` files
## Files used
The files used by the game (font files, heightmap) are stored in the `res` directory. 
## References
* Game of life additional information: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
* `Arcade classic` font: https://www.dafont.com/arcade-classic-pizz.font
* Library used for the creation of the options menu: https://github.com/google/paper-gui
