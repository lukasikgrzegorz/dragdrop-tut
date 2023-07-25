import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialState = [reactLogo, viteLogo, reactLogo, viteLogo];

function App() {
  const [brands, updateBrands] = useState(initialState);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(brands);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateBrands(items);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="brands">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="brands-container">
              {brands.map((brand, index) => {
                return (
                  <Draggable
                    key={`brand${index}`}
                    draggableId={`brand${index}`}
                    index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <img
                          src={brand}
                          className="logo"
                          alt={`Brand ${index}`}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
