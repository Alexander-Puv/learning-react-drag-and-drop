import { useState } from 'react';
import './App.css';

function App() {
    const [boards, setBoards] = useState([
        {id: 1, title: 'Do', items: [{id: 1, title: 'Go shopping'}, {id: 2, title: 'Throw out the trash'}, {id: 3, title: 'Start doing somthing'}]},
        {id: 2, title: 'Doing', items: [{id: 4, title: 'IDK'}, {id: 5, title: "Make myself think I'm doing somthing useful"}, {id: 6, title: 'Do nothing'}]},
        {id: 3, title: 'Done', items: [{id: 7, title: 'Eat'}, {id: 8, title: 'Eat'}, {id: 9, title: 'Eat'}]},
    ])
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const dragStartHandler = (e, board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    const dragEndHandler = (e) => {
        e.target.style.borderColor = '#bdc1c6';
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        if (e.target.className === 'item') {
            e.target.style.borderColor = 'lightgreen';
        }
    }

    const dropHandler = (e, board, item) => {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }))
    }

    const dropCardHandler = (e, board) => {
        board.items.push(currentItem);
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }))
        e.target.style.borderColor = '#bdc1c6';
    }

    return (
        <div className="App">
            {boards.map(board =>
                <div
                    className="board"
                    onDragOver={e => dragOverHandler(e)}
                    onDrop={e => dropCardHandler(e, board)}
                    key={board.id}
                >
                    <div className="board__title">{board.title}</div>
                    {board.items.map(item =>
                        <div
                            className="item"
                            draggable
                            onDragStart={e => dragStartHandler(e, board, item)}
                            onDragLeave={e => dragEndHandler(e)}
                            onDragEnd={e => dragEndHandler(e)}
                            onDragOver={e => dragOverHandler(e)}
                            onDrop={e => dropHandler(e, board, item)}
                            key={item.id}
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
