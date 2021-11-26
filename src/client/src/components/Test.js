import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import { AutoComplete } from "antd";
import { Layout } from "antd";
import { Row, Col, Divider } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const filter = createFilterOptions();

export default function DatePick() {
  const [date, setDate] = useState({});
  const [date2, setDate2] = useState({});
  const [from, setFrom] = useState({});
  const style = { background: "white", padding: "8px 0" };
  //console.log(dialogValue);

  //console.log(value.title);

  const options = [
    { value: "JFK" },
    { value: "CAI" },
    { value: "ASU" },
    { value: "CGD" },
  ];

  const j = {};
  const k = {};
  function onChange(dates, dateStrings) {
    console.log("onChange");
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    j["FlightDate"] = dateStrings[0];
    k["FlightDate"] = dateStrings[1];
  }

  function onChangeAdult(value1) {
    console.log(value1);
  }

  function onChangeChildren(value2) {
    console.log(value2);
  }

  function buttonClicked() {
    console.log("buttonClicked");
    setDate(j);
    setDate2(k);
  }

  const onChangeDropDown = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  const menu = (
    <Menu onClick={onChangeDropDown}>
      <Menu.Item key="1">Economy</Menu.Item>
      <Menu.Item key="2">First Class</Menu.Item>
      <Menu.Item key="3">Business Class</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (date !== {}) {
      axios
        .post(`http://localhost:8000/flights/search-m2`, date)
        .then((res) => console.log(res.data));
    }
  }, [date]);

  useEffect(() => {
    if (date2 !== {}) {
      axios
        .post(`http://localhost:8000/flights/search-m2`, date2)
        .then((res) => console.log(res.data));
    }
  }, [date2]);

  //   useEffect(() => {
  //     if (from !== []) {
  //       axios
  //         .post(`http://localhost:8000/flights/search-m2`, from)
  //         .then((res) => console.log(res.data));
  //     }
  //   }, [from]);

  return (
    <React.Fragment>
      <Layout>
        <Header style={{ background: "white" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={18}>
              <h1 style={style}>Search flights</h1>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Economy <DownOutlined />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={{ background: "white" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={1}>
              <div style={style}></div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={style}>
                <AutoComplete
                  style={{ borderColor: "black", width: 200 }}
                  options={options}
                  placeholder="From"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={style}>
                <AutoComplete
                  style={{ borderColor: "black", width: 200 }}
                  options={options}
                  placeholder="To"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div style={style}>
                <RangePicker
                  format="MM-DD-YYYY"
                  onChange={onChange}
                  autoFocus={true}
                  allowClear
                  style={{ borderColor: "black" }}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={style}>
                <InputNumber
                  placeholder="Adult"
                  min={0}
                  max={10}
                  onChange={onChangeAdult}
                  style={{ borderColor: "black", width: 200 }}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>
                <InputNumber
                  style={{ width: 200 }}
                  placeholder="Child"
                  min={0}
                  max={10}
                  onChange={onChangeChildren}
                  style={{ borderColor: "black", width: 200 }}
                />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ background: "white" }}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={buttonClicked}
          >
            Search
          </Button>
        </Footer>
      </Layout>
    </React.Fragment>
  );
}
