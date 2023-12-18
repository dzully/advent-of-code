from typing import List, Tuple


def shoelace(tuples_list: List[Tuple[int, int]]) -> int:
    position, area_a, area_b, total_distance = 0 + 0j, 0, 0, 0
    direction_map = {0: 1j, 1: 1, 2: -1j, 3: -1}

    for direction, distance in tuples_list:
        new_position = position + (direction_map[direction] * distance)
        area_a += position.real * new_position.imag
        area_b += position.imag * new_position.real
        total_distance += distance
        position = new_position

    return int((abs(area_a - area_b) / 2) + (total_distance / 2) + 1)


def read_plan(file_name: str) -> List[Tuple[str, str]]:
    with open(file_name, 'r') as file:
        return [tuple(line.split()) for line in file.read().splitlines()]


def process_plan(plan: List[Tuple[str, str]]) -> List[Tuple[int, int]]:
    return [('RDLU'.index(direction), int(distance)) for direction, distance, _ in plan]


def process_hex_plan(plan: List[Tuple[str, str]]) -> List[Tuple[int, int]]:
    return [(int(hex_string[-2]), int(hex_string[2:-2], base=16)) for _, _, hex_string in plan]


plan = read_plan('input.txt')
print(shoelace(process_plan(plan)))
print(shoelace(process_hex_plan(plan)))
