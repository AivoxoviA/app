const log = require('./log');
module.exports = options => {
  if (!options.every( option => {
    if (!option.weight) option.weight = 1;

    return option.weight > 0;
  })) return {message: "Error assigning option.weight!"};

  const weightTotal = options.reduce((sum, option) => sum + option.weight, 0);

  const seed = Math.random();
  const weightedSeed = seed * weightTotal;

  log(
    "seed", seed,
    "weighted", weightedSeed,
    "total", weightTotal
  );

  let runningTotal = 0;
  for (let option of options) {
    runningTotal += option.weight;

    if (runningTotal > weightedSeed) {
      return option;
    }
  }

  return { message: "Something is wrong!" };
};
