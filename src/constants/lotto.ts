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
