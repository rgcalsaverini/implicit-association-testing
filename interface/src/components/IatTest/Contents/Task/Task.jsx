import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from 'app_constants';
import CircularProgress from 'material-ui/CircularProgress';
import { ItemImage, Anchor, Item, MistakeContainer, Container } from './styles';
import MistakeIcon from './MistakeIcon';
import Instructions from './Instructions';
import ItemsTable from './ItemsTable';

class Task extends Component {
  static propTypes = {
    hideSide: PropTypes.string,
    itemNumber: PropTypes.number.isRequired,
    taskNumber: PropTypes.number.isRequired,
    pendingReq: PropTypes.bool.isRequired,
    mistake: PropTypes.bool.isRequired,
    showInstructions: PropTypes.bool.isRequired,
    categorizeItem: PropTypes.func.isRequired,
    startTask: PropTypes.func.isRequired,
    small: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        templateId: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    match: { params: { templateId: null } },
    hideSide: null,
    small: false,
  };

  state = {
    showTable: true,
  };

  componentDidMount() {
    document.onkeydown = (evt) => {
      const keyEvent = evt || window.event;
      const keypress = keyEvent.key.toUpperCase();
      const transition = this.props.hideSide !== null;
      const instructions = this.props.showInstructions;

      if (!transition && !instructions && !this.state.showTable) {
        if (keypress === constants.leftKey || keypress === constants.rightKey) {
          const toLeft = keypress === constants.leftKey;
          this.props.categorizeItem(toLeft);
        }
      }
      if (instructions && !this.state.showTable && keypress === ' ') {
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
    const { getTest, pendingReq, error, testData, taskNumber } = this.props;
    const { showInstructions, small, mistake, startTask } = this.props;
    const templateId = this.props.match.params.templateId;

    if (error) {
      return <div> Error {JSON.stringify(error)}</div>;
    }

    if (!testData) {
      if (!pendingReq) {
        getTest(templateId, small);
      }

      return <CircularProgress size={80} thickness={5} />;
    }

    const task = testData.tasks[taskNumber];

    if (!task) {
      return <span />;
    }

    const items = task.items;
    let instructions;




    if (showInstructions) {
      instructions = (
        <Instructions
          taskNumber={taskNumber}
          task={task}
          small={small}
          onContinue={startTask}
        />
      );
    }

    return (
      <Container>
        <Anchor>
          {items.map(t => this.renderItem(t))}
          {instructions}
          <ItemsTable
            open={this.state.showTable}
            onClose={() => this.setState({ showTable: false })}
            groupItems={testData.group_items}
            prefix={testData.img_prefix}
          />
        </Anchor>
        <MistakeContainer show={mistake}>
          <MistakeIcon fill="#F00" height="100%" />
        </MistakeContainer>
      </Container>
    );
  }
}

export default Task;
