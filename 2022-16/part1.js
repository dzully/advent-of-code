const fs = require("fs");

const readData = () => {
  const data = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\r?\n/)
    .map((line) =>
      /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/g.exec(
        line
      )
    )
    .map(([_, valve, rate, to]) => ({
      valve,
      rate: Number(rate),
      to: to.split(", "),
    }))
    .reduce(
      (acc, { valve, rate, to }) =>
        Object.assign(acc, { [valve]: { rate, to } }),
      {}
    );

  return data;
};

const main = () => {
  const data = readData();

  const valves = Object.keys(data);

  const valvesHavingPositiveRate = valves.filter((valve) =>
    Boolean(data[valve].rate)
  );

  const valveBitRepr = valvesHavingPositiveRate.reduce(
    (acc, valve, i) => Object.assign(acc, { [valve]: 1 << i }),
    {}
  );

  const minTime = valves.reduce((acc, valveFrom) => {
    acc[valveFrom] = valves.reduce((acc, valveTo) => {
      acc[valveTo] = data[valveFrom].to.includes(valveTo)
        ? 1
        : Number.POSITIVE_INFINITY;
      return acc;
    }, {});
    return acc;
  }, {});

  for (const mid of valves) {
    for (const start of valves) {
      for (const end of valves) {
        minTime[start][end] = Math.min(
          minTime[start][end],
          minTime[start][mid] + minTime[mid][end]
        );
      }
    }
  }

  const isVisited = (bitReprA, bitReprB) => bitReprA & bitReprB;

  const recursion = ({
    minutesLeft,
    currentValve,
    openedBitRepr,
    rate,
    bitReprMaxRateMap,
  }) => {
    bitReprMaxRateMap[openedBitRepr] = Math.max(
      bitReprMaxRateMap[openedBitRepr] || 0,
      rate
    );

    for (const valve of valvesHavingPositiveRate) {
      const newMinutesLeft = minutesLeft - (minTime[currentValve][valve] + 1);
      const newRate = rate + newMinutesLeft * data[valve].rate;
      const newOpenedBitRepr = openedBitRepr | valveBitRepr[valve];

      if (newMinutesLeft <= 0 || isVisited(valveBitRepr[valve], openedBitRepr))
        continue;

      recursion({
        minutesLeft: newMinutesLeft,
        currentValve: valve,
        openedBitRepr: newOpenedBitRepr,
        rate: newRate,
        bitReprMaxRateMap,
      });
    }

    return bitReprMaxRateMap;
  };

  const bitReprMaxRateMap = recursion({
    minutesLeft: 30,
    currentValve: "AA",
    openedBitRepr: 0,
    rate: 0,
    bitReprMaxRateMap: {},
  });

  const res = Math.max(...Object.values(bitReprMaxRateMap));

  console.log(res);
};

main();
