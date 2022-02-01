import { $, open, close } from './../utils/DOM';
import { BaseComponent } from '@/core/Component';

interface Props {
  winningResult: Record<number, number>;
  hasWinningResult: boolean;
}

export class WinningResultDisplay extends BaseComponent<HTMLElement, Props> {
  $resultDisplayModal: HTMLDivElement;

  selectDom() {
    this.$resultDisplayModal = $('#result-display-modal')! as HTMLDivElement;
  }

  updateResultModalView() {}

  render() {
    const { hasWinningResult } = this.props;
    const { $resultDisplayModal } = this;

    this.updateResultModalView();
    hasWinningResult ? open($resultDisplayModal) : close($resultDisplayModal);
  }
}
