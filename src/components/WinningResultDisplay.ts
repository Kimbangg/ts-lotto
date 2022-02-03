import { $, open, close } from './../utils/DOM';
import { BaseComponent } from '@/core/Component';
import { NAME_FOR_LOTTO_RANK } from '@/constants/lotto';
import { LottoStage } from '@/types/lotto';

interface Props {
  lottoStage: LottoStage;
  winningResult: Record<number, number>;
  hasWinningResult: boolean;
  winningYield: number;
}

export class WinningResultDisplay extends BaseComponent<HTMLElement, Props> {
  $modalClose: HTMLDivElement;
  $resultDisplayModal: HTMLDivElement;
  $winningYield: HTMLParagraphElement;

  selectDom() {
    this.$modalClose = $('.modal-close')! as HTMLDivElement;
    this.$resultDisplayModal = $('#result-display-modal')! as HTMLDivElement;
    this.$winningYield = $('#winningYield')! as HTMLParagraphElement;
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

    const { winningResult, winningYield } = this.props;

    Object.entries(winningResult).forEach(result => {
      const eleName = NAME_FOR_LOTTO_RANK[result[0]];

      if (eleName) {
        const $elem = $(eleName)! as HTMLTableElement;
        $elem.textContent = `${result[1]}개`;
      }
    });

    this.$winningYield.textContent = `당신의 총 수익률은 ${winningYield}% 입니다.`;
  }

  render() {
    const { $resultDisplayModal } = this;
    const { lottoStage, hasWinningResult } = this.props;

    hasWinningResult && lottoStage === 'WINNING_NUMBER_SUBMITED'
      ? open($resultDisplayModal)
      : close($resultDisplayModal);

    this.updateResultModalView();
  }
}
