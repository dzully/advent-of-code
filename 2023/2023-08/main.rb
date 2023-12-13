def least_common_multiple(*numbers)
  numbers.reduce(1) { |result, num| num * result / num.gcd(result) }
end

def parse_rule(rule_line)
  state, lr = rule_line.split('=').map(&:strip)
  left, right = lr.split(',').map(&:strip)
  left = left[1..]
  right = right[0..-2]
  [state, left, right]
end

def solve(is_part2)
  positions = []
  transitions = { 'L' => {}, 'R' => {} }
  steps, rule = File.read('./input.txt').strip.split("\n\n")

  rule.split("\n").each do |rule_line|
    state, left, right = parse_rule(rule_line)
    transitions['L'][state] = left
    transitions['R'][state] = right
  end

  positions = transitions['L'].keys.select { |state| is_part2 ? state.end_with?('AAA') : state.end_with?('A') }

  time_values = {}
  time = 0

  loop do
    positions.map!.with_index do |position, index|
      position = transitions[steps[time % steps.length]][position]
      if position.end_with?('Z')
        time_values[index] = time + 1
        return least_common_multiple(*time_values.values) if time_values.length == positions.length
      end
      position
    end
    time += 1
  end
end

puts solve(true)
puts solve(false)