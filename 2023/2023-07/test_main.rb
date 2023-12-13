require 'test/unit'
require_relative 'main' # assuming the code is in a file named main.rb

class TestMain < Test::Unit::TestCase
  def setup
    @ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
  end

  def test_resolve_tie
    assert_equal 1, resolve_tie(["A", "K", "Q", "J", "T"], ["K", "Q", "J", "T", "9"], @ranks)
    assert_equal -1, resolve_tie(["K", "Q", "J", "T", "9"], ["A", "K", "Q", "J", "T"], @ranks)
    assert_equal 0, resolve_tie(["A", "K", "Q", "J", "T"], ["A", "K", "Q", "J", "T"], @ranks)
  end

  def test_calculate_total
    assert_equal 10, calculate_total([[1, "23456", 2], [2, "34567", 4]])
    assert_equal 0, calculate_total([])
  end

  def test_process_bids
    patterns = { [1, 1, 1, 1, 1] => ["23456", "34567"], [2, 1, 1, 1] => ["22345"] }
    bids = { "23456" => 2, "34567" => 4, "22345" => 3 }
    assert_equal 19, process_bids(patterns, bids, [], @ranks)
  end
end