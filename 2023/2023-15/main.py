import time


def read_file_content(file_path):
    """Reads a file and returns its content as a string."""
    with open(file_path, 'r') as file:
        return file.read().strip()


def compute_hash(s):
    """Computes a hash for a string using a custom algorithm."""
    hash_value = 0
    for char in s:
        hash_value = ((hash_value + ord(char)) * 17) % 256
    return hash_value


def process_and_hash_commands(commands):
    """Processes a list of commands and returns the result."""
    first_hash_sum = sum(compute_hash(command) for command in commands)

    hash_boxes = [[] for _ in range(256)]
    for command in commands:
        if command[-1] == '-':
            name = command[:-1]
            hash_value = compute_hash(name)
            hash_boxes[hash_value] = [(n, v) for (
                n, v) in hash_boxes[hash_value] if n != name]
        elif command[-2] == '=':
            name = command[:-2]
            hash_value = compute_hash(name)
            length = int(command[-1])
            if name in [n for (n, v) in hash_boxes[hash_value]]:
                hash_boxes[hash_value] = [
                    (n, length if name == n else v) for (n, v) in hash_boxes[hash_value]]
            else:
                hash_boxes[hash_value].append((name, length))

    second_hash_sum = sum((i+1)*(j+1)*v for i, box in enumerate(hash_boxes)
                          for j, (n, v) in enumerate(box))

    return first_hash_sum, second_hash_sum


def main():
    """Main function to run the program."""
    start_time = time.time()

    file_content = read_file_content("./input.txt")
    commands = file_content.split(',')
    first_hash_sum, second_hash_sum = process_and_hash_commands(commands)

    end_time = time.time()
    execution_time = end_time - start_time

    print(f"First hash sum: {first_hash_sum}")
    print(f"Second hash sum: {second_hash_sum}")
    print(f"Execution time: {execution_time} seconds")


if __name__ == "__main__":
    main()
