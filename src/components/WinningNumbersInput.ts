import { disable, enable } from './../utils/DOM';
import { LOTTO, WINNING_INPUT_ALERT_MESSAGE } from '@/constants/lotto';
import { BaseComponent } from '@/core/Component';
import { $, $$, hide, show } from '@/utils/DOM';

interface Props {
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
  setLottoResult: (winningLottoNumber: number[], bonusNumber: number) => void;
}

const isEmptyValue = (value: number | string) => value === '';
const isValidRange = (value: number | string) => {
  if (value && typeof value === 'number') {
    return LOTTO.MIN_NUMBER <= value && value <= LOTTO.MAX_NUMBER;
  }
};

const isValidInput = (winningNumberInput: Array<number | string>, bonusNumber: number | string) => {
  const totalWinningNumbers = [...winningNumberInput, bonusNumber];
  const { EMPTY_INPUT_NUMBER, OUT_OF_RANGE, DUPLICATED_NUMBER, VALID_WINNING_INPUT_NUMBER } =
    WINNING_INPUT_ALERT_MESSAGE;

  if (totalWinningNumbers.some(isEmptyValue)) {
    return {
      isError: true,
      errorMessage: EMPTY_INPUT_NUMBER,
    };
  }

  if (!totalWinningNumbers.every(isValidRange)) {
    return {
      isError: true,
      errorMessage: OUT_OF_RANGE,
    };
  }

  if (new Set(totalWinningNumbers).size !== totalWinningNumbers.length) {
    return {
      isError: true,
      errorMessage: DUPLICATED_NUMBER,
    };
  }

  return {
    isError: false,
    errorMessage: VALID_WINNING_INPUT_NUMBER,
  };
};

export class WinningNumbersInput extends BaseComponent<HTMLElement, Props> {
  $winningInputForm: HTMLFormElement;
  $bonusInput: HTMLInputElement;
  $winningInputs: NodeListOf<HTMLInputElement>;
  $winningSubmitButton: HTMLInputElement;
  $winningErrorMessage: HTMLParagraphElement;

  selectDom() {
    this.$winningInputForm = $('#winning-input-form')! as HTMLFormElement;
    this.$winningInputs = $$('.winning-number')! as NodeListOf<HTMLInputElement>;
    this.$bonusInput = $('.bonus-number')! as HTMLInputElement;
    this.$winningSubmitButton = $('#winning-input-form__submit')! as HTMLInputElement;
    this.$winningErrorMessage = $('.winning-input-form__error-message')! as HTMLParagraphElement;
  }

  requestValidInput(errorMessage: string) {
    alert(errorMessage);
  }

  onSubmitWinningNumbers() {
    const { setLottoResult } = this.props;

    const winningLottoNumber = Array.from(this.$winningInputs).map(winningNumber =>
      Number(winningNumber.value)
    );

    const bonusNumber = Number(this.$bonusInput.value);

    setLottoResult(winningLottoNumber, bonusNumber);
  }

  onMoveFocusToNextInput({ target }: { target: any }) {
    if (target.value.length > 1) {
      target.value = target.value.slice(0, 2);

      (target.nextElementSibling ? target.nextElementSibling : this.$bonusInput).focus();
    }
  }

  onKeyUpNumberInput(event: KeyboardEvent) {
    const { $winningInputs, $bonusInput, $winningErrorMessage, $winningSubmitButton } = this;
    this.onMoveFocusToNextInput(event);

    const winningNumbers = Array.from($winningInputs).map(input =>
      input.value === '' ? '' : Number(input.value)
    );

    const bonusNumber = $bonusInput.value === '' ? '' : Number(this.$bonusInput.value);

    const { isError, errorMessage } = isValidInput(winningNumbers, bonusNumber);

    if (isError) {
      $winningErrorMessage.style.color = 'red';
      disable($winningSubmitButton);
    } else {
      $winningErrorMessage.style.color = 'green';
      enable($winningSubmitButton);
    }

    $winningErrorMessage.textContent = errorMessage;
  }

  setEvent() {
    const { $winningInputs, $bonusInput, $winningSubmitButton } = this;

    $winningInputs.forEach($input => {
      $input.onkeyup = event => {
        this.onKeyUpNumberInput(event);
      };
    });

    $bonusInput.onkeyup = event => {
      this.onKeyUpNumberInput(event);
    };

    $winningSubmitButton.onclick = event => {
      event.preventDefault();
      this.onSubmitWinningNumbers();
    };
  }

  render() {
    const { isPurchased } = this.props;
    isPurchased === false ? hide(this.$winningInputForm) : show(this.$winningInputForm);
  }
}
