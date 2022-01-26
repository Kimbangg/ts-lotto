import { $, clearInputValue, disable } from '@/utils/DOM';
import { BaseComponent } from '@/core/Component';
import { PUCHASE_ALERT_MESSAGE, LOTTO } from '@/constants/lotto';

interface TicketProps {
  setTickets: (ticketCount: number) => void;
}

const isValidInput = (purchaseAmount: number) => {
  const { SALE_UNIT, MINIMUN_PRICE } = LOTTO;
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

export class PurchaseAmountForm extends BaseComponent<HTMLFormElement, TicketProps> {
  $purchaseInput: HTMLInputElement;
  $purchaseButton: HTMLButtonElement;
  $purchaseForm: HTMLFormElement;

  setEvent() {
    this.addEvent(this.$purchaseForm, 'submit', '#purchase-amount-form', event => {
      event.preventDefault();
      this.onSubmitPurchaseAmount();
    });
  }

  selectDom() {
    this.$purchaseForm = $('#purchase-amount-form')! as HTMLFormElement;
    this.$purchaseInput = $('#purchase-amount-input')! as HTMLInputElement;
    this.$purchaseButton = $('#purchase-amount-button')! as HTMLButtonElement;
  }

  requestValidInput(errorMessage: string) {
    alert(errorMessage);
    clearInputValue(this.$purchaseInput);
    this.$purchaseInput.focus();
  }

  deactivate() {
    disable(this.$purchaseInput);
    disable(this.$purchaseButton);
  }

  onSubmitPurchaseAmount() {
    const { setTickets } = this.props;
    const purchaseAmount = Number(this.$purchaseInput.value);

    const { isError, errorMessage } = isValidInput(purchaseAmount);

    if (isError) {
      this.requestValidInput(errorMessage);
    }

    // TODO : 잔돈이 있는 경우 =>  [ 잔돈 : 얼마, 구매한 티켓 수 : 몇 장 ] 을 보여주는 로직을 추가하자.

    const purchasedTicketCount = purchaseAmount / LOTTO.SALE_UNIT;

    setTickets(purchasedTicketCount);

    this.deactivate();
  }
}
