require 'test/unit'
require_relative 'main'

class TestFunctions < Test::Unit::TestCase
  def test_parse_function
    assert_equal([[1, 2, 3], [4, 5, 6]], parse_function("Function:\n1 2 3\n4 5 6"))
  end

  def test_apply_function_to_value
    assert_equal(2, apply_function_to_value([[1, 2, 3]], 3))
    assert_equal(5, apply_function_to_value([[1, 2, 3]], 5))
  end

  def test_apply_function_to_range
    assert_equal([[1, 2]], apply_function_to_range([[1, 2, 3]], [[2, 3]]))
    assert_equal([[3, 4], [1, 2]], apply_function_to_range([[1, 2, 3]], [[2, 3], [4, 5]]))
  end
end