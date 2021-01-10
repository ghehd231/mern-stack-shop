import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;
const CheckBox = (props) => {
  const [Checked, setChecked] = useState([]);

  //체크박스 토글해주는 함수
  const handleToggle = (value) => {
    //누른것의 인덱스를 구하고
    const currentIndex = Checked.indexOf(value);
    //전체 checked 된 State에서 현제 누른 Checkbox가 이미 있다면(index가 0보다 클떄 )
    const newChecked = [...Checked];

    //State를 넣어준다.
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      //빼주고
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  //체크박스 리스트들을 만드는 함수
  const renderCheckbokLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckbokLists()}
          {/* <Checkbox onChange={onChange}>Checkbox</Checkbox> */}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
