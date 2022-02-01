import { $, open, close } from './../utils/DOM';
import { BaseComponent } from '@/core/Component';
import { NAME_FOR_LOTTO_RANK } from '@/constants/lotto';

interface Props {
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

  updateResultModalView() {
    const { winningResult } = this.props;

    Object.entries(winningResult).forEach(result => {
      const eleName = NAME_FOR_LOTTO_RANK[result[0]];
      const $elem = $(eleName)! as HTMLTableElement;

      $elem.textContent = `${result[1]}개`;
    });
  }

  render() {
    const { $resultDisplayModal } = this;
    const { hasWinningResult } = this.props;

    this.updateResultModalView();
    hasWinningResult ? open($resultDisplayModal) : close($resultDisplayModal);
  }
}
