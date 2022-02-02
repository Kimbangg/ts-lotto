import { WinningNumbersInput } from './components/WinningNumbersInput';
import '@/styles/index.scss';
import { LottoTicketDisplay } from './components/LottoTicketDisplay';
import { PurchaseAmountForm } from './components/PurchaseAmoutForm';
import { BaseComponent } from './core/Component';
import generateLottoNumbers from './utils/generateLottoTicket';
import { WinningResultDisplay } from './components/WinningResultDisplay';
import { RANK_FOR_MATCHED_COUNT } from './constants/lotto';
import { LottoStage } from '@/types/lotto';

interface Props {}

interface State {
  lottoStage: LottoStage;
  purchaseAmount: number;
  purchaseMode: string;
  lottoTickets: Array<number[]>;
  isToggleClicked: boolean;
  winningLottoNumber: number[];
  winningResult: Record<number, number>;
}

export default class App extends BaseComponent<HTMLElement, Props, State> {
  setup() {
    this.state = {
      lottoStage: 'BEFORE_PURCHASED',
      purchaseAmount: 0,
      purchaseMode: 'auto',
      lottoTickets: [],
      isToggleClicked: false,
      winningLottoNumber: [],
      winningResult: {},
    };
  }

  componentDidMount() {
    const { isPurchased, setTickets, setIsToggleClicked, setLottoResult, hasWinningResult } = this;
    const { lottoTickets, isToggleClicked, winningResult, lottoStage } = this.state;

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
      lottoStage,
      winningResult,
      hasWinningResult,
    });
  }

  setTickets(ticketCount: number) {
    this.setState({
      ...this.state,
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

  setLottoResult(winningLottoNumber: number[], bonusNumber: number) {
    const { lottoTickets } = this.state;
    const winningResult: Record<number, number> = {};
    const winningLottoNumber = [...winningLottoNumber, bonusNumber];

    lottoTickets.forEach(lottoTicket => {
      let ranking =
        RANK_FOR_MATCHED_COUNT[
          winningLottoNumber.filter(number => lottoTicket.includes(number)).length
        ];

      ranking = ranking === 3 && lottoTicket.includes(bonusNumber) ? 2 : ranking;

      if (ranking !== undefined) {
        winningResult[ranking] ? (winningResult[ranking] += 1) : (winningResult[ranking] = 1);
      } else {
        winningResult[0] ? (winningResult[0] += 1) : (winningResult[0] = 1);
      }
    });

    this.setState({
      ...this.state,
      winningResult,
      winningLottoNumber,
      lottoStage: 'WINNING_NUMBER_SUBMITED',
    });
  }

  get isPurchased() {
    return this.state.lottoTickets.length > 0;
  }

  get hasWinningResult() {
    return Object.entries(this.state.winningResult).length > 0;
  }
}
