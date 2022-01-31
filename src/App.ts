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
  winningResult: Number[];
}

export default class App extends BaseComponent<HTMLElement, Props, State> {
  setup() {
    this.state = {
      purchaseAmount: 0,
      purchaseMode: 'auto',
      lottoTickets: [],
      isToggleClicked: false,
      winningResult: [],
    };
  }

  componentDidMount() {
    const { isPurchased, setTickets, setIsToggleClicked, setLottoResult } = this;
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
      setLottoResult: setLottoResult.bind(this),
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

  setLottoResult(winningLottoNumber: Number[]) {
    const { lottoTickets } = this.state;
    const winningResult: Number[] = [];

    lottoTickets.forEach(lottoTicket => {
      const matchedLottoCount = this.matchLottoNumber(lottoTicket, winningLottoNumber);
      winningResult.push(matchedLottoCount);
    });

    this.setState({
      ...this.state,
      winningResult,
    });
  }

  matchLottoNumber(lottoTicket: Number[], winningNumber: Number[]): Number {
    let matchedLottoCount = 0;

    lottoTicket.forEach((number, idx) => {
      if (number === winningNumber[idx]) matchedLottoCount += 1;
    });

    return matchedLottoCount;
  }

  get isPurchased() {
    return this.state.lottoTickets.length > 0;
  }
}
