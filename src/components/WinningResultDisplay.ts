import { $, open, close } from './../utils/DOM';
import { BaseComponent } from '@/core/Component';
import { NAME_FOR_LOTTO_RANK } from '@/constants/lotto';
import { LottoStage } from '@/types/lotto';

interface Props {
  lottoStage: LottoStage;
  winningResult: Record<number, number>;
  hasWinningResult: boolean;
}

export class WinningResultDisplay extends BaseComponent<HTMLElement, Props> {
  $modalClose: HTMLDivElement;
  $resultDisplayModal: HTMLDivElement;

  selectDom() {
    this.$modalClose = $('.modal-close')! as HTMLDivElement;
    this.$resultDisplayModal = $('#result-display-modal')! as HTMLDivElement;
  }

  setEvent() {
    const { $modalClose, $resultDisplayModal } = this;

    $modalClose.onclick = () => {
      close($resultDisplayModal);
    };
  }

  clearResultModalView() {
    const length = Object.entries(NAME_FOR_LOTTO_RANK).length;

    for (let i = 1; i <= length; i++) {
      const eleName = NAME_FOR_LOTTO_RANK[String(i)];

      const $elem = $(eleName)! as HTMLTableElement;

      $elem.textContent = '0개';
    }
  }

  updateResultModalView() {
    this.clearResultModalView();

    const { winningResult } = this.props;

    const winningResultArr = Object.entries(winningResult);

    if (winningResultArr.length === 1 && winningResultArr[0][0] === '0') {
      return;
    }

    winningResultArr.forEach(result => {
      const eleName = NAME_FOR_LOTTO_RANK[result[0]];
      const $elem = $(eleName)! as HTMLTableElement;

      $elem.textContent = `${result[1]}개`;
    });
  }

  render() {
    const { $resultDisplayModal } = this;
    const { lottoStage, hasWinningResult } = this.props;

    this.updateResultModalView();

    hasWinningResult && lottoStage === 'WINNING_NUMBER_SUBMITED'
      ? open($resultDisplayModal)
      : close($resultDisplayModal);
  }
}
