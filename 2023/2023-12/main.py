# Removed unused imports
from collections import defaultdict

# Use with statement for file handling
with open("./input.txt") as file:
    data = file.read().strip()

lines = data.split('\n')

# Renamed DP to memo for clarity
memo = {}


def calculate_score(dots, blocks, i, bi, current):
    key = (i, bi, current)
    if key in memo:
        return memo[key]

    if i == len(dots):
        return handle_end_of_dots(bi, blocks, current)

    ans = 0
    for c in ['.', '#']:
        if dots[i] == c or dots[i] == '?':
            ans += handle_character(c, dots, blocks, i, bi, current)
    memo[key] = ans
    return ans


def handle_end_of_dots(bi, blocks, current):
    if bi == len(blocks) and current == 0:
        return 1
    elif bi == len(blocks)-1 and blocks[bi] == current:
        return 1
    else:
        return 0


def handle_character(c, dots, blocks, i, bi, current):
    if c == '.' and current == 0:
        return calculate_score(dots, blocks, i+1, bi, 0)
    elif c == '.' and current > 0 and bi < len(blocks) and blocks[bi] == current:
        return calculate_score(dots, blocks, i+1, bi+1, 0)
    elif c == '#':
        return calculate_score(dots, blocks, i+1, bi, current+1)
    return 0


for part2 in [False, True]:
    total_score = 0
    for line in lines:
        dots, blocks = line.split()
        if part2:
            dots = '?'.join([dots]*5)
            blocks = ','.join([blocks]*5)
        blocks = list(map(int, blocks.split(',')))
        memo.clear()
        score = calculate_score(dots, blocks, 0, 0, 0)
        total_score += score
    print(total_score)
