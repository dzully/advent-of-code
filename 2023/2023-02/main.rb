# Constants
LIMIT = {"red" => 12, "green" => 13, "blue" => 14}

# Extracts the cubes from a line and returns a hash with the maximum number of each color
def extract_cubes(sets)
  l2 = Hash.new(0)
  invalid = false

  sets.each do |v|
    cubes = v.split(",")
    cubes.each do |c|
      num, col = c.split.map { |x| x =~ /\A\d+\z/ ? x.to_i : x }
      l2[col] = [l2[col], num].max
      invalid = true if num > LIMIT[col]
    end
  end

  [l2, invalid]
end

# Processes a file and returns the sum of the game ids and the product of the maximum number of each color
def process_game_data(file)
  part1 = part2 = 0
  gameid = 0

  File.open(file, 'r') do |f|
    f.each_line do |line|
      gameid += 1
      _, r2 = line.split(":")
      sets = r2.split(";")

      l2, invalid = extract_cubes(sets)

      part1 += gameid unless invalid
      part2 += l2["red"] * l2["green"] * l2["blue"]
    end
  end

  [part1, part2]
end

# Main method
def main
  start_time = Time.now
  part1, part2 = process_game_data('input.txt')
  end_time = Time.now
  
  puts "Execution time: #{end_time - start_time} seconds"
  puts "#{part1}, #{part2}"
end

main if __FILE__ == $PROGRAM_NAME