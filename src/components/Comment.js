import React, { Component } from 'react';

class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <li key={this.props.id}> {this.props.author}: {this.props.text} <em>{this.props.date}</em></li>
            </div>
        )
    }
}

export default Comment;