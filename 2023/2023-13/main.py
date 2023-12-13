def calculate_total_badness(grid, rows, columns, is_part2, total_badness):
    total_badness = calculate_horizontal_badness(
        grid, rows, columns, is_part2, total_badness)
    total_badness = calculate_vertical_badness(
        grid, rows, columns, is_part2, total_badness)
    return total_badness


def calculate_horizontal_badness(grid, rows, columns, is_part2, total_badness):
    for column in range(columns-1):
        badness = calculate_column_badness(grid, rows, column)
        if badness == (1 if is_part2 else 0):
            total_badness += column + 1
    return total_badness


def calculate_column_badness(grid, rows, column):
    badness = 0
    for delta_column in range(columns):
        left = column - delta_column
        right = column + 1 + delta_column
        if 0 <= left < right < columns:
            for row in range(rows):
                if grid[row][left] != grid[row][right]:
                    badness += 1
    return badness


def calculate_vertical_badness(grid, rows, columns, is_part2, total_badness):
    for row in range(rows-1):
        badness = calculate_row_badness(grid, row, rows, columns)
        if badness == (1 if is_part2 else 0):
            total_badness += 100 * (row + 1)
    return total_badness


def calculate_row_badness(grid, row, rows, columns):
    badness = 0
    for delta_row in range(rows):
        up = row - delta_row
        down = row + 1 + delta_row
        if 0 <= up < down < rows:
            for column in range(columns):
                if grid[up][column] != grid[down][column]:
                    badness += 1
    return badness


with open("./input.txt") as file:
    data = file.read().strip()

for is_part2 in [False, True]:
    total_badness = 0
    for grid_data in data.split('\n\n'):
        grid = [[char for char in row] for row in grid_data.split('\n')]
        rows = len(grid)
        columns = len(grid[0])
        total_badness = calculate_total_badness(
            grid, rows, columns, is_part2, total_badness)
    print(f"{total_badness}")
