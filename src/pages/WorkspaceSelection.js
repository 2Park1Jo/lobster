import "./WorkspaceSelection.css"
import WorkSpaceBanner from "../components/banner/WorkspaceBanner";
import { getAllWorkspaceData } from "../data/WorkspaceData"
import { Workspace } from "../models/model/Workspace";
import { WorkspaceViewModel } from "../models/view-model/WorkspaceViewModel";

export default function WorkspaceSelection() {
    const workspace = new Workspace()
    const workspaceViewModel = new WorkspaceViewModel(workspace);
    workspaceViewModel.update(getAllWorkspaceData());

    return(
        <div className="banner-container">
            <div className="banner-top">
                <h2>LOBSTER</h2>
            </div>

            <div className="banner-body">
                <WorkSpaceBanner 
                    allWorkspace={ workspaceViewModel.getAll() }
                />
            </div>

            <div className="banner-bottom">
                <button className="add-button"> + </button>
            </div>
        </div>
    );
}