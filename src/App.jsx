import { useState } from 'react';
import './App.css';

function App() {
    const [drag, setDrag] = useState(false);


    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e) => {
        console.log(drag);
        e.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (e) => {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('file', files[0])
        // And somthing to post it on server like axios.post('url', formData)

        setDrag(false);
    }

    return (
        <div className="App">
            {drag ?
                <div
                    className='area dropArea'
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    Drop files to load them
                </div>
                : <div
                    className='area'
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    Drag files to load them
                </div>
            }
        </div>
    );
}

export default App;
