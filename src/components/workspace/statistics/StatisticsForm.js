import WorkspaceStatistics from "./WorkspaceStatistics";
import DepartmentStatistics from "./DepartmentStatistics";

export default function StatisticsForm({workspaceViewModel}){
    return (   
        <>
            <WorkspaceStatistics
                workspaceViewModel={workspaceViewModel}
            />
            <DepartmentStatistics/>
        </>
    );
};