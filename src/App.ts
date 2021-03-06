import '@/styles/index.scss';
import generateLottoNumbers from './utils/generateLottoTicket';
import { LottoStage } from '@/types/lotto';
import { BaseComponent } from './core/Component';
import { WinningNumbersInput } from './components/WinningNumbersInput';
import { LottoTicketDisplay } from './components/LottoTicketDisplay';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { WinningResultDisplay } from './components/WinningResultDisplay';
import { RANK_FOR_MATCHED_COUNT, PRICE_FOR_RANK, LOTTO, RANK } from './constants/lotto';

interface Props {}

interface State {
  lottoStage: LottoStage;
  purchaseAmount: number;
  purchaseMode: string;
  lottoTickets: Array<number[]>;
  isToggleClicked: boolean;
  winningLottoNumber: number[];
  winningResult: Record<number, number>;
  winningYield: number;
}

const initialState: State = {
  lottoStage: 'BEFORE_PURCHASED',
  purchaseAmount: 0,
  purchaseMode: 'auto',
  lottoTickets: [],
  isToggleClicked: false,
  winningLottoNumber: [],
  winningResult: {},
  winningYield: 0,
};

export default class App extends BaseComponent<HTMLElement, Props, State> {
  setup() {
    this.state = initialState;
  }

  componentDidMount() {
    const {
      isPurchased,
      setTickets,
      setIsToggleClicked,
      setLottoResult,
      hasWinningResult,
      reSetLottoApp,
    } = this;
    const { lottoTickets, isToggleClicked, winningResult, lottoStage, winningYield } = this.state;

    new PurchaseAmountForm({
      setTickets: setTickets.bind(this),
    });

    new LottoTicketDisplay({
      isPurchased,
      lottoTickets,
      isToggleClicked,
      setIsToggleClicked: setIsToggleClicked.bind(this),
    });

    new WinningNumbersInput({
      isPurchased,
      lottoTickets,
      setLottoResult: setLottoResult.bind(this),
    });

    new WinningResultDisplay({
      lottoStage,
      winningResult,
      hasWinningResult,
      winningYield,
      reSetLottoApp: reSetLottoApp.bind(this),
    });
  }

  setTickets(ticketCount: number) {
    this.setState({
      ...this.state,
      purchaseAmount: ticketCount,
      lottoStage: 'TICKET_ISSUE_COMPLETED',
      lottoTickets: Array.from({ length: ticketCount }, generateLottoNumbers)! as number[][],
    });
  }

  setIsToggleClicked() {
    const { isToggleClicked } = this.state;

    this.setState({
      ...this.state,
      lottoStage: 'TOGGLE_CHANGED',
      isToggleClicked: !isToggleClicked,
    });
  }

  setLottoResult(winningLottoNumberParameter: number[], bonusNumber: number) {
    const { lottoTickets, purchaseAmount } = this.state;

    let winningYield: number = 0;
    const winningResult: Record<number, number> = {};
    const winningLottoNumber = [...winningLottoNumberParameter, bonusNumber];

    lottoTickets.forEach(lottoTicket => {
      const matchedNumbers = winningLottoNumber.filter((number, idx) => {
        if (lottoTicket[idx] === number) return true;
      }).length;

      let ranking = RANK_FOR_MATCHED_COUNT[matchedNumbers];

      ranking = ranking === RANK.THIRD && lottoTicket.includes(bonusNumber) ? RANK.SECOND : ranking;

      if (ranking !== undefined) {
        winningResult[ranking] ? (winningResult[ranking] += 1) : (winningResult[ranking] = 1);
      } else {
        winningResult[0] ? (winningResult[0] += 1) : (winningResult[0] = 1);
      }
    });

    Object.entries(winningResult).forEach(value => {
      const price = PRICE_FOR_RANK[value[0]];

      if (price) {
        winningYield += price * value[1];
      }
    });

    winningYield = Math.floor((winningYield / (LOTTO.SALE_UNIT * purchaseAmount)) * 100);

    this.setState({
      ...this.state,
      winningYield,
      winningResult,
      winningLottoNumber,
      lottoStage: 'WINNING_NUMBER_SUBMITED',
    });
  }

  reSetLottoApp() {
    this.setState(initialState);
  }

  get isPurchased() {
    return this.state.lottoTickets.length > 0;
  }

  get hasWinningResult() {
    return Object.entries(this.state.winningResult).length > 0;
  }
}
