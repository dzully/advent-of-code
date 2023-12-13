import re
import sys
from collections import Counter, defaultdict, deque
from copy import deepcopy
from math import gcd


def read_input(file_path):
    with open(file_path, 'r') as file:
        return [list(line.strip()) for line in file]


def find_start(grid):
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            if grid[row][col] == 'S':
                return row, col
    return None, None


def is_valid(grid, row, col, pipe):
    return grid[row][col] in pipe


def update_grid(grid, row, col, up_valid, right_valid, down_valid, left_valid):
    if up_valid and down_valid:
        grid[row][col] = '|'
        direction = 0
    elif up_valid and right_valid:
        grid[row][col] = 'L'
        direction = 0
    elif up_valid and left_valid:
        grid[row][col] = 'J'
        direction = 0
    elif down_valid and right_valid:
        grid[row][col] = 'F'
        direction = 2
    elif down_valid and left_valid:
        grid[row][col] = '7'
        direction = 2
    elif left_valid and right_valid:
        grid[row][col] = '-'
        direction = 1
    else:
        assert False
    return direction


def calculate_distance(grid, start_row, start_col, start_direction):
    direction_row = [-1, 0, 1, 0]
    direction_col = [0, 1, 0, -1]
    row, col, direction = start_row, start_col, start_direction
    distance = 0
    pipe_to_direction = {
        'L': {2: 1, 3: 0},
        'J': {1: 0, 2: 3},
        '7': {0: 3, 1: 2},
        'F': {0: 1, 3: 2}
    }
    while True:
        distance += 1
        row += direction_row[direction]
        col += direction_col[direction]
        if grid[row][col] in pipe_to_direction:
            if direction not in pipe_to_direction[grid[row][col]]:
                break
            direction = pipe_to_direction[grid[row][col]][direction]
        assert grid[row][col] != '.'
        if (row, col) == (start_row, start_col):
            return distance // 2
    return None


def expand_grid(grid):
    expanded_grid = [['.' for _ in range(len(grid[0])*3)]
                     for _ in range(len(grid)*3)]
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            if grid[row][col] == '|':
                set_vertical(expanded_grid, row, col)
            elif grid[row][col] == '-':
                set_horizontal(expanded_grid, row, col)
            elif grid[row][col] == '7':
                set_pipe_7(expanded_grid, row, col)
            elif grid[row][col] == 'F':
                set_pipe_f(expanded_grid, row, col)
            elif grid[row][col] == 'J':
                set_pipe_j(expanded_grid, row, col)
            elif grid[row][col] == 'L':
                set_pipe_l(expanded_grid, row, col)
    return expanded_grid


def set_vertical(expanded_grid, row, col):
    for i in range(3):
        expanded_grid[3*row+i][3*col+1] = 'x'


def set_horizontal(expanded_grid, row, col):
    for i in range(3):
        expanded_grid[3*row+1][3*col+i] = 'x'


def set_pipe_7(expanded_grid, row, col):
    expanded_grid[3*row+1][3*col] = 'x'
    expanded_grid[3*row+2][3*col+1] = 'x'


def set_pipe_f(expanded_grid, row, col):
    expanded_grid[3*row+2][3*col+1] = 'x'
    expanded_grid[3*row+1][3*col+2] = 'x'


def set_pipe_j(expanded_grid, row, col):
    expanded_grid[3*row][3*col+1] = 'x'
    expanded_grid[3*row+1][3*col] = 'x'


def set_pipe_l(expanded_grid, row, col):
    expanded_grid[3*row][3*col+1] = 'x'
    expanded_grid[3*row+1][3*col+2] = 'x'


def bfs(grid):
    queue = deque()
    seen = set()
    direction_row = [-1, 0, 1, 0]
    direction_col = [0, 1, 0, -1]
    for row in range(len(grid)):
        queue.append((row, 0))
        queue.append((row, len(grid[0])-1))
    for col in range(len(grid[0])):
        queue.append((0, col))
        queue.append((len(grid)-1, col))
    while queue:
        row, col = queue.popleft()
        if (row, col) in seen:
            continue
        if not (0 <= row < len(grid) and 0 <= col < len(grid[0])):
            continue
        seen.add((row, col))
        if grid[row][col] == 'x':
            continue
        for direction in range(4):
            queue.append(
                (row+direction_row[direction], col+direction_col[direction]))
    return seen


def count_unseen(grid, seen):
    unseen_count = 0
    for row in range(len(grid)//3):
        for col in range(len(grid[0])//3):
            if not any((3*row+i, 3*col+j) in seen for i in range(3) for j in range(3)):
                unseen_count += 1
    return unseen_count


def main():
    grid = read_input("./input.txt")
    start_row, start_col = find_start(grid)
    up_valid = is_valid(grid, start_row-1, start_col, ['|', '7', 'F'])
    right_valid = is_valid(grid, start_row, start_col+1, ['-', '7', 'J'])
    down_valid = is_valid(grid, start_row+1, start_col, ['|', 'L', 'J'])
    left_valid = is_valid(grid, start_row, start_col-1, ['-', 'L', 'F'])
    assert sum([up_valid, right_valid, down_valid, left_valid]) == 2
    start_direction = update_grid(
        grid, start_row, start_col, up_valid, right_valid, down_valid, left_valid)
    print(calculate_distance(grid, start_row, start_col, start_direction))
    expanded_grid = expand_grid(grid)
    seen = bfs(expanded_grid)
    print(count_unseen(expanded_grid, seen))


if __name__ == "__main__":
    main()
