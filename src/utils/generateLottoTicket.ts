import { LOTTO } from '@/constants/lotto';

const getRandomNumber = () => {
  // MIN과 MAX 사이의 난수를 생성한다.
  return Math.floor(Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER + 1) + LOTTO.MIN_NUMBER);
};

const generateLottoNumbers = () => {
  const lottoNumber = new Set();

  while (lottoNumber.size < LOTTO.LENGTH) {
    lottoNumber.add(getRandomNumber());
  }

  return Array.from(lottoNumber);
};

export default generateLottoNumbers;
