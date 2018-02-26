import React, { Component } from 'react';
import InputEdit from './InputEdit';

class Editable extends Component {
    constructor(props) {
        super(props);
        this.state = { isEdit: false }
    }

    editNote() {
        !this.state.isEdit ? this.setState({isEdit:true}) : this.setState({isEdit:false})
    }

    render() {
        return (
            <div>
                <label className="editor">Edit: <input type='checkbox' onChange={() => this.editNote()}/></label>
                {!this.state.isEdit ?  
                    <div>
                        <h3>{this.props.name}</h3><p>{this.props.content}</p>
                    </div> : 
                    <InputEdit id={this.props.id}
                        name={this.props.name}
                        content={this.props.content}
                    />}
            </div> 
        );
    }
}

export default Editable;
