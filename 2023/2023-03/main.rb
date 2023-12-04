require 'set'

# Constants
DIRECTIONS = [-1, 0, 1].product([-1, 0, 1])

# Extracts the gears from a row and returns a hash with the numbers and a sum
def extract_gears(row, r, grid, row_length, col_length)
  gears = Set.new
  n = 0
  has_part = false
  sum = 0
  nums = Hash.new { |h, k| h[k] = [] }

  (0..row.length).each do |c|
    if c < col_length && row[c].match?(/\d/)
      n = n * 10 + row[c].to_i
      DIRECTIONS.each do |rr, cc|
        if r + rr >= 0 && r + rr < row_length && c + cc >= 0 && c + cc < col_length
          ch = grid[r + rr][c + cc]
          has_part = true unless ch.match?(/\d/) || ch == '.'
          gears.add([r + rr, c + cc]) if ch == '*'
        end
      end
    elsif n > 0
      gears.each { |gear| nums[gear] << n }
      sum += n if has_part
      n = 0
      has_part = false
      gears = Set.new
    end
  end

  [nums, sum]
end

# Processes a file and returns the sum of the numbers and the product of the gears
def process_file(file)
  data = File.read(file).strip
  lines = data.split("\n")
  grid = lines.map { |line| line.chars }
  row_length = grid.length
  col_length = grid[0].length

  p1 = 0
  nums = Hash.new { |h, k| h[k] = [] }
  grid.each_with_index do |row, r|
    row_nums, row_p1 = extract_gears(row, r, grid, row_length, col_length)
    nums.merge!(row_nums) { |_, old_val, new_val| old_val + new_val }
    p1 += row_p1
  end

  p2 = 0
  nums.each do |_, v|
    p2 += v[0] * v[1] if v.length == 2
  end

  [p1, p2]
end

# Main method
def main
  p1, p2 = process_file('input.txt')
  puts "#{p1}, #{p2}"
end

main if __FILE__ == $PROGRAM_NAME