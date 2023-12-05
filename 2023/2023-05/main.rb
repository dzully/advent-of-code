# Parse function from string
def parse_function(s)
  s.lines[1..-1].map { |line| line.split.map(&:to_i) }
end

# Apply function to a single value
def apply_function_to_value(function, value)
  function.each do |dest, src, size|
    return value + dest - src if src <= value && value < src + size
  end
  value
end

# Apply function to a range
def apply_function_to_range(function, range)
  result = []
  function.each do |dest, src, size|
    src_end = src + size
    new_range = []
    until range.empty?
      start, end_ = range.pop
      before = [start, [end_, src].min]
      inter = [[start, src].max, [src_end, end_].min]
      after = [[src_end, start].max, end_]
      new_range << before if before[1] > before[0]
      result << [inter[0] - src + dest, inter[1] - src + dest] if inter[1] > inter[0]
      new_range << after if after[1] > after[0]
    end
    range = new_range
  end
  result + range
end

# Main method
def main
  start_time = Time.now
  data = File.read('input.txt').strip
  seed, *functions = data.split("\n\n")
  seed = seed.split(':')[1].split.map(&:to_i)
  functions = functions.map { |s| parse_function(s) }

  part1 = seed.map do |value|
    functions.each { |function| value = apply_function_to_value(function, value) }
    value
  end

  part2 = seed.each_slice(2).map do |start, size|
    range = [[start, start + size]]
    functions.each { |function| range = apply_function_to_range(function, range) }
    range.min[0]
  end

  end_time = Time.now
  puts "Execution time: #{end_time - start_time} seconds"
  puts "#{part1.min} #{part2.min}"
end

main if __FILE__ == $PROGRAM_NAME