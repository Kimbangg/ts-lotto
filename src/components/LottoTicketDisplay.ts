import { BaseComponent } from '@/core/Component';
import { $, $$, hide, show } from '@/utils/DOM';

type DisplayState = 'withNumber' | 'withoutNumber';

interface Props {
  isPurchased: boolean;
  lottoTickets: Array<Number[]>;
  isToggleClicked: boolean;
  setIsToggleClicked: () => void;
}

export class LottoTicketDisplay extends BaseComponent<HTMLElement, Props> {
  $purchasedLottoSection: HTMLElement;
  $purchasedLottoLabel: HTMLLabelElement;
  $purchasedLottoDisplay: HTMLDivElement;
  $purchasedLottoToggle: HTMLInputElement;

  selectDom() {
    this.$purchasedLottoSection = $('#purchased-lotto-section')! as HTMLElement;
    this.$purchasedLottoLabel = $('#purchased-lotto-section__label')! as HTMLLabelElement;
    this.$purchasedLottoDisplay = $('#purchased-lotto-section__display')! as HTMLDivElement;
    this.$purchasedLottoToggle = $('#purchased-lotto-section__toggle')! as HTMLInputElement;
  }

  setEvent() {
    const { setIsToggleClicked } = this.props;

    this.$purchasedLottoToggle.onchange = event => {
      event.stopPropagation();
      setIsToggleClicked();
    };
  }

  get lottoTicketIconTemplate() {
    return `<span id="purchase-result-section__lotto" class="mx-1 text-4xl">
              <span class="mx-1 text-4xl">🎟️</span>
            </span>`;
  }

  render() {
    const { isToggleClicked, isPurchased, lottoTickets } = this.props;
    const amoutOfTickets = lottoTickets.length;

    isPurchased === false ? hide(this.$purchasedLottoSection) : show(this.$purchasedLottoSection);

    this.$purchasedLottoLabel.textContent = `총 ${amoutOfTickets}개를 구매하였습니다.`;

    this.$purchasedLottoDisplay.innerHTML = this.lottoTicketIconTemplate.repeat(amoutOfTickets);

    isToggleClicked ? this.setLottoDisplay('withNumber') : this.setLottoDisplay('withoutNumber');
  }

  setLottoDisplay(displayState: DisplayState) {
    const { lottoTickets } = this.props;

    displayState === 'withNumber'
      ? this.$purchasedLottoDisplay.classList.add('flex-col')
      : this.$purchasedLottoDisplay.classList.remove('flex-col');

    const allLottoTickets = $$('#purchase-result-section__lotto');

    displayState === 'withNumber'
      ? allLottoTickets.forEach((ticket, idx) => {
          const span = document.createElement('span');
          span.id = 'purchase-result-section__lotto-number';
          span.textContent = lottoTickets[idx].join(',')!;

          ticket.appendChild(span);
        })
      : allLottoTickets.forEach(ticket => {
          const LottoNumberSpan = document.getElementById('purchase-result-section__lotto-number')!;

          if (LottoNumberSpan) {
            ticket.removeChild(LottoNumberSpan);
          }
        });
  }
}
