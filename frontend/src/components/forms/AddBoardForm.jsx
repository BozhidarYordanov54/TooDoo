import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useWorkspaces } from "../../api/workspaceApi";

const images = ["/images/sunset.jpg", "/images/lavender.jpg", "/images/red.jpg", "/images/sky.jpg"]

export default function AddBoardForm({ workspaceName, setBoards }) {
    const [isLoading, setIsLoading] = useState(false);
    const { createBoard } = useWorkspaces();
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [boardImage, setBoardImage] = useState(images[0]);

    const addBoardHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const response = await createBoard(workspaceName, boardName, boardDescription, boardImage);

            if (response.status === 200) {
                const newBoard = {
                    name: response.data.model.name,
                    imageUrl: response.data.model.imageUrl,

                };
                setBoards((prevBoards) => [...prevBoards, newBoard]);
                handleFormClose();
            } else {
                console.error("Failed to create board:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating board:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const showFormHandler = () => {
        const formWrapper = document.querySelector('.form-wrapper.board-form');
        if (!formWrapper) {
            console.warn("Form wrapper not found");
            return;
        }

        formWrapper.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    const handleFormClose = () => {
        const formWrapper = document.querySelector('.form-wrapper.board-form');
        if (!formWrapper) {
            console.warn("Form wrapper not found");
            return;
        }

        formWrapper.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    const boardNameHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setBoardName(e.target.value);
    }

    const boardDescriptionHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setBoardDescription(e.target.value);
    }

    const boardImageHandler = (e) => {
        const selectedImage = e.target.value;
        setBoardImage(selectedImage);
        const imageOptions = document.querySelectorAll('.image-option input');
        imageOptions.forEach((option) => {
            if (option.value === selectedImage) {
                option.checked = true;
            } else {
                option.checked = false;
            }
        });
    }

    return (
        <>
            <button type="button" onClick={showFormHandler} className="add-new-board"><FontAwesomeIcon icon={faPlus} /><span className='btn-text'>Add board</span></button>
            <div className="form-wrapper board-form">
                <h2 className="form-header">Add new board</h2>
                <form className="form add-board" onSubmit={addBoardHandler}>
                    <input type="hidden" value={workspaceName || ''} />
                    <div className="form-group">
                        <input type="text" id="boardName" value={boardName} onChange={boardNameHandler} />
                        <label htmlFor="board-name">Board Name</label>
                    </div>
                    <div className="form-group">
                        <textarea id="board-description" value={boardDescription} onChange={boardDescriptionHandler} ></textarea>
                        <label htmlFor="board-description">Description</label>
                    </div>
                    <div className="form-group images-wrapper">
                        {images.map((imageUrl, index) => {
                            return (
                                <div key={index} className="image-option">
                                    <input
                                        type="radio"
                                        id={`image-${index}`}
                                        name="board-image"
                                        value={imageUrl} // Use the actual image URL as the value
                                        checked={boardImage === imageUrl} // Bind the checked state to boardImage
                                        onChange={boardImageHandler} // Update boardImage when selected
                                    />
                                    <label htmlFor={`image-${index}`}>
                                        <img src={imageUrl} alt={`Board image ${index + 1}`} />
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <button type="submit" className="btn btn-submit">Create Board</button>
                </form>
                <button type="button" className="btn btn-close" onClick={handleFormClose}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </>
    )
}