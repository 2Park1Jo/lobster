import WorkspaceStatistics from "./WorkspaceStatistics";
import DepartmentStatistics from "./DepartmentStatistics";

export default function StatisticsForm({workspaceViewModel, departmentViewModel, chatViewModel}){
    return (   
        <>
            <WorkspaceStatistics
                workspaceViewModel={workspaceViewModel}
            />
            <DepartmentStatistics
                departmentViewModel={departmentViewModel}
                chatViewModel = {chatViewModel}
            />
        </>
    );
};