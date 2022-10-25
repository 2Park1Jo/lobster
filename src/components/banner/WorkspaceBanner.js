import WorkspcaeCard from "./WorkspcaeCard";
import WorkspaceCarousel from "./WorkspaceCarousel";

export default function workSpaceBanner() {
    let cards = [
        {
            key: 1,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=1" overline={"마감일 : 2022/10/26"} heading={"1번워크스페이스 이름"} body={"1번워크스페이스 정보"}/>
        },
        {
            key: 2,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=2" overline={"마감일 : 2022/10/27"} heading={"2번워크스페이스 이름"} body={"2번워크스페이스 정보"}/>
        },
        {
            key: 3,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=3" overline={"마감일 : 2022/10/28"} heading={"3번워크스페이스 이름"} body={"3번워크스페이스 정보"}/>
        },
        {
            key: 4,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=4" overline={"마감일 : 2022/10/29"} heading={"4번워크스페이스 이름"} body={"4번워크스페이스 정보"}/>
        },
        {
            key: 5,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=5" overline={"마감일 : 2022/10/30"} heading={"5번워크스페이스 이름"} body={"5번워크스페이스 정보"}/>
        },
        {
            key: 6,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=6" overline={"마감일 : 2022/10/29"} heading={"6번워크스페이스 이름"} body={"6번워크스페이스 정보"}/>
        },
        {
            key: 7,
            content: <WorkspcaeCard image="https://picsum.photos/500/300?img=7" overline={"마감일 : 2022/10/30"} heading={"7번워크스페이스 이름"} body={"7번워크스페이스 정보"}/>
        },

    ];

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
