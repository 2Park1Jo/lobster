import WorkspcaeCard from "./WorkspcaeCard";
import WorkspaceCarousel from "./WorkspaceCarousel";
import { getAllWorkspaceData } from "../../data/WorkspaceData"

export default function workSpaceBanner() {
    let workspaceData = getAllWorkspaceData()
    let cards = []

    workspaceData.map( (workspace) => {
        cards.push(
            {
                key: workspace.workspaceId,
                content: 
                <WorkspcaeCard 
                    image={"https://picsum.photos/500/300?img="+workspace.workspaceId} 
                    overline={workspace.workspaceDeadline} 
                    heading={workspace.workspaceName} 
                    body={workspace.workspaceGoal}/>
            },
        )
    })

    return (
        <WorkspaceCarousel
            cards={cards}
            height="500px"
            width="80%"
            margin="0 auto"
            offset={2}
            showArrows={false}
        />
    );
}
