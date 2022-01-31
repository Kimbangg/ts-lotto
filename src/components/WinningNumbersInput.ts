import { BaseComponent } from '@/core/Component';
import { $, $$, hide, show } from '@/utils/DOM';

interface Props {
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
  setLottoResult: (winningLottoNumber: Number[]) => void;
}

export class WinningNumbersInput extends BaseComponent<HTMLElement, Props> {
  $winningInputForm: HTMLFormElement;
  $winningInputs: NodeListOf<HTMLInputElement>;
  $winningSubmitButton: HTMLInputElement;

  selectDom() {
    this.$winningInputForm = $('#winning-input-form')! as HTMLFormElement;
    this.$winningInputs = $$('.winning-number')! as NodeListOf<HTMLInputElement>;
    this.$winningSubmitButton = $('#winning-input-form__submit')! as HTMLInputElement;
  }

  onSubmitWinningNumbers() {
    const { setLottoResult } = this.props;

    const winningLottoNumber = Array.from(this.$winningInputs).map(winningNumber =>
      Number(winningNumber.value)
    );

    setLottoResult(winningLottoNumber);
  }

  onKeyUpNumberInput() {}

  setEvent() {
    const { $winningInputs, $winningInputForm, $winningSubmitButton } = this;

    // TODO: Validation을 위한 keyup Event
    $winningInputForm.onkeyup = () => {
      this.onKeyUpNumberInput();
    };

    $winningInputForm.onsubmit = event => {
      event.preventDefault();
      this.onSubmitWinningNumbers();
    };
  }

  render() {
    const { isPurchased, lottoTickets } = this.props;
    isPurchased === false ? hide(this.$winningInputForm) : show(this.$winningInputForm);
  }
}
