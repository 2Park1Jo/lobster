import DepartmentCard from "./DepartmentCard";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ACCESSED_DEPARTMENT } from "../../recoil/Atoms";
import { ListGroup } from "react-bootstrap";
import { setLastChatData } from "../../api/MemberAPI";
import { useMemo } from "react";

export default function DepartmentList(props){
    const [accessedDepartment, setAccessedDepartment] = useRecoilState(ACCESSED_DEPARTMENT);
    // const setAccessedDepartment = useSetRecoilState(ACCESSED_DEPARTMENT);
    let navigate = useNavigate();

    let departmentCards = [];
    let uncheckedMessageCount = 0;

    props.departments.map( (department, index) => {
        if (department.departmentId === props.messageCountGap[index].departmentId){
            uncheckedMessageCount = props.messageCountGap[index].countGap;
        }
        console.log(uncheckedMessageCount)
        departmentCards.push(
            <DepartmentCard
                name={department.departmentName}
                onClicked={
                    () => {
                        setLastChatData(
                            localStorage.getItem('loginMemberEmail'),
                            localStorage.getItem('accessedDepartmentId'),
                            localStorage.getItem('accessedWorkspaceId'),
                            props.lastChatData.chatId,
                            props.checkedMessageCount
                        ).then( (res) =>{
                            if(department.departmentId !== localStorage.getItem('accessedDepartmentId') && res.status === 201){

                                console.log('success last chat data')

                                setAccessedDepartment({
                                    id : department.departmentId,
                                    name: department.departmentName
                                })
                                localStorage.setItem('accessedDepartmentId', department.departmentId)
                                localStorage.setItem('accessedDepartmentName', department.departmentName)
                                navigate("/workspace/" + props.workspaceId + "/chat/department/" + department.departmentId)
                            }
                        }
                        );
                    }   
                }
                uncheckedMessageCount={uncheckedMessageCount}
                key = {index}
            />
        )
    })
    return(
        <ListGroup variant="flush">{departmentCards}</ListGroup>
    )
}
