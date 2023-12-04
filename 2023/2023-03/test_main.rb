require 'test/unit'
require_relative 'main'
require 'set'

class TestMain < Test::Unit::TestCase
  def setup
    @row = '123*456.789'
    @r = 0
    @grid = ['123*456.789']
    @row_length = 1
    @col_length = 10
    @result = extract_gears(@row, @r, @grid, @row_length, @col_length)
  end

  def test_extract_gears
    assert_equal(Array, @result.class)
    assert_equal(2, @result.size)
    assert_equal(Hash, @result.first.class)
    assert_equal(Integer, @result.last.class)
  
    assert_equal([[0, 3]], @result.first.keys)
    assert_equal([123, 456], @result.first[[0, 3]])
    assert_equal(123 + 456, @result.last)
  end
end