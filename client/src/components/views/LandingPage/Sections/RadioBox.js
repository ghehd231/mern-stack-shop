import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;
const RadioBox = (props) => {
  const [Value, setValue] = useState(0);

  //라디오 박스 리스트들을 만드는 함수
  const renderRadioBoxLists = () =>
    props.list &&
    props.list.map((value) => <Radio value={value._id}>{value.name}</Radio>);

  const handleChange = (event) => {
    //Radio.Group의 value와 Radio의 value가 같으면 선택 된 것!!
    setValue(event.target.value);
    //부모컴포넌트에 전달 price 의 id전달
    props.handleFilters(event.target.value);
  };
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBoxLists()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
