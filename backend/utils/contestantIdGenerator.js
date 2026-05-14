const counters = {
  Singing: 1000,
  Dancing: 1000,
  Acting: 1000,
  Modelling: 1000,
  Rapping: 1000
};

function generateContestantId(category) {

  const map = {
    Singing: "S",
    Dancing: "D",
    Acting: "A",
    Modelling: "M",
    Rapping: "R"
  };

  counters[category]++;

  return `${map[category]}${counters[category]}`;
}

module.exports = generateContestantId;