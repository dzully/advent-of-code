require 'set'

def process_line(line)
  _, l = line.split(":")
  winning, have = l.split("|").map(&:strip)

  winning_set = winning.split(" ").reject(&:empty?).to_set
  have_set = have.split(" ").reject(&:empty?).to_set

  winning_set & have_set
end

def calculate_total_and_cards(lines)
  total = 0
  cards = Array.new(lines.size, 1)

  lines.each_with_index do |line, idx|
    result = process_line(line)
    next if result.empty?

    total += 2 ** (result.size - 1)
    result.size.times do |i|
      next_idx = idx + i + 1
      cards[next_idx] += cards[idx] if next_idx < cards.size
    end
  end

  [total, cards.sum]
end

def main
  start_time = Time.now
  lines = File.readlines('input.txt').map(&:strip)
  total, sum_of_cards = calculate_total_and_cards(lines)
  end_time = Time.now

  puts "Execution time: #{end_time - start_time} seconds"
  puts "Total: #{total}"
  puts "Sum of cards: #{sum_of_cards}"
end

main if __FILE__ == $PROGRAM_NAME