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
            author: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        if(this.props.option === 'firebase') {
            e.preventDefault();
            const comRef = firebase.database().ref('/notes/' + this.props.id + '/comments');
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
        else {
            let rand = Date.now();
            const comment = {
                id: this.props.id + 'com' + rand,
                author: this.state.author,
                text: this.state.text,
                date: newDate()
            }
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (+key.slice(4, key.length) === this.props.id) {
                    let q = JSON.parse(localStorage.getItem(key));
                    q.comments.push(comment);
                    localStorage.setItem(key, JSON.stringify(q))
                }
            }
        }
    }

    render() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input type="text" className="cma" required name="author" onChange={this.handleChange} value={this.state.author} />
                <input type="text" className="cmt" required name="text" onChange={this.handleChange} value={this.state.text} />
                <button className="cms">Click</button>
            </form>
        )
    }
}

export default ComForm;