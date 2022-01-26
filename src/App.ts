import '@/styles/index.scss';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { BaseComponent } from './core/Component';
import { $ } from './utils/DOM';
import generateLottoNumbers from './utils/generateLottoTicket';

export default class App extends BaseComponent<HTMLElement> {
  setup() {
    this.state = {
      purchaseAmount: 0,
      purchaseMode: 'auto',
      isPurchased: false,
      lottoTickets: [],
    };
  }

  componentDidMount() {
    const { setTickets } = this;
    const purchaseForm = $('#purchase-amount-form')! as HTMLFormElement;

    new PurchaseAmountForm(purchaseForm, {
      setTickets: setTickets.bind(this),
    });
  }

  setTickets(ticketCount: number) {
    this.setState({
      lottoTickets: Array.from({ length: ticketCount }, generateLottoNumbers),
      isPurchased: true,
    });
  }
}
