import re

import numpy as np


def read_file(file_path):
    """Reads a file and returns a list of lines."""
    with open(file_path, 'r') as file:
        lines = file.read().strip().split("\n")
    return lines


def convert_to_int_array(lines):
    """Converts a list of lines into a numpy array of integers."""
    return np.array([list(map(int, re.findall(r"-?\d+", line))) for line in lines])


def calculate_sum(array):
    """Calculates and prints the sum of differences for the original and flipped array."""
    for arr in (array, np.flip(array, 1)):
        print(np.sum([np.diff(arr, k)[:, -1] for k in range(len(array[0]))]))


def main():
    lines = read_file("./input.txt")
    int_array = convert_to_int_array(lines)
    calculate_sum(int_array)


if __name__ == "__main__":
    main()
