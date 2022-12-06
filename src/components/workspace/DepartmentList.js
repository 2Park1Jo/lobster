import DepartmentCard from "./DepartmentCard";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ACCESSED_DEPARTMENT } from "../../recoil/Atoms";
import { ListGroup } from "react-bootstrap";
import { setLastChatData } from "../../api/MemberAPI";
import { useEffect, useState } from "react";

export default function DepartmentList(props){
    const setAccessedDepartment = useSetRecoilState(ACCESSED_DEPARTMENT);
    let [departmentCardList, setDepartmentCardList] = useState([]);
    let navigate = useNavigate();

    useEffect( () => {
        let departmentCards = [];
        let uncheckedMessageCount = 0;
    
        props.departments.map( (department, index) => {
            if (props.messageCountGap[index] === undefined){
                uncheckedMessageCount = 0;
            }
            else if (props.messageCountGap[index].isNewDepartment){
                uncheckedMessageCount = "new";
            }
            else if (department.departmentId === props.messageCountGap[index].departmentId){
                uncheckedMessageCount = props.messageCountGap[index].countGap;
            }
            
            if (department.departmentId === localStorage.getItem('accessedDepartmentId')){
                uncheckedMessageCount = 0;
            }
            departmentCards.push(
                <DepartmentCard
                    name={department.departmentName}
                    onClicked={
                        () => {
                            if (props.loading && props.checkedMessageCount !== 0){
                                setLastChatData(
                                    localStorage.getItem('loginMemberEmail'),
                                    localStorage.getItem('accessedDepartmentId'),
                                    localStorage.getItem('accessedWorkspaceId'),
                                    "",
                                    props.checkedMessageCount
                                ).then( (res) =>{
                                    if(department.departmentId !== localStorage.getItem('accessedDepartmentId') && res.status === 201){
                                        props.isChatReceived.current = false;
                                        setAccessedDepartment({
                                            id : department.departmentId,
                                            name: department.departmentName
                                        })
                                        localStorage.setItem('accessedDepartmentId', department.departmentId)
                                        localStorage.setItem('accessedDepartmentName', department.departmentName)
                                        props.setIsDepartmentMemberViewModelUpdated(false);
                                        props.setIsChatViewModelUpdated(false);
                                        props.setLoading(false);
                                        navigate("/workspace/" + props.workspaceId + "/chat/department/" + department.departmentId)
                                    }
                                }
                                );
                            }
                        }   
                    }
                    uncheckedMessageCount={uncheckedMessageCount}
                    key = {index}
                />
            )
        })
        setDepartmentCardList([...departmentCards])
    },[props.messageCountGap, props.departments, props.lastChatData])


    return(
        <ListGroup variant="flush">{departmentCardList}</ListGroup>
    )
}
