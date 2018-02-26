import React, { Component } from 'react';
import Comment from './Comment';
import firebase from '../firebase';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        const comRef = firebase.database().ref('/notes/' + this.props.id + '/comments');
        comRef.on('value', snapshot => {
            let coms = snapshot.val();
            let newState = [];
            for (let com in coms) {
                newState.push({
                    id: com,
                    author: coms[com].author,
                    text: coms[com].text,
                    date: coms[com].date
                });
            }
            this.setState({
                comments: newState
            });
        })
    }

    render() {
        return (
            <div className="comment-list">
                <ul>
                    {
                        this.state.comments.map(com => {
                            return (
                                <Comment key={com.id} author={com.author} text={com.text} date={com.date} />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Comments;
