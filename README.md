# Report - Game of Life
Students: Lorenzo Iuri, Simone Mezzavilla, Nicolò Rossi

Notice: the number of commits of each github account does not represent the actual amount of worktime and codelines of each member of the team; this is because most of the project was done while all the team members where working together in the same place, and usually the commit procedure was preceded by a code-merging phase, in which the various parts of the new codelines (already tested) were reviewed and merged.

## Introduction
The basic idea of this project is to adapt the 2D "Game of Life" to a 3D version, maintaining the core rules of the standard game. The traditional 2D version provide a n x m cell matrix, which evolves during the game activating ("keeping alive") and deactivating ("killing") its cells at every step. The rules are as follows:
* One cell needs to have a set amount of neighbouring cells to survive the next step and be kept alive. If the amount it has is not enough or too much, the cell is killed. Using the same line of reasoning a cell can also resurrect, if it has the correct number of neighbouring cells. 
* The amount of neighbouring cells must be included between a minimum and a maximum number, set at the beginning of the game. 
* The cells start the game randomly activated or deactivated.

What makes this game interesting are the various patterns that are created during the progression of the game, which may be endless.
As for the 3D version, implemented in this project, the rules are maintained but adapted to a 3D environment. The cells are represented as colored voxels.

## Scene composition
In this section are described the components of the game scene.
### Voxels matrix
The main component of the scene is the game matrix, an m x n x p parallelepiped composed by colored cubes. Active cubes are shown and colored, while deactiveted cubes are not. The matrix is centered in the origin.
#### Coloring
The color assigned to each voxel depends on the number of its neighbouring cells:
- Green cells will be still alive after the next game step
- Blue cells have not enough neighbouring cells and will die after the next step
- Red cells have too many neighbouring cells and will die after the next step

So, the colors of the game stands for the "health" of the cubes. Colors ranging from yellow to red represents the cubes that will die from overpopulation and the range of blues represents the ones that doesn't have enough neightbours to stay alive.

In order to improve the memory usage of the game the 26 colored materials are computed during the game reset phase and assigned to the cubes during the game progress. Note that the materials cannot be computed before the game setup (hardcoded) because these depends from the game parameters settings.

### Terrain
The terrain underlying the game is a pyramid built using transparent cubes, it is procedurally generated from a 15x15 pixel heightmap file. This dimension is a good compromise between efficiency and appearance quality.

### HUD
The game HUD shows:
* Current FPS
* Height, depth and length of the voxel matrix selected for the current game
* Number range representing the amount of neighbouring cells necessary to a cell to stay active
* Number range representing the amount of neighbouring cells necessary to a cell to become active
* Command list (if toggled)

The HUD may be hidden using the corrisponding command.

#### Font
In order to produce a better-looking HUD interface, the development team decided to create a custom font, inspired by the 'Arcade Classics' font, used to show the HUD. This was made by creating a multitude of text documents (one for each character) containing a 7x7 0-1 matrix representing a single character. These documents are then loaded into the system whenever the game page is opened. Every character is a Three.js Object3D, composed by voxels, following the associated matrix pattern.

The font generation was made in such a way that each character is easily replaceable and modifiable.

### Options menu
The options menu, which can be opened pressing the blue pencil icon on the top of the scene, displays the various modifiable game options, as well as the interface ones. This way, the user is able to:
* Change the size of the game matrix
* Modify the spawn probability of the cubes (a higher percentage means more starting activated cubes)
* Reset and manually progress into the game
* Set the value ranges of the cells to activate or deactivate during the next step
* Toggle the auto progress of the game and set the time between each step
* Show/hide HUD and scale it
* Change camera type
* Apply the explosion function

Every change in the options is immediately applied.

## Functions
In this section are described the various functions of the system.
### Rotation
A function which allows the rotation of the voxels matrix was added to the system. The user is able to rotate the game scene of 45 degrees in 4 directions, based on the position of the voxels matrix, since the rotations are made on its axis. In addition, the user is also able to reposition the game scene, in which case the matrix will rotate and end up facing the camera.
### Explosion
It has been added a function which consist in "exploding" the game matrix and the terrain. Each single cube will move away from the origin following a projectile motion, while at the same time falling, since the gravity's effect was manually added to the scene.

### Game progression
The game evolves at each step, and the user has two ways of advancing to the next step of the game, in which some cubes will activate, others deactivate, and some may change color. The matrix and camera position won't change.
#### Manual next step
Using a command, the user can advance in the game by a single step.
#### Auto mode
By selecting a particular option in the option menu, the game will progress automatically, advancing by one step every set amount of time, which can be modified in the option menu.
### Camera
The scene camera captures the game starting in a default position, but the user is able to move it using standard commands, being able to zoom in and out, rotate and translate (using OrbitControl.js).
#### Camera reset
This function will reposition the camera to its starting coordinates, maintaining the game status.
#### Toggle camera
This function switches from a perspective camera to an ortographic camera, and viceversa. After each toggle, the camera will capture the scene positioned in its starting default coordinates.
## Commands
## Planning steps
### Future improvements
A set of improvements may be added to the project in the near future:
* The possibility to initialize the game matrix using a matrix indicating which cubes will begin the game activated, via .jjba documents

## References
* Game of life additional information: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
* Arcade classic font: https://www.dafont.com/arcade-classic-pizz.font
