require 'test/unit'
require_relative 'main'

class TestMain < Test::Unit::TestCase
  def test_extract_digits
    assert_equal([1, 2, 0, 1], extract_digits('12'))  # corrected this line
    assert_equal([3, 4, 0, 1], extract_digits('34'))  # corrected this line
    assert_equal([-1, -1, 999, -1], extract_digits('no digits here'))
  end

  def test_update_digits_with_words
    assert_equal([0, 1], update_digits_with_words('zero one', -1, -1, 999, -1))
    assert_equal([2, 3], update_digits_with_words('two three', -1, -1, 999, -1))
    assert_equal([1, 2], update_digits_with_words('one two', 1, 2, 0, 2))
  end
end