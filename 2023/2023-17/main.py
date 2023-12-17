import heapq


class Grid:
    # Define the directions for movement
    DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]]

    def __init__(self, file_path):
        # Read the input file and create a grid from it
        with open(file_path) as file:
            self.grid_data = [list(line.strip()) for line in file]
        self.rows = len(self.grid_data)
        self.cols = len(self.grid_data[0])

    def solve(self, is_part2):
        # Initialize the queue and the distance dictionary
        queue = [(0, 0, 0, -1, -1)]
        distance_dict = {}

        def process_queue(dist, row, col, direction, indirect):
            if (row, col, direction, indirect) in distance_dict:
                return
            distance_dict[(row, col, direction, indirect)] = dist

            for i, (delta_row, delta_col) in enumerate(self.DIRECTIONS):
                new_row = row + delta_row
                new_col = col + delta_col
                new_direction = i
                new_indirect = 1 if new_direction != direction else indirect + 1

                isn_reverse = ((new_direction + 2) % 4 != direction)

                if 0 <= new_row < self.rows and 0 <= new_col < self.cols and isn_reverse:
                    if is_part2:
                        is_valid = new_indirect <= 10 and (
                            new_direction == direction or indirect >= 4 or indirect == -1)
                    else:
                        is_valid = new_indirect <= 3

                    if is_valid:
                        # Rename "grid" to "grid_data"
                        cost = int(self.grid_data[new_row][new_col])
                        heapq.heappush(
                            queue, (dist + cost, new_row, new_col, new_direction, new_indirect))

        while queue:
            dist, row, col, direction, indirect = heapq.heappop(queue)
            process_queue(dist, row, col, direction, indirect)

        min_distance = float('inf')
        for (row, col, direction, indirect), dist in distance_dict.items():
            if row == self.rows - 1 and col == self.cols - 1:
                min_distance = min(min_distance, dist)
        return min_distance


# Create a Grid instance and solve the problem
grid = Grid("./input.txt")
print(grid.solve(False))
print(grid.solve(True))
