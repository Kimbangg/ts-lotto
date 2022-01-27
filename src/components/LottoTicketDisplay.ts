import { BaseComponent } from '@/core/Component';
import { $, hide, show } from '@/utils/DOM';

interface Props {
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
}

export class LottoTicketDisplay extends BaseComponent<HTMLElement, Props> {
  $purchasedLottoSection: HTMLElement;
  $purchasedLottoLabel: HTMLLabelElement;
  $purchasedLottoDisplay: HTMLDivElement;

  selectDom() {
    this.$purchasedLottoSection = $('#purchased-lotto-section')! as HTMLElement;
    this.$purchasedLottoLabel = $('#purchased-lotto-section__label')! as HTMLLabelElement;
    this.$purchasedLottoDisplay = $('#purchased-lotto-section__display')! as HTMLDivElement;
  }

  setEvent() {
    // toggle을 눌렀을 때 반응하는 이벤트를 등록
  }

  get lottoTicketIconTemplate() {
    return `<span class="purchase-result-section__lotto-icon mx-1 text-4xl">
              🎟️
            </span>`;
  }

  render() {
    const { isPurchased, lottoTickets } = this.props;
    const amoutOfTickets = lottoTickets.length;

    if (!isPurchased) {
      hide(this.$purchasedLottoSection);
    } else {
      show(this.$purchasedLottoSection);
    }

    // lottoTicket의 길이만큼 스티커 템플릿을 생성 => 토클이 눌리면 번호와 함께 제공하는 방식으로 변경

    this.$purchasedLottoLabel.textContent = `총 ${amoutOfTickets}개를 구매하였습니다.`;

    this.$purchasedLottoDisplay.innerHTML = this.lottoTicketIconTemplate.repeat(amoutOfTickets);
  }
}
