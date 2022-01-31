import { $, open, close } from './../utils/DOM';
import { BaseComponent } from '@/core/Component';

interface Props {
  winningResult: number[];
  hasWinningResult: boolean;
}

export class WinningResultDisplay extends BaseComponent<HTMLElement, Props> {
  $resultDisplayModal: HTMLDivElement;

  selectDom() {
    this.$resultDisplayModal = $('#result-display-modal')! as HTMLDivElement;
  }

  // setResultDisplay() {
  //   const resultObj: any = {};
  //   const { winningResult } = this.props;

  //   winningResult.forEach(number => {
  //     resultObj[number] = resultObj[number] ? (resultObj[number] += 1) : (resultObj[number] = 0);
  //   });

  //   for (const key of resultObj) {
  //     const $elem = $('.')
  //   }
  // }

  render() {
    const { hasWinningResult } = this.props;
    const { $resultDisplayModal } = this;

    // this.setResultDisplay();
    hasWinningResult ? open($resultDisplayModal) : close($resultDisplayModal);
  }
}
