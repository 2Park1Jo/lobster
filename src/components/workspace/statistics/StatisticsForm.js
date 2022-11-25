import "./Statistics.css"
import WorkspaceStatistics from "./WorkspaceStatistics";
import DepartmentChatStatistics from "./DepartmentChatStatistics";
import TalkKingStatistics from "./TalkKingStatistics";

export default function StatisticsForm({workspaceViewModel, departmentViewModel, chatViewModel, departmentIdList}){
    return (   
        <div className="statistics-form-container">
            <WorkspaceStatistics
                workspaceViewModel={workspaceViewModel}
            />
            <DepartmentChatStatistics
                departmentViewModel={departmentViewModel}
                chatViewModel = {chatViewModel}
                departmentIdList = {departmentIdList}
            />
            <TalkKingStatistics/>

        </div>
    );
};