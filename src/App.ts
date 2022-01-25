import '@/styles/index.scss';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { BaseComponent } from './core/Component';
import { $ } from './utils/DOM';

export default class App extends BaseComponent<HTMLElement> {
  setup() {
    this.state = {
      purchaseAmount: 0,
      isPurchased: false,
      tickets: [],
    };
  }

  componentDidMount() {
    const purchaseForm = $('#purchase-amount-form')! as HTMLFormElement;

    new PurchaseAmountForm(purchaseForm);
  }
}
