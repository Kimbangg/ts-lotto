import { $, clearInputValue, disable } from '@/utils/DOM';
import { BaseComponent } from '@/core/Component';
import { PUCHASE_ALERT_MESSAGE, PURCAHSE_RULE } from '@/constants/lotto';

const isValidInput = (purchaseAmount: number) => {
  const { SALE_UNIT, MINIMUN_PRICE } = PURCAHSE_RULE;
  const { IS_INVALID_AMOUNT, IS_LOWER_THAN_MINIMUM_AMOUNT } = PUCHASE_ALERT_MESSAGE;

  if (purchaseAmount % SALE_UNIT) {
    return {
      isError: true,
      errorMessage: IS_INVALID_AMOUNT,
    };
  }

  if (purchaseAmount < MINIMUN_PRICE) {
    return {
      isError: true,
      errorMessage: IS_LOWER_THAN_MINIMUM_AMOUNT,
    };
  }

  return {
    isError: false,
    errorMessage: '',
  };
};

export class PurchaseAmountForm extends BaseComponent<HTMLFormElement> {
  setEvent() {
    this.addEvent('submit', '#purchase-amount-form', event => {
      event.preventDefault();
      this.onSubmitPurchaseAmount();
    });
  }

  requestValidInput($purchaseInput: HTMLInputElement, errorMessage: string) {
    alert(errorMessage);
    clearInputValue($purchaseInput);
    $purchaseInput.focus();
  }

  deactivate($purchaseAmountInput: HTMLInputElement, $purchaseAmountButton: HTMLButtonElement) {
    disable($purchaseAmountInput);
    disable($purchaseAmountButton);
  }

  onSubmitPurchaseAmount() {
    const $purchaseInput = $('#purchase-amount-input')! as HTMLInputElement;
    const $purchaseButton = $('#purchase-amount-button')! as HTMLButtonElement;

    const purchaseAmount = Number($purchaseInput.value);

    const { isError, errorMessage } = isValidInput(purchaseAmount);

    if (isError) {
      this.requestValidInput($purchaseInput, errorMessage);
    }

    this.setState({
      isPurchased: true,
      purchaseAmount: purchaseAmount / PURCAHSE_RULE.SALE_UNIT,
    });

    this.deactivate($purchaseInput, $purchaseButton);
  }
}
