let departmentData = [
    {
        departmentId: '1',
        departmentName: '📢 공지방',
        departmentGoal: '',
        departmentDeadLine: ''
    },
    {
        departmentId: '2',
        departmentName: '아이디어방',
        departmentGoal: '아이디어 정하기',
        departmentDeadLine: '2022-10-10'
    },
    {
        departmentId: '3',
        departmentName: '코딩방',
        departmentGoal: '프로젝트 완성',
        departmentDeadLine: '2022-10-29'
    }
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