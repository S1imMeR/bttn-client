import { Button, Icon } from '@blueprintjs/core';
import React, { Component, CSSProperties } from 'react';
import { mergeStyles } from '../../utils/style';
import FooterContainer from '../Footer/container';
import Neutral from '../Neutral';
// import PreviousWinners from '../PreviousWinners';
import Winner from '../Winner';
import WinnersToday from '../WinnersToday';

const style = require('./style.css');

export interface IHallOfFameProps {
  eventId: string;
  isConnected: boolean;
  lastWinner: {
    cashRegister: number;
    eventId: string;
  };
  winnersCountToday: number;
  onShowOptionsModal: () => void;
  onConnectToSocket: () => void;
}

export interface IHallOfFameState {
  isWinnerVisible: boolean;
  isWinnersTodayVisible: boolean;
}

const WINNER_HERO_TIMEOUT = 7 * 1000;
const PROMO_ROTATION_INTERVAL = 3 * 1000;

class HallOfFame extends Component<IHallOfFameProps, IHallOfFameState> {
  private promoRotationTimer: NodeJS.Timer;
  public constructor(props: IHallOfFameProps) {
    super(props);

    this.state = {
      isWinnerVisible: false,
      isWinnersTodayVisible: false,
    };
  }

  public render() {
    const { isConnected, lastWinner } = this.props;
    const { isWinnerVisible } = this.state;

    return (
      <div className={style.container}>
        {!isWinnerVisible && this.renderPromo()}
        {isWinnerVisible && <Winner cashRegister={lastWinner.cashRegister}/>}
        <div className={style.footer}>
          <FooterContainer/>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    const { /*onShowCashRegisterModal,*/ onConnectToSocket } = this.props;

    onConnectToSocket();

    this.promoRotationTimer = setInterval(() => {
      this.setState({ isWinnersTodayVisible: !this.state.isWinnersTodayVisible });
    }, PROMO_ROTATION_INTERVAL);
  }

  public componentWillReceiveProps(nextProps: IHallOfFameProps) {
    if (this.props.lastWinner.eventId !== nextProps.lastWinner.eventId) {
      this.setState({ isWinnerVisible: true }, () => {
        setTimeout(() => {
          this.setState({ isWinnerVisible: false });
        }, WINNER_HERO_TIMEOUT);
      });
    }
  }

  private renderPromo() {
    const { winnersCountToday } = this.props;
    const { isWinnersTodayVisible } = this.state;

    if (isWinnersTodayVisible) {
      return <WinnersToday count={winnersCountToday}/>;
    }

    return (
      <Neutral/>
    );
  }
}

export default HallOfFame;
