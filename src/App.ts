import '@/styles/index.scss';
import { LottoTicketDisplay } from './components/LottoTicketDisplay';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { BaseComponent } from './core/Component';
import generateLottoNumbers from './utils/generateLottoTicket';

interface Props {}

interface State {
  purchaseAmount: number;
  purchaseMode: string;
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
}

export default class App extends BaseComponent<HTMLElement, Props, State> {
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
    const { lottoTickets } = this.state;

    new PurchaseAmountForm({
      setTickets: setTickets.bind(this),
    });

    new LottoTicketDisplay({});
  }

  setTickets(ticketCount: number) {
    this.setState({
      ...this.state,
      lottoTickets: Array.from({ length: ticketCount }, generateLottoNumbers)! as Number[][],
      isPurchased: true,
    });
  }
}
