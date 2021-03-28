import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Dot = styled.div`
  background-color: var(--red);
  color: #fff;
  border-radius: 50%;
  padding: 1rem;
  margin-left: 10px;
  min-width: 2rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: 'tabular-nums';
`;

const AnimationStyles = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

export default CartCount;
