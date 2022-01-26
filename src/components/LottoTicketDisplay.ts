import { BaseComponent } from '@/core/Component';
import { $, hide, show } from '@/utils/DOM';

interface Props {
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
}

export class LottoTicketDisplay extends BaseComponent<HTMLElement, Props> {
  $ticketDisplaySection: HTMLElement;
  $ticketCountLabel: HTMLLabelElement;
  $purchasedTickets: HTMLDivElement;

  selectDom() {
    this.$ticketDisplaySection = $('#ticket-display-section')! as HTMLElement;
    this.$ticketCountLabel = $('#ticket-count-label')! as HTMLLabelElement;
    this.$purchasedTickets = $('#purchased-tickets')! as HTMLDivElement;
  }

  setEvent() {
    // toggle을 눌렀을 때 반응하는 이벤트를 등록
  }

  render() {
    const { isPurchased, lottoTickets } = this.props;

    if (!isPurchased) {
      hide(this.$ticketDisplaySection);
    } else {
      show(this.$ticketDisplaySection);
    }

    // lottoTicket의 길이만큼 스티커 템플릿을 생성 => 토클이 눌리면 번호와 함께 제공하는 방식으로 변경

    this.$ticketCountLabel.textContent = `총 ${lottoTickets.length}개를 구매하였습니다.`;
  }
}
