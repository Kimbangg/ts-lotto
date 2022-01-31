import { WinningNumbersInput } from './components/WinningNumbersInput';
import '@/styles/index.scss';
import { LottoTicketDisplay } from './components/LottoTicketDisplay';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { BaseComponent } from './core/Component';
import generateLottoNumbers from './utils/generateLottoTicket';
import { WinningResultDisplay } from './components/WinningResultDisplay';

interface Props {}

interface State {
  purchaseAmount: number;
  purchaseMode: string;
  lottoTickets: Array<number[]>;
  isToggleClicked: boolean;
  winningResult: number[]; // 보너스가 있는 경우를 어떻게 구분하면 좋을지가 고민이네
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
    const { isPurchased, setTickets, setIsToggleClicked, setLottoResult, hasWinningResult } = this;
    const { lottoTickets, isToggleClicked, winningResult } = this.state;

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

    new WinningResultDisplay({
      winningResult,
      hasWinningResult,
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
    const { lottoTickets } = this.state;
    const winningResult: number[] = [];

    lottoTickets.forEach(lottoTicket => {
      let matchedLottoCount = this.countMatchedNumber(lottoTicket, winningLottoNumber);

      if (matchedLottoCount === 5) {
        this.isAddedBonusNumber(lottoTicket, bonusNumber)
          ? (matchedLottoCount = 7)
          : matchedLottoCount;
      }

      winningResult.push(matchedLottoCount);
    });

    this.setState({
      ...this.state,
      winningResult,
    });
  }

  countMatchedNumber(lottoTicket: number[], winningNumber: number[]): number {
    let matchedLottoCount = 0;

    lottoTicket.forEach((number, idx) => {
      if (number === winningNumber[idx]) matchedLottoCount += 1;
    });

    return matchedLottoCount;
  }

  isAddedBonusNumber(lottoTicket: number[], bonusNumber: number) {
    if (lottoTicket.includes(bonusNumber)) {
      return false;
    }

    return true;
  }

  get isPurchased() {
    return this.state.lottoTickets.length > 0;
  }

  get hasWinningResult() {
    return this.state.winningResult.length > 0;
  }
}
