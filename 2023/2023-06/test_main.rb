require 'test/unit'
require_relative 'main'

class TestMain < Test::Unit::TestCase
  def test_parse_data
    assert_equal [1, 2, 3], parse_data("test:1 2 3")
    assert_equal [4, 5, 6], parse_data("another_test:4 5 6")
  end

  def test_calculate
    assert_equal 1, calculate(2, 1)
    assert_equal 0, calculate(1, 2)
  end
end