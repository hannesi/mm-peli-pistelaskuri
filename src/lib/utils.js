export function getEmptyPlayerData(name) {
  return {
    name,
    totalPoints: 0,
    placement: undefined,
    goldMedals: 0,
    silverMedals: 0,
    medalPoints: undefined,
    sports: {
      longJump: {
        measurement: undefined,
        points: undefined,
        placement: undefined,
      },
      hurdles: {
        measurement: undefined,
        points: undefined,
        placement: undefined,
      },
      javelin: {
        measurement: undefined,
        points: undefined,
        placement: undefined,
      },
      poleVault: {
        measurement: undefined,
        points: undefined,
        placement: undefined,
      },
      run: {
        measurement: undefined,
        points: undefined,
        placement: undefined,
      },
    },
  };
}

export function scoreSport(sport, measurement) {
  switch (sport) {
    case "longJump":
      return calculatePoints(measurement, 7.6, 100, 2, false);
    case "hurdles":
      return calculatePoints(measurement, 14, 100, 2, true);
    case "javelin":
      return calculatePoints(measurement, 75, 10, 1, false);
    case "poleVault":
      return calculatePoints(measurement, 4.6, 100, 2, false);
    case "run":
      return calculatePoints(measurement, 232, 10, 1, true);
    default:
      console.error("panic!");
      break;
  }
}

/** calculates points
 *
 * @param {number} measurement - the measured value
 * @param {number} threshold - the point from which points start accumulating
 * @param {number} stepsPerUnit - steps per unit of measurement (1)
 * @param {number} pointsPerStep - points per full step over/above threshold
 * @param {boolean} reverse - true: steps go downwards from threshold, false: steps go upwards from threshold
 * @returns calculated points
 */
function calculatePoints(
  measurement,
  threshold,
  stepsPerUnit,
  pointsPerStep,
  reverse
) {
  const scaledMeasurement = measurement * stepsPerUnit;
  const scaledThreshold = threshold * stepsPerUnit;
  const steps = reverse
    ? scaledThreshold - scaledMeasurement
    : scaledMeasurement - scaledThreshold;
  return Math.max(0, Math.floor(steps * pointsPerStep));
  // return pointsPerStep * Math.max(0, Math.floor((reverse ? threshold - measurement : measurement - threshold) / step))
}

export function resolvePlacements(players) {
  const p = [...players];
  for (const key in p[0].sports) {
    p.sort((a, b) =>
      key === "hurdles" || key === "run"
        ? a.sports[key].measurement - b.sports[key].measurement
        : b.sports[key].measurement - a.sports[key].measurement
    );
    let rollingPlacement = 1;
    let prevMeasurement = p[0].sports[key].measurement;
    for (let i = 0; i < p.length; i++) {
      if (p[i].sports[key].measurement !== prevMeasurement) {
        rollingPlacement = i + 1;
      }
      p[i].sports[key].placement = rollingPlacement;
    }
  }
  return p;
}

export function resolveMedals(players) {
  return players.map((p) => {
    for (const key in p.sports) {
      switch (p.sports[key].placement) {
        case 1:
          p.goldMedals++;
          break;
        case 2:
          p.silverMedals++;
          break;
        default:
          break;
      }
    }
    return p;
  });
}

export function calculateTotalPoints(players) {
  return players.map((p) => {
    for (const key in p.sports) {
      p.sports[key].points = scoreSport(key, p.sports[key].measurement);
    }
    p.medalPoints = p.goldMedals * 25 + p.silverMedals * 10;
    for (const key in p.sports) {
      p.totalPoints += p.sports[key].points;
    }
    p.totalPoints += p.medalPoints;
    return p;
  });
}

export function resolveFinalPlacements(players) {
  const p = [...players];
  p.sort((a, b) => b.totalPoints - a.totalPoints);
  let rollingPlacement = 1;
  let prevPoints = p[0].totalPoints;
  for (let i = 0; i < p.length; i++) {
    if (p[i].totalPoints !== prevPoints) {
      rollingPlacement = i + 1;
    }
    p[i].placement = rollingPlacement;
  }
  return p;
}
