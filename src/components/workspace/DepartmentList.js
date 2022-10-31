import DepartmentCard from "./DepartmentCard";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ACCESSED_DEPARTMENT } from "../../recoil/Atoms";

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
                        setAccessedDepartment({
                            id : department.departmentId,
                            name: department.departmentName
                        })
                        navigate("/workspace/" + props.workspaceId + "/chat/department/" + department.departmentId)
                    }   
                }
                key = {index}
            />
        )
    })

    return departmentCards;
}
