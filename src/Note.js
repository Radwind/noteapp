import React, { Component } from 'react';
import firebase from './firebase';
import Comments from './Comments';

class Note extends Component {
    constructor(props) {
        super(props);

        this.state ={
          comments: [],
          author: '',
          text: '',
          date: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    addComment(noteId) {
      const comRef = firebase.database().ref('/notes/' + noteId +'/comments');
      const com = {
        author: this.state.author,
        text: this.state.text,
        //date: this.state.date,
      }
      comRef.push(com);
    }


    removeNote(noteId) {
      const noteRef = firebase.database().ref('/notes/' + noteId);
      noteRef.remove();
    }
 
    componentDidMount() {
      const notesRef = firebase.database().ref('notes');
      notesRef.on('value', (snapshot) => {
        let notes = snapshot.val();
        let newState = [];
        for (let note in notes) {
          
          newState.push({
            comments: notes[note].comments,
          }); 
        }  
        this.setState({
          comments: newState
        });
  
      });
    }

    render () {
        return (
            <div className='display-note'>
            <div className='wrapper'>
              <ul>

                {this.props.notes.map((note) => {
                  return (
                    <li key={note.id}>
                      <button onClick={() => this.removeNote(note.id)}>&times;</button>
                      <h3>{note.name}</h3>
                      <p>{note.content}</p>
                      <p>{note.file}</p>
                      
                      <div>
                        Comments:
                        <ul>
                          <Comments comments={this.state.comments}
                                    
                          />
                        
                        </ul>
                      </div>
                      
                      <div>
                        <input type="text" name="author" onChange={this.handleChange} value={note.author}/>
                        <input type="text" name="text" onChange={this.handleChange} value={note.text}/>
                        <button onClick={()=> this.addComment(note.id)}>Click</button>
                      </div>
                    </li>
                  )
                })}

              </ul>
            </div>
          </div>
        )
    }
}

export default Note;
