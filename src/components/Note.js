import React, { Component } from 'react';
import firebase from '../firebase';
import Comments from './Comments';
import ComForm from './ComForm';
import Editable from './Editable';

class Note extends Component {

  removeNote(noteId) {
    const noteRef = firebase.database().ref('/notes/' + noteId);
    noteRef.remove();
  }

  render() {
    return (
      <div className='display-note'>
        <div className='wrapper'>
          <ul>
            {this.props.notes.map((note) => {
              return (
                <li key={note.id}>
                  <button onClick={() => this.removeNote(note.id)}>&times;</button>
                  <Editable content={note.content} name={note.name} id={note.id}/>
                  <p><a href={note.fileURL}>{note.file}</a></p>
                  <div>
                    <ul>
                      <Comments
                        id={note.id}
                      />
                    </ul>
                  </div>
                  <div className="comment-form">
                    <ComForm id={note.id} />
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
