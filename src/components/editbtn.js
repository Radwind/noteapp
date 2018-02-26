import React from 'react';

const EditBtn = (props) => {
    console.log(props);
    return(
        <button onClick={props.editNote}>Edit</button>
    )
}

export default EditBtn;