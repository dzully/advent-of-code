require 'test/unit'
require_relative 'main'

class TestMain < Test::Unit::TestCase
  def test_extract_cubes
    assert_equal([{"red" => 12, "green" => 13, "blue" => 14}, false], extract_cubes(["12 red,13 green,14 blue"]))
    assert_equal([{"red" => 10, "green" => 11, "blue" => 12}, false], extract_cubes(["10 red,11 green,12 blue"]))
    assert_equal([{"red" => 13, "green" => 14, "blue" => 15}, true], extract_cubes(["13 red,14 green,15 blue"]))
  end
end