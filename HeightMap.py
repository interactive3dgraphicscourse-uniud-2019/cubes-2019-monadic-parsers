'''
Created on 30 mar 2019
Prepares a png heightmap for the generation of the terrain.
It is made of concentric squres with a step like disposition.  
@author: redsnic
'''

import png

def createMatrix(decrement, size):
    '''
    Creates the matrix that will be converted in the heightmap
    size is the length of a side of the square matrix
    decrement is how much the grayscale is reduced by each step of the computation 
    '''
    matr = [ [0 for _ in range(size)] for _ in range(size)]
    angle = 0
    value = 255
    length = size
    
    while angle <= size//2:
        for i in range(angle, length-angle):
            matr[i][angle]      = value
            matr[angle][i]      = value
            matr[i][size-angle-1] = value
            matr[size-angle-1][i] = value
        angle += 1
        value -= decrement
    
    return matr
    

if __name__ == '__main__':  
    increment = 34
    size = 15
    m = createMatrix(increment, size)
    png.from_array( m, 'L' ).save("heightmap.png")
    
    
    