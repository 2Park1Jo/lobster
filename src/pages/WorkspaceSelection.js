import "./WorkspaceSelection.css"
import WorkSpaceBanner from "../components/banner/WorkspaceBanner";

export default function WorkspaceSelection() {
    return(
        <div className="banner-container">
            <div className="banner-top">
                <h2>LOBSTER</h2>
            </div>

            <div className="banner-body">
                <WorkSpaceBanner />
            </div>

            <div className="banner-bottom">
                <button className="add-button"> + </button>
            </div>
        </div>
    );
}