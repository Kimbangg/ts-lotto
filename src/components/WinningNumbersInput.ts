import { BaseComponent } from '@/core/Component';
import { $, hide, show } from '@/utils/DOM';

interface Props {
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
}

export class WinningNumbersInput extends BaseComponent<HTMLElement, Props> {
  $winningInputForm: HTMLFormElement;
  selectDom() {
    this.$winningInputForm = $('#winning-input-form')! as HTMLFormElement;
  }

  setEvent() {
    // toggle을 눌렀을 때 반응하는 이벤트를 등록
  }

  render() {
    const { isPurchased, lottoTickets } = this.props;

    if (!isPurchased) {
      hide(this.$winningInputForm);
    } else {
      show(this.$winningInputForm);
    }
  }
}
