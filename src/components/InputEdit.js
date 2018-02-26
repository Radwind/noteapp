import React, { Component } from 'react';
import firebase from '../firebase';


class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            name: this.props.name
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
        e.preventDefault();
        const editRef = firebase.database().ref('/notes/' + this.props.id);
        const data = {
            content: this.state.content,
            name: this.state.name
        }
        editRef.update(data)
        //;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <p className="edit-header"><input type="text"  name="name" onChange={this.handleChange} value={this.state.name}/></p>
                    <p className="edit-block"><textarea type="text"  name="content" onChange={this.handleChange} value={this.state.content}/></p>
                    <button>Save</button>
            </form>
        )
    }


}

export default Input;
