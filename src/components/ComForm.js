import React, { Component } from 'react';
import firebase from '../firebase';

function newDate() {
    let date = new Date();
    let newdate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return newdate;
}

class ComForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            author: '',
            id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getId(noteId) {
        this.setState({
            id: noteId
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const comRef = firebase.database().ref('/notes/' + this.state.id + '/comments');
        const com = {
            author: this.state.author,
            text: this.state.text,
            date: newDate()
        }
        comRef.push(com);
        this.setState({
            id: '',
            author: '',
            text: '',
        })
    }

    render() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input type="text" className="cma" required name="author" onChange={this.handleChange} value={this.state.author} />
                <input type="text" className="cmt" required name="text" onChange={this.handleChange} value={this.state.text} />
                <button className="cms" onClick={() => this.getId(this.props.id)}>Click</button>
            </form>
        )
    }
}

export default ComForm;