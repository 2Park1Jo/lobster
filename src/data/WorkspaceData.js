let workspaceData = [
    {
        workspaceId: '1',
        workspaceName: '오픈소스과제',
        workspaceGoal: '오픈소스 프로젝트 제작',
        workspaceDeadline: '2022-10-30'
    },
    {
        workspaceId: '2',
        workspaceName: '데이터베이스 과제방',
        workspaceGoal: '데이터베이스 발표 PPT 완성',
        workspaceDeadline: '2022-10-30'
    },
    {
        workspaceId: '3',
        workspaceName: '대원이와 아이들 과제',
        workspaceGoal: '공모전 상타기',
        workspaceDeadline: '2023-01-30'
    },
    {
        workspaceId: '4',
        workspaceName: '형준이는 치타일까',
        workspaceGoal: '형준이에 대한 연구',
        workspaceDeadline: '2022-10-30'
    },
    {
        workspaceId: '5',
        workspaceName: '엔샵 동아리방',
        workspaceGoal: '스터디 완수',
        workspaceDeadline: '2022-10-30'
    },
    {
        workspaceId: '6',
        workspaceName: '세종대 축제준비방',
        workspaceGoal: '축제 성공적으로 끝내기',
        workspaceDeadline: '2022-10-30'
    },
];

export function getAllWorkspaceData() {
    return workspaceData;
}

export function getWorkspaceData(workspaceId) {
    for (let index = 0; index < workspaceData.length; index++){
        if (workspaceData[index].workspaceId === workspaceId){
            return workspaceData[index];
        }
    }
    return workspaceData[0];
}