from typing import List


def read_input(file_path: str) -> str:
    with open(file_path) as file:
        return file.read().strip()


def create_grid(data: str) -> List[List[str]]:
    return [list(row) for row in data.split('\n')]


def rotate_grid(grid: List[List[str]]) -> List[List[str]]:
    return [[grid[r][c] for r in reversed(range(len(grid)))] for c in range(len(grid[0]))]


def roll_grid(grid: List[List[str]]) -> List[List[str]]:
    for c in range(len(grid[0])):
        for _ in range(len(grid)):
            for r in range(len(grid)):
                if grid[r][c] == 'O' and r > 0 and grid[r-1][c] == '.':
                    grid[r][c], grid[r-1][c] = '.', 'O'
    return grid


def calculate_score(grid: List[List[str]]) -> int:
    return sum(len(grid) - r for r in range(len(grid)) for c in range(len(grid[0])) if grid[r][c] == 'O')


def find_cycle_length(grid: List[List[str]], target: int) -> int:
    grid_history = {}
    t = 0
    while t < target:
        for _ in range(4):
            t += 1
            grid = roll_grid(grid)
            if t == 1:
                print(calculate_score(grid))
            grid = rotate_grid(grid)
        grid_hash = tuple(tuple(row) for row in grid)
        if grid_hash in grid_history:
            cycle_length = t - grid_history[grid_hash]
            amt = (target - t) // cycle_length
            t += amt * cycle_length
        grid_history[grid_hash] = t
    return calculate_score(grid)


file_path = "./input.txt"
data = read_input(file_path)
grid = create_grid(data)
target = 10**9
final_score = find_cycle_length(grid, target)
print(final_score)
