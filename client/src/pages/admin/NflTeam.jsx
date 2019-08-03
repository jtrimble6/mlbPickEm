import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
// import './style.css';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: whitesmoke;
`;

export default class NflTeam extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.nflTeam.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            {this.props.nflTeam.name}
          </Container>
        )}
      </Draggable>
    );
  }
}