import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';


function DndPage() {
    const [columns, setColumns] = useState({
        todos: {
            name: 'To Do',
            items: [
                { id: '1', content: 'Проснуться' },
                { id: '2', content: 'Сдать лабы' },
                { id: '3', content: 'Поесть' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        done: {
            name: 'Done',
            items: [],
        },
        blocked: {
            name: 'Expired',
            items: [],
        },
    });

    const [newTask, setNewTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newTask.trim()) return;

        const newTaskItem = {
            id: Date.now().toString(),
            content: newTask,
        };

        setColumns((prevColumns) => ({
            ...prevColumns,
            todos: {
                ...prevColumns.todos,
                items: [...prevColumns.todos.items, newTaskItem],
            },
        }));

        setNewTask('');
    };

    const handleDeleteItem = (columnId, itemId) => {
        setColumns((prevColumns) => {
            const updatedColumn = {
                ...prevColumns[columnId],
                items: prevColumns[columnId].items.filter((item) => item.id !== itemId),
            };
            return {
                ...prevColumns,
                [columnId]: updatedColumn,
            };
        });
    };

    const navigate = useNavigate();
    const goToToDoList = () => {
        navigate('/');
      };

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '0 20px',
                            }}
                            key={columnId}
                        >
                            <h2>{column.name}</h2>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                padding: 4,
                                                width: 250,
                                                minHeight: 500,
                                                borderRadius: 20,
                                                
                                            }}
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    fontFamily: 'Comic Sans MS',
                                                                    userSelect: 'none',
                                                                    padding: 16,
                                                                    margin: '0 0 8px 0',
                                                                    minHeight: '50px',
                                                                    backgroundColor: snapshot.isDragging
                                                                    ? '#263B4A'
                                                                    : '#456C86',
                                                                    color: 'rgb(148, 239, 171)',
                                                                    ...provided.draggableProps.style,
                                                                    borderRadius: 20,
                                                                }}
                                                            >
                                                                {item.content}
                                                                <button onClick={() => handleDeleteItem(columnId, item.id)}
                                                                    style = {{
                                                                        marginLeft: '10px',
                                                                        align: 'left',
                                                                    }}
                                                                >
                                                                Удалить
                                                                </button>
                                                            </div>
                                                        );
                                                    }}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    );
                })}
            </DragDropContext>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit" style = {{marginTop : '70px',}}>Add</button>
            </form>
            <button onClick={goToToDoList}
                style = {{
                    marginTop: '430px',
                    height :'50px',
                }}
                >
                Go to ToDoList
            </button>
            </div>
        </div>
    );
}

export default DndPage;