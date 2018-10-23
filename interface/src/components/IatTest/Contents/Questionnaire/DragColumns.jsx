import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragColumn, DragBoard, DragItem, DragItemOrder, DragColumnMiddle } from './styles';
import Arrow from './Arrow';

const reorder = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};

const cardinals = {
  0: 'st',
  1: 'nd',
  2: 'rd',
};

const unsortedListId = 'unsorted_list';
const sortedListId = 'sorted_list';

class DragColumns extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    formatter: PropTypes.func.isRequired,
    value: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      randomize: PropTypes.bool,
      mustAnswerAll: PropTypes.bool,
      canDragBack: PropTypes.bool,
    }).isRequired,
  }

  static defaultProps = {
    value: undefined,
  }

  state = {
    unsorted: this.props.data.options,
    wrongList: false,
  }

  handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === sortedListId) {
        const items = [...(this.props.value || [])];
        reorder(items, source.index, destination.index);
        const done = this.props.data.mustAnswerAll ? (this.state.unsorted.length === 0) : undefined;
        this.props.onChange(items, done);
      } else {
        this.setState({ wrongList: true });
      }
    } else if (source.droppableId === unsortedListId && destination.droppableId === sortedListId) {
      const sorted = [...(this.props.value || [])];
      const unsorted = [...this.state.unsorted];
      sorted.splice(destination.index, 0, unsorted[source.index]);
      unsorted.splice(source.index, 1);
      this.setState({ unsorted });
      const done = this.props.data.mustAnswerAll ? (unsorted.length === 0) : undefined;
      this.props.onChange(sorted, done);
    } else if (this.props.data.canDragBack) {
      const sorted = [...(this.props.value || [])];
      const unsorted = [...this.state.unsorted];
      unsorted.splice(destination.index, 0, sorted[source.index]);
      sorted.splice(source.index, 1);
      this.setState({ unsorted });
      const done = this.props.data.mustAnswerAll ? (unsorted.length === 0) : undefined;
      this.props.onChange(sorted, done);
    } else {
      this.setState({ wrongList: true });
    }
  }

  render() {
    const { value, formatter } = this.props;

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <DragBoard>
          <Droppable droppableId={unsortedListId}>
            {(provided, snapshot) => (
              <DragColumn active={snapshot.isDraggingOver} innerRef={provided.innerRef}>
                {this.state.unsorted.map((option, index) => (
                  <Draggable key={option} draggableId={option} index={index}>
                    {(innerProvided, innerSnapshot) => (
                      <DragItem
                        innerRef={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                        dragging={innerSnapshot.isDragging}
                      >
                        { formatter(option) }
                      </DragItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DragColumn>
            )}
          </Droppable>

          <DragColumnMiddle>
            <Arrow width={100} />
          </DragColumnMiddle>

          <Droppable droppableId={sortedListId}>
            {(provided, snapshot) => (
              <DragColumn active={snapshot.isDraggingOver} innerRef={provided.innerRef}>
                {(value || []).map((option, index) => (
                  <Draggable
                    key={`uns_${option}`}
                    draggableId={`uns_${option}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <DragItem
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DragItemOrder> {`${index + 1}${cardinals[index] || 'th'}`}</DragItemOrder>
                        {formatter(option)}
                      </DragItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DragColumn>
            )}
          </Droppable>
        </DragBoard>
        <Snackbar
          open={this.state.wrongList}
          message="Sort items by dragging them from the left to the right"
          autoHideDuration={5000}
          onRequestClose={() => this.setState({ wrongList: false })}
        />
      </DragDropContext>
    );
  }
}

export default DragColumns;
