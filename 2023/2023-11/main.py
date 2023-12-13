from collections import defaultdict


def load_data(file_path):
    """Load data from file and return grid and its dimensions."""
    with open(file_path, 'r') as file:
        grid = [list(line.strip()) for line in file]
    rows, cols = len(grid), len(grid[0])
    assert all(len(row) == cols for row in grid)
    return grid, rows, cols


def find_empty_lines(grid, rows, cols):
    """Find and return empty rows and columns in the grid."""
    empty_rows = [r for r in range(rows) if '#' not in grid[r]]
    empty_cols = [c for c in range(cols) if '#' not in (
        grid[r][c] for r in range(rows))]
    return empty_rows, empty_cols


def find_galaxies(grid, rows, cols):
    """Find and return galaxies in the grid."""
    return [(r, c) for r in range(rows) for c in range(cols) if grid[r][c] == '#']


def calculate_distance(galaxies, empty_rows, empty_cols, expansion_factor):
    """Calculate and return total distance between galaxies."""
    total_distance = 0
    for i, (r1, c1) in enumerate(galaxies):
        for r2, c2 in galaxies[i:]:
            distance = abs(r2 - r1) + abs(c2 - c1)
            distance += sum(expansion_factor for er in empty_rows if min(r1,
                            r2) <= er <= max(r1, r2))
            distance += sum(expansion_factor for ec in empty_cols if min(c1,
                            c2) <= ec <= max(c1, c2))
            total_distance += distance
    return total_distance


def main():
    """Main function."""
    grid, rows, cols = load_data('./input.txt')
    empty_rows, empty_cols = find_empty_lines(grid, rows, cols)
    galaxies = find_galaxies(grid, rows, cols)
    for part2 in [False, True]:
        expansion_factor = 10**6 - 1 if part2 else 1
        total_distance = calculate_distance(
            galaxies, empty_rows, empty_cols, expansion_factor)
        print(f'Total distance: {total_distance}')


if __name__ == "__main__":
    main()
