let departmentData = [
    {
        workspaceId: '1',
        departmentId: '1_1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
    {
        workspaceId: '1',
        departmentId: '1_2',
        departmentName: '아이디어방',
        departmentGoal: '아이디어 정하기',
        departmentDeadLine: '2022-10-10'
    },
    {
        workspaceId: '1',
        departmentId: '1_3',
        departmentName: '코딩방',
        departmentGoal: '프로젝트 완성',
        departmentDeadLine: '2022-10-29'
    },
    {
        workspaceId: '2',
        departmentId: '2_1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
    {
        workspaceId: '3',
        departmentId: '3_1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
    {
        workspaceId: '4',
        departmentId: '4_1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
    {
        workspaceId: '5',
        departmentId: '5_1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
    {
        workspaceId: '6',
        departmentId: '6_1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
];

export function getDepartmentData() {
    return departmentData;
}

export function setDepartmentData(inputDepartmentData) {
    departmentData = inputDepartmentData;
}

export function getDepartmentGoal(departmentId) {
    for (let index = 0; index < departmentData.length; index++){
        if (departmentData[index].departmentId === departmentId){
            return departmentData[index].departmentGoal;
        }
    }
    return "";
}

export function getDepartmentDeadLine(departmentId) {
    for (let index = 0; index < departmentData.length; index++){
        if (departmentData[index].departmentId === departmentId){
            return departmentData[index].departmentDeadLine;
        }
    }
    return "";
}