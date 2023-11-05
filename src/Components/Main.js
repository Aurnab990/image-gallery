import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../Components/Main.css';

const Main = () => {
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(0);

  const uploadImage = () => {
    console.log(image);
    setImages([...images, image]);
    console.log(images);
  }

  const handleCheckboxChange = () => {
    const checkedCheckboxes = document.querySelectorAll('.image-checkbox:checked');
    setSelectedFiles(checkedCheckboxes.length);
  }

  const deleteSelectedImages = () => {
    const checkedCheckboxes = document.querySelectorAll('.image-checkbox:checked');
    const indexesToDelete = Array.from(checkedCheckboxes).map((checkbox) => parseInt(checkbox.getAttribute('data-index')));

    const updatedImages = images.filter((image, index) => !indexesToDelete.includes(index));
    setImages(updatedImages);

    setSelectedFiles(0); // Reset the selected files count
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = [...images];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedImages);
  }

  return (
    <div>
      {/* This is the top bar for counting delete and selected files */}
      <div className='top-bar'>
        <span>
          <input
            type='checkbox'
            onChange={handleCheckboxChange}
          ></input>
          <p>{selectedFiles} files Selected</p>
        </span>
        <button className='delete-button' onClick={deleteSelectedImages}>
          Delete Files
        </button>
      </div>

      {/* This section for upload an image and display the image. */}
      <div>
        <input type='file' onChange={(e) => setImage(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload Image</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-list">
          {(provided) => (
            <div ref={provided.innerRef} className='img-container'>
              {images.map((newImg, index) => 
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='image-container'
                    >
                      <input
                        type='checkbox'
                        className='image-checkbox'
                        data-index={index} // Store the image index as a data attribute
                        onChange={handleCheckboxChange}
                      ></input>
                      <img src={URL.createObjectURL(newImg)} alt={`Image ${index}`} />
                    </div>
                  )}
                </Draggable>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Main;
