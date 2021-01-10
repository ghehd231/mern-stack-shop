import React from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;
const CheckBox = (props) => {
  //체크박스 리스트들을 만드는 함수
  const renderCheckbokLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox onChange>
          <span>{value.name}</span>
        </Checkbox>
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
