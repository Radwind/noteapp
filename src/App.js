import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Note from './Note';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      file: '',
      notes: [],
    };
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
    const notesRef = firebase.database().ref('notes');
    const note = {
      name: this.state.name,
      content: this.state.content,
      //file: this.state.file,
    }
    notesRef.push(note);
    this.setState({
      name: '',
      content: '',
      //file: ''
    })
  }

  

  componentDidMount() {
    const notesRef = firebase.database().ref('notes');
    notesRef.on('value', (snapshot) => {
      let notes = snapshot.val();
      let newState = [];
      for (let note in notes) {
        newState.push({
          id: note,
          name: notes[note].name,
          content: notes[note].content,
          file: notes[note].file,
          //comments: notes[note].comments
          
        });
      }

      this.setState({
        notes: newState
      });

    });

  }

  render() {
    return (
      <div className='app'>

        <header>
          <div className='wrapper'>
            <h1>Note App</h1>
          </div>
        </header>

        <div className='container'>
          <div className='add-note'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="name" required placeholder="Enter note name" onChange={this.handleChange} value={this.state.name} />
              <textarea type="text" name="content" required placeholder="Enter note" onChange={this.handleChange} value={this.state.content} />
              <input type="file" name="file" value={this.state.file} />
              <button className="note-btn">Add Note</button>
            </form>
          </div>

          <Note 
            notes={this.state.notes}
          />

        </div>

      </div>
    );
  }
}
export default App;
