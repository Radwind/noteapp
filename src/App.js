import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import './App.css';
import firebase from './firebase';
import Note from './components/Note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      file: '',
      notes: [],
      option: 'firebase',
      fileURL: '',
      isUploading: false,
      fileSize: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
  }

  handleUploadStart = (filename) => {
    this.setState({ isUploading: true, fileSize: filename.size });
  }

  handleUploadSuccess = (filename) => {
    this.setState({ file: filename, isUploading: false });
    firebase.storage().ref('files').child(filename).getDownloadURL().then((url) => {
      if (this.state.fileSize < 5 * 1024 * 1024) {
        this.setState({ fileURL: url })
      }
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOptions(e) {
    this.setState({
      option: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.isUploading && this.state.fileSize < 5 * 1024 * 1024) {
      if (this.state.option === 'firebase') {
        const note = {
          name: this.state.name,
          content: this.state.content,
          fileURL: this.state.fileURL,
          file: this.state.file
        }
        const notesRef = firebase.database().ref('notes');
        notesRef.push(note);
        this.setState({
          name: '',
          content: '',
          fileURL: '',
          file: ''
        })
      }
      else {
        const note = {
          id: Date.now(),
          name: this.state.name,
          content: this.state.content,
          comments: []
        }
        let key = "note" + note.id;
        let item = JSON.stringify(note);
        localStorage.setItem(key, item);
        this.setState({
          name: '',
          content: '',
        })
      }
    }
    if (this.state.fileSize > 5 * 1024 * 1024) {
      alert('too big file')
    }
  }

  componentDidMount() {
    console.log(this.state.option)
    if (this.state.option === 'firebase') {
      const notesRef = firebase.database().ref('notes');
      notesRef.on('value', (snapshot) => {
        let notes = snapshot.val();
        let newState = [];
        for (let note in notes) {
          newState.push({
            id: note,
            name: notes[note].name,
            content: notes[note].content,
            fileURL: notes[note].fileURL,
            file: notes[note].file
          });
        }
        this.setState({
          notes: newState
        });
      });
    }
    // if (localStorage) {
    //   let newState = [];
    //   for (let i = 0; i < localStorage.length; i++) {
    //     let key = localStorage.key(i);
    //     if (key.substring(0, 4) === "note") {
    //       let item = localStorage.getItem(key);
    //       let noteItem = JSON.parse(item);
    //       newState.push(noteItem);
    //     }
    //   }
    //   this.setState({
    //     notes: newState
    //   });
    // }
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
              {this.state.option === 'firebase' ? <FileUploader
                name="file"
                filename={this.filename}
                storageRef={firebase.storage().ref('files')}
                onUploadStart={this.handleUploadStart}
                onUploadSuccess={this.handleUploadSuccess}
              /> : <p></p>}
              <div className="options">
                <input onChange={this.handleOptions} type="radio" name="options" value="firebase" checked={this.state.option === 'firebase'} />Firebase
                <input onChange={this.handleOptions} name="options" type="radio" value="local-storage" checked={this.state.option === 'local-storage'} />Local Storage
              </div>
              <button className="note-btn">Add Note</button>
            </form>
          </div>
          <Note
            notes={this.state.notes}
            option={this.state.option}
          />
        </div>
      </div>
    );
  }
}
export default App;
