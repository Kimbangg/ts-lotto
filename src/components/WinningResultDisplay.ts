import { $, open, close, enable, clearInputValue, $$ } from './../utils/DOM';
import { BaseComponent } from '@/core/Component';
import { NAME_FOR_LOTTO_RANK } from '@/constants/lotto';
import { LottoStage } from '@/types/lotto';

interface Props {
  lottoStage: LottoStage;
  winningResult: Record<number, number>;
  hasWinningResult: boolean;
  winningYield: number;
  reSetLottoApp: () => void;
}

export class WinningResultDisplay extends BaseComponent<HTMLElement, Props> {
  $modalClose: HTMLDivElement;
  $resultDisplayModal: HTMLDivElement;
  $winningYield: HTMLParagraphElement;
  $resetButton: HTMLButtonElement;
  $purchaseInput: HTMLInputElement;
  $purchaseButton: HTMLButtonElement;
  $purchasedLottoToggle: HTMLInputElement;
  $winningInputs: NodeListOf<HTMLInputElement>;
  $bonusInput: HTMLInputElement;
  $winningErrorMessage: HTMLParagraphElement;

  selectDom() {
    this.$modalClose = $('.modal-close')! as HTMLDivElement;
    this.$resultDisplayModal = $('#result-display-modal')! as HTMLDivElement;
    this.$winningYield = $('#winningYield')! as HTMLParagraphElement;
    this.$resetButton = $('#reset-button')! as HTMLButtonElement;

    // PurchaseAmoutForm
    this.$purchaseInput = $('#purchase-amount-input')! as HTMLInputElement;
    this.$purchaseButton = $('#purchase-amount-button')! as HTMLButtonElement;

    // LottoTicketDisplay
    this.$purchasedLottoToggle = $('#purchased-lotto-section__toggle')! as HTMLInputElement;

    // WinningNumbersInput
    this.$winningInputs = $$('.winning-number')! as NodeListOf<HTMLInputElement>;
    this.$bonusInput = $('.bonus-number')! as HTMLInputElement;
    this.$winningErrorMessage = $('.winning-input-form__error-message')! as HTMLParagraphElement;
  }

  setEvent() {
    const { reSetLottoApp } = this.props;
    const { $modalClose, $resultDisplayModal, $resetButton } = this;

    $modalClose.onclick = () => {
      close($resultDisplayModal);
    };

    $resetButton.addEventListener('click', event => {
      event.stopImmediatePropagation();
      reSetLottoApp();
      this.clearPurchaseAmoutForm();
      this.clearLottoTicketDisplay();
      this.clearWinningNumbersInput();
      this.clearResultModalView();
    });
  }

  render() {
    const { $resultDisplayModal } = this;
    const { lottoStage, hasWinningResult } = this.props;

    hasWinningResult && lottoStage === 'WINNING_NUMBER_SUBMITED'
      ? open($resultDisplayModal)
      : close($resultDisplayModal);

    this.updateResultModalView();
  }

  clearPurchaseAmoutForm() {
    enable(this.$purchaseInput);
    enable(this.$purchaseButton);
    clearInputValue(this.$purchaseInput);
    this.$purchaseInput.focus();
  }

  clearLottoTicketDisplay() {
    this.$purchasedLottoToggle.checked = false;
  }

  clearWinningNumbersInput() {
    this.$winningInputs.forEach($input => {
      clearInputValue($input);
    });

    this.$winningErrorMessage.textContent = '';

    clearInputValue(this.$bonusInput);
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
}
