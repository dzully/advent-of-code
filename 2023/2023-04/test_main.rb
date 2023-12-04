require 'test/unit'
require_relative 'main'

class TestMain < Test::Unit::TestCase
  def setup
    @line1 = "Line: 1 2 3 | 2 3 4"
    @line2 = "Line: 1 2 3 | 4 5 6"
    @lines = [@line1, @line2]
  end

  def test_process_line
    assert_equal(Set.new(["2", "3"]), process_line(@line1))
    assert_equal(Set.new([]), process_line(@line2))
  end

  def test_calculate_total_and_cards
    total, sum_of_cards = calculate_total_and_cards(@lines)
    assert(total.is_a?(Integer))
    assert(sum_of_cards.is_a?(Integer))
  end
end