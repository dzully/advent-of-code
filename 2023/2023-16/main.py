with open("./input.txt") as file:
    grid = [list(line.strip()) for line in file]

# Grid dimensions
num_rows = len(grid)
num_cols = len(grid[0])

# Directions for row and column
row_directions = [-1, 0, 1, 0]
col_directions = [0, 1, 0, -1]


def move_step(row, col, direction):
    return (row + row_directions[direction], col + col_directions[direction], direction)


def calculate_score(start_row, start_col, start_direction):
    positions = [(start_row, start_col, start_direction)]
    visited = set()
    visited_directions = set()

    while positions:
        next_positions = []
        for (row, col, direction) in positions:
            if 0 <= row < num_rows and 0 <= col < num_cols:
                visited.add((row, col))
                if (row, col, direction) in visited_directions:
                    continue
                visited_directions.add((row, col, direction))
                cell = grid[row][col]
                next_positions.extend(
                    get_next_positions(row, col, direction, cell))
        positions = next_positions
    return len(visited)


def get_next_positions(row, col, direction, cell):
    if cell == '.':
        return get_next_positions_for_dot(row, col, direction)
    elif cell == '/':
        return get_next_positions_for_slash(row, col, direction)
    elif cell == '\\':
        return get_next_positions_for_backslash(row, col, direction)
    elif cell == '|':
        return get_next_positions_for_vertical(row, col, direction)
    elif cell == '-':
        return get_next_positions_for_horizontal(row, col, direction)
    else:
        assert False


def get_next_positions_for_dot(row, col, direction):
    return [move_step(row, col, direction)]


def get_next_positions_for_slash(row, col, direction):
    return [move_step(row, col, {0: 1, 1: 0, 2: 3, 3: 2}[direction])]


def get_next_positions_for_backslash(row, col, direction):
    return [move_step(row, col, {0: 3, 1: 2, 2: 1, 3: 0}[direction])]


def get_next_positions_for_vertical(row, col, direction):
    if direction in [0, 2]:
        return [move_step(row, col, direction)]
    else:
        return [move_step(row, col, 0), move_step(row, col, 2)]


def get_next_positions_for_horizontal(row, col, direction):
    if direction in [1, 3]:
        return [move_step(row, col, direction)]
    else:
        return [move_step(row, col, 1), move_step(row, col, 3)]


print(calculate_score(0, 0, 1))

max_score = 0
for row in range(num_rows):
    max_score = max(max_score, calculate_score(row, 0, 1))
    max_score = max(max_score, calculate_score(row, num_cols-1, 3))
for col in range(num_cols):
    max_score = max(max_score, calculate_score(0, col, 2))
    max_score = max(max_score, calculate_score(num_rows-1, col, 0))
print(max_score)
