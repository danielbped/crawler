const CPF_REGEX = />(\d{3}\.?){3}-\d{2}/gm;

const CANDIDATE_REGEX = /<html>(\s.+\s)*<\/html>/gm;

const NAME_REGEX = /Name:<\/b>.*</gmi;

const SCORE_REGEX = /Score:<\/b>\s\d{2}\.\d{1,2}/gm;

module.exports = {
  CPF_REGEX,
  CANDIDATE_REGEX,
  NAME_REGEX,
  SCORE_REGEX,
}