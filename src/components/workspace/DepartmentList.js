import DepartmentCard from "./DepartmentCard";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ACCESSED_DEPARTMENT } from "../../recoil/Atoms";
import { ListGroup } from "react-bootstrap";

export default function DepartmentList(props){
    const setAccessedDepartment = useSetRecoilState(ACCESSED_DEPARTMENT);
    let navigate = useNavigate();
    let departmentCards = [];

    props.departments.map( (department, index) => {
        departmentCards.push(
            <DepartmentCard
                name={department.departmentName}
                onClicked={
                    () => {

                        if(department.departmentId !== localStorage.getItem('accessedDepartmentId')){
                            setAccessedDepartment({
                                id : department.departmentId,
                                name: department.departmentName
                            })
                            localStorage.setItem('accessedDepartmentId', department.departmentId)
                            localStorage.setItem('accessedDepartmentName', department.departmentName)
                            navigate("/workspace/" + props.workspaceId + "/chat/department/" + department.departmentId)
                        }
                    }   
                }
                key = {index}
            />
        )
    })

    return <ListGroup variant="flush">{departmentCards}</ListGroup>;
}
