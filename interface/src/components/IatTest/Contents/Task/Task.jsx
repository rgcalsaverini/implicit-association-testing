import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from 'app_constants';
import { ItemImage, Anchor, Item, MistakeContainer, Container, Instructions, Accent, Section } from './styles';
import MistakeIcon from './MistakeIcon';

class Task extends Component {
  static propTypes = {
    hideSide: PropTypes.string,
    itemNumber: PropTypes.number.isRequired,
    taskNumber: PropTypes.number.isRequired,
    pendingReq: PropTypes.bool.isRequired,
    mistake: PropTypes.bool.isRequired,
    showInstructions: PropTypes.bool.isRequired,
    testStarted: PropTypes.bool.isRequired,
    startTest: PropTypes.func.isRequired,
    categorizeItem: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        templateId: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    match: { params: { templateId: null } },
    hideSide: null,
  };

  componentDidMount() {
    document.onkeydown = (evt) => {
      const keyEvent = evt || window.event;
      const keypress = keyEvent.key.toUpperCase();
      const transition = this.props.hideSide !== null;
      const instructions = this.props.showInstructions;

      if (!transition && !instructions) {
        if (keypress === constants.leftKey || keypress === constants.rightKey) {
          const toLeft = keypress === constants.leftKey;
          this.props.categorizeItem(toLeft);
        }
      }
      if (instructions && keypress === ' ') {
        this.props.startTask();
      }
    };
  }

  renderItem = (item) => {
    const hide = item.idx !== this.props.itemNumber;
    const hideTo = (item.idx === this.props.itemNumber) && this.props.hideSide;
    if (item.type === 'text') {
      return (
        <Item
          key={item.idx}
          hide={hide}
          hideTo={hideTo}
        >
          {item.value}
        </Item>
      );
    }
    return (
      <Item key={item.idx}>
        <ItemImage
          src={`${this.props.testData.img_prefix}${item.value}`}
          alt={item.value}
          hide={hide}
          hideTo={hideTo}
        />
      </Item>
    );
  };

  render() {
    const { pendingReq, error, testData, taskNumber, mistake } = this.props;
    const { showInstructions, startTest, testStarted } = this.props;
    const templateId = this.props.match.params.templateId;

    if (error) {
      return <div> Error {JSON.stringify(error)}</div>;
    }

    if (!testStarted || !testData) {
      if (!pendingReq) {
        startTest(templateId);
      }
      return <div> Waiting Test start </div>;
    }
    const task = testData.tasks[taskNumber];
    const items = task.items;
    const categText = task.left.length > 1 ? 'categories' : 'category';

    const instructions = (
      <Instructions>
        <Section long hide={taskNumber > 0}>
          Put a left finger on the key <Accent> &quot;{constants.leftKey}&quot;</Accent> and
          a right finger on the key <Accent>&quot;{constants.rightKey}&quot;</Accent>
        </Section>
        <Section hide={taskNumber > 0}>
          Items will appear on the middle of the screen.
        </Section>
        <Section>
          Press &quot;{constants.leftKey}&quot; if the item belongs to the {categText}
          <Accent> {task.left.join(' or ')} </Accent> or
        </Section>
        <Section>
          press &quot;{constants.rightKey}&quot; if it belongs to the {categText}
          <Accent> {task.right.join(' or ')} </Accent>
        </Section>
        <Section long>
          If you make a mistake, a red <Accent red> X </Accent> will appear,
          press the other key to continue.
        </Section>
        <Section long>
          Go <Accent> as fast as you can </Accent> while being accurate.
        </Section>
        <Section long>
          Press <Accent> spacebar </Accent> to continue.
        </Section>
      </Instructions>
    );

    return (
      <Container>
        <Anchor>
          {items.map(t => this.renderItem(t))}
          {showInstructions ? instructions : undefined}
        </Anchor>
        <MistakeContainer show={mistake}>
          <MistakeIcon fill="#F00" height="100%" />
        </MistakeContainer>
      </Container>
    );
  }
}

export default Task;
