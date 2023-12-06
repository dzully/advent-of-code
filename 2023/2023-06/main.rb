def parse_data(s)
  s.split(':').last.split.map(&:to_i)
end

def calculate(t, d)
  (0..t).sum { |x| x * (t - x) >= d ? 1 : 0 }
end

def main
  start_time = Time.now
  data = File.read('input.txt').strip.split("\n")
  times, dists = data.map { |s| parse_data(s) }

  total_time = times.join.to_i
  total_dist = dists.join.to_i

  part1 = times.zip(dists).map { |t, d| calculate(t, d) }.reduce(:*)
  part2 = calculate(total_time, total_dist)

  end_time = Time.now
  puts "Execution time: #{end_time - start_time} seconds"
  puts "#{part1} #{part2}"
end

main if __FILE__ == $PROGRAM_NAME