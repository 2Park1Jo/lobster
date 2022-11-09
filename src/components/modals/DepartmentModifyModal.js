const DepartmentModifyModal=(departmentName,departmentGoal)=>{
    let [inputDepartmentName, setInputDepartmentName] = useState(departmentName);
    let [inputDepartmentGoal, setInputDepartmentGoal] = useState(departmentGoal);
    

return(
    <div>
        <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
        <h3 className="Auth-form-title">워크스페이스 추가하기</h3>
        <div className="form-group mt-3">
            <label>워크스페이스이름</label>
            <input
                type="text"
                className="form-control mt-1"
                placeholder="워크스페이스 이름을 입력해주세요"
                value={ inputDepartmentName }
                onChange={e => setInputDepartmentName(e.target.value)}
            />
        </div>
        <div className="form-group mt-3">
            <label>목적</label>
            <input
                type="text"
                className="form-control mt-1"
                placeholder="목적을 입력해주세요"
                value={ inputDepartmentGoal }
                onChange={e => setInputDepartmentGoal(e.target.value)}
            />
        </div>
    </div>
);
}
export default DepartmentModifyModal;