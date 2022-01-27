import { WinningNumbersInput } from './components/WinningNumbersInput';
import '@/styles/index.scss';
import { LottoTicketDisplay } from './components/LottoTicketDisplay';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { BaseComponent } from './core/Component';
import generateLottoNumbers from './utils/generateLottoTicket';

interface Props {}

interface State {
  purchaseAmount: number;
  purchaseMode: string;
  lottoTickets: Array<Number[]>;
  isToggleClicked: boolean;
}

export default class App extends BaseComponent<HTMLElement, Props, State> {
  setup() {
    this.state = {
      purchaseAmount: 0,
      purchaseMode: 'auto',
      lottoTickets: [],
      isToggleClicked: false,
    };
  }

  componentDidMount() {
    const { isPurchased, setTickets, setIsToggleClicked } = this;
    const { lottoTickets, isToggleClicked } = this.state;

    new PurchaseAmountForm({
      setTickets: setTickets.bind(this),
    });

    new LottoTicketDisplay({
      isPurchased: isPurchased,
      lottoTickets: lottoTickets,
      isToggleClicked: isToggleClicked,
      setIsToggleClicked: setIsToggleClicked.bind(this),
    });

    new WinningNumbersInput({
      isPurchased: isPurchased,
      lottoTickets: lottoTickets,
    });
  }

  setTickets(ticketCount: number) {
    this.setState({
      ...this.state,
      lottoTickets: Array.from({ length: ticketCount }, generateLottoNumbers)! as Number[][],
    });
  }

  setIsToggleClicked() {
    const { isToggleClicked } = this.state;

    this.setState({
      ...this.state,
      isToggleClicked: !isToggleClicked,
    });
  }

  get isPurchased() {
    return this.state.lottoTickets.length > 0;
  }
}
