import { checkSame } from '@/utils/json';

export interface Props {}
export interface State {}

export abstract class BaseComponent<T extends HTMLElement = HTMLElement, P = Props, S = State> {
  props: P;
  state: S;

  constructor(props?: P) {
    this.state = {} as S;
    this.props = props! as P;

    this.setup();
    this.selectDom();
    this.setEvent();
    this.initialState();
  }

  protected initialState() {
    this.render();
  }

  protected setup() {}

  protected selectDom() {}

  protected template() {
    return '';
  }

  protected componentDidMount() {}

  protected componentDidUpdate() {
    // useEffect [deps] 가 있는 것처럼 사용
    // 최초 렌더링 때 작동 X & 차이가 있을 때만 작동하도록 Method를 가공
  }

  protected render() {
    //   this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  protected setEvent() {}

  protected setState(newState: S) {
    // const nextState = { ...this.state, ...newState };

    // if (checkSame(this.state, nextState)) return;

    this.state = { ...this.state, ...newState };

    this.render();
  }

  addEvent($target: T, eventType: string, selector: string, cbFn: (event: any) => void) {
    const children = [...$target.querySelectorAll(selector)];

    const isTarget = (target: any) => children.includes(target) || target.closest(selector);

    $target.addEventListener(eventType, event => {
      event.preventDefault();
      if (!isTarget(event.target)) return false;
      cbFn(event);
    });
  }
}
