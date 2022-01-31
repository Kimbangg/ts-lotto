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
  winningResult: Number[]; // 보너스가 있는 경우를 어떻게 구분하면 좋을지가 고민이네
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
      lottoTickets: Array.from({ length: ticketCount }, generateLottoNumbers)! as number[][],
    });
  }

  setIsToggleClicked() {
    const { isToggleClicked } = this.state;

    this.setState({
      ...this.state,
      isToggleClicked: !isToggleClicked,
    });
  }

  setLottoResult(winningLottoNumber: number[], bonusNumber: number) {
    // 새로 만들지 않더라도, 결과적으로 보너스넘버를 추가하여 돌리는 경우가 필요하다.
  }

  matchLottoNumber(lottoTicket: number[], winningNumber: number[]): number {
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
