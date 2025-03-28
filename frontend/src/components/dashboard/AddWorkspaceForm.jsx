export default function AddWorkspaceForm(){
    return(
        <>
            <form action="">
                <div className="form-group">
                    <label htmlFor="workspace-name">Workspace name</label>
                    <input type="text" name="workspace-name" id="workspace-name" />
                </div>
                <div className="form-group">
                    <label htmlFor="workspace-description">Workspace description</label>
                    <textarea name="workspace-description" id="workspace-description" cols="30" rows="10"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="workspace-image">Workspace image</label>
                    <input type="file" name="workspace-image" id="workspace-image" />
                </div>
                <div className="form-group">
                    <button type="submit">Create Workspace</button>
                </div>
            </form>
        </>
    )
}