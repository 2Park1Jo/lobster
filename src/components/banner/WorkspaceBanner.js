import WorkspcaeCard from "./WorkspcaeCard";
import WorkspaceCarousel from "./WorkspaceCarousel";
import { WORKSPACE_ADD_KEY } from "../../utils/Constant";

export default function workSpaceBanner({ allWorkspace }) {
    let cards = []

    allWorkspace.map( (workspace) => {
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

    cards.push(
        {
            key: WORKSPACE_ADD_KEY,
            content: 
                <WorkspcaeCard 
                    image="assets/images/plus.png"
                    heading="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;워크스페이스 추가하기"
                    overline={WORKSPACE_ADD_KEY}
                />

        },
    )

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
