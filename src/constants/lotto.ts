export const LOTTO = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
  SALE_UNIT: 1000,
  MINIMUN_PRICE: 1000,
});

export const PUCHASE_ALERT_MESSAGE = {
  IS_INVALID_AMOUNT: `로또는 ${LOTTO.SALE_UNIT}원 단위로만 구매할 수 있습니다`,
  IS_LOWER_THAN_MINIMUM_AMOUNT: `값은 ${LOTTO.MINIMUN_PRICE} 이상 이어야 합니다.`,
};

export const WINNING_INPUT_ALERT_MESSAGE = {
  EMPTY_INPUT_NUMBER: '빈 입력 값이 존재 합니다.',
  OUT_OF_RANGE: '1 ~ 45 사이의 숫자만 가능합니다.',
  DUPLICATED_NUMBER: '중복된 숫자가 존재합니다.',
  VALID_WINNING_INPUT_NUMBER: '정상적으로 입력하셨습니다.',
};

export const RANK_FOR_MATCHED_COUNT: Record<number, number> = {
  6: 1,
  5: 3,
  4: 4,
  3: 5,
};

export const NAME_FOR_LOTTO_RANK: Record<string, string> = {
  '1': '#first-rank',
  '2': '#second-rank',
  '3': '#third-rank',
  '4': '#fourth-rank',
  '5': '#fifth-rank',
};
