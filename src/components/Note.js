import React, { Component } from 'react';
import firebase from '../firebase';
import Comments from './Comments';
import ComForm from './ComForm';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

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
                  <h3>{note.name}</h3>
                  <p>{note.content}</p>
                  <p><a href={note.fileURL}>{note.file}</a></p>

                  <div>
                    <ul>
                      <Comments
                        comments={this.state.comments}
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