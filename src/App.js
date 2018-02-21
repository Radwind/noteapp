import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      content: '',
      notes: []
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
      content: this.state.content
    }
    notesRef.push(note);
  }

  removeNote(noteId) {
    const noteRef = firebase.database().ref(`/notes/${noteId}`);
    noteRef.remove();
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
          content: notes[note].content
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
                <input type="text" name="name" required placeholder="Enter note name" onChange={this.handleChange} value={this.state.name}/>
                <textarea type="text" name="content" required placeholder="Enter note" onChange={this.handleChange} value={this.state.content}/>
                <button className="note-btn">Add Note</button>
              </form>
          </div>

          <div className='display-note'>
            <div className='wrapper'>
              <ul>
                {this.state.notes.map((note) => {
                  return (
                    <li key={note.id}>
                    <button onClick={() => this.removeNote(note.id)}>&times;</button>
                    <h3>{note.name}</h3>
                    <p>{note.content}</p>
                    
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
export default App;
