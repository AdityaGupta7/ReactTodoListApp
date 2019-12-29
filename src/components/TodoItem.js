import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    //dynamic styling
    getStyle = () => {
        return {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: (this.props.todo.complete === true) ? 'line-through' : 'none'
        };
    }

    render() {
        const { id, title } = this.props.todo;

        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
                    { title }
                    <button style={btnStyle} onClick={this.props.delTodo.bind(this, id)}>x</button>
                </p>
                
            </div>
        );
    }
}

//PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired,
    markComplete: PropTypes.func.isRequired
}

//button styling
const btnStyle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: '5px 9px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem
