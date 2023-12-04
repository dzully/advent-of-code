# Constants
WORDS = %w[zero one two three four five six seven eight nine]

# Extracts the first and last digit from a line
def extract_digits(line)
  first = -1
  last = -1
  first_k = 999
  last_k = -1

  line.each_char.with_index do |v, k|
    next unless v >= '0' && v <= '9'

    if first < 0
      first = v.to_i
      first_k = k
    else
      last = v.to_i
      last_k = k
    end
  end

  last, last_k = first, first_k if last == -1 && first > -1

  [first, last, first_k, last_k]
end

# Updates the first and last digit based on the words in the line
def update_digits_with_words(line, first, last, first_k, last_k)
  WORDS.each_with_index do |word, k|
    i = line.index(word)
    if i && i < first_k
      first = k
      first_k = i
    end

    i = line.rindex(word)
    if i && i > last_k
      last = k
      last_k = i
    end
  end

  [first, last]
end

# Processes a file and returns the sum of the first and last digits
def process_file(file)
  part1 = 0
  part2 = 0

  File.open(file, 'r') do |f|
    f.each_line do |line|
      first, last, first_k, last_k = extract_digits(line)
      part1 += first * 10 + last

      first, last = update_digits_with_words(line, first, last, first_k, last_k)
      part2 += first * 10 + last

      # Sanity check
      raise 'Out of bounds' if first <= 0 || first > 9 || last <= 0 || last > 9
    end
  end

  [part1, part2]
end

# Main method
def main
  part1, _ = process_file('part_1.txt')
  _, part2 = process_file('part_2.txt')

  puts "#{part1}, #{part2}"
end

main if __FILE__ == $PROGRAM_NAME