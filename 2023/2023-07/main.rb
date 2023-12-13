CARD_RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
JOKER_RANKS = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
PATTERN_RANKS = [[1, 1, 1, 1, 1], [2, 1, 1, 1], [2, 2, 1], [3, 1, 1], [3, 2], [4, 1], [5]]

def resolve_tie(cards_one, cards_two, ranks)
  5.times do |i|
    card_one = ranks.index(cards_one[i])
    card_two = ranks.index(cards_two[i])
    return -1 if card_two > card_one
    return 1 if card_one > card_two
  end
  0
end

def calculate_total(ranks)
  ranks.reduce(0) { |sum, (rank, cards, bid)| sum + bid * rank }
end

def process_bids(patterns, bids, ranks, rank_ranks)
  rank = 0
  patterns.each do |key, value|
    ordered_cards = value.sort { |a, b| resolve_tie(a, b, rank_ranks) }
    ordered_cards.each do |cards|
      rank += 1
      ranks << [rank, cards, bids[cards]]
    end
  end
  calculate_total(ranks)
end

def main
  start_time = Time.now
  ranks = []
  bids = {}
  patterns = Hash[PATTERN_RANKS.map {|key| [key, []]}]
  File.open("input.txt") do |f|
    f.each_line do |line|
      cards, bid_str = line.split(" ")
      bid = bid_str.to_i
      bids[cards] = bid
      count = cards.each_char.each_with_object(Hash.new(0)) { |card, counts| counts[card] += 1 }
      card_counts = count.values.sort.reverse
      patterns[card_counts] << cards
    end
  end

  ranks = []
  patterns = Hash[PATTERN_RANKS.map {|key| [key, []]}]
  bids.each do |cards, _|
    count = cards.each_char.each_with_object(Hash.new(0)) { |card, counts| counts[card] += 1 }
    if count["J"] && count["J"] != 5
      jc = count["J"]
      count.delete("J")
      max_count = count.max_by { |_, v| v }[0]
      count[max_count] += jc
    end
    card_counts = count.values.sort.reverse
    patterns[card_counts] << cards
  end
  end_time = Time.now

  puts "Execution time: #{end_time - start_time} seconds"
  puts process_bids(patterns, bids, ranks, CARD_RANKS)
  puts process_bids(patterns, bids, ranks, JOKER_RANKS)
end

main if __FILE__ == $0