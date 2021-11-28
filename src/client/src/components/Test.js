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
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const filter = createFilterOptions();

export default function DatePick() {
  const [date, setDate] = useState({});
  const [date2, setDate2] = useState({});
  const style = { background: "white", padding: "8px 0" };

  const j = {};
  const k = {};

  var cabin = 0;
  var AdultNo = 0;

  const options = [
    { value: "JFK" },
    { value: "CAI" },
    { value: "ASU" },
    { value: "CGD" },
  ];

  function onChange(dates, dateStrings) {
    console.log("onChange");
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    j["FlightDate"] = dateStrings[0]; // departure date
    k["FlightDate"] = dateStrings[1]; // arrival date
  }

  function fromValue(value3) {
    console.log(value3);
    j["From"] = value3;
    k["To"] = value3;
  }

  function toValue(value4) {
    console.log(value4);
    j["To"] = value4;
    k["From"] = value4;
  }

  function onChangeAdult(value1) {
    console.log(value1);
    AdultNo = value1;
  }

  function onChangeChildren(value2) {
    console.log(value2);
  }

  const onChangeDropDown = ({ key }) => {
    console.log(`Click on item ${key}`);
    console.log(typeof key);
    cabin = key;
  };

  const menu = (
    <Menu onClick={onChangeDropDown}>
      <Menu.Item key="1">Economy</Menu.Item>
      <Menu.Item key="2">First Class</Menu.Item>
      <Menu.Item key="3">Business Class</Menu.Item>
    </Menu>
  );

  function buttonClicked() {
    console.log("buttonClicked");
    if (cabin === "1") {
      j["eseatsAvailable"] = AdultNo;
      k["eseatsAvailable"] = AdultNo;
    }
    if (cabin === "2") {
      j["fseatsAvailable"] = AdultNo;
      k["fseatsAvailable"] = AdultNo;
    }
    if (cabin === "3") {
      j["bseatsAvailable"] = AdultNo;
      k["bseatsAvailable"] = AdultNo;
    }
    setDate(j);
    setDate2(k);
    // console.log(j);
    // console.log("K");
    // console.log(k);
    // console.log(date);
    // console.log("Date");
    // console.log(date2);
  }

  useEffect(() => {
    if (date !== {}) {
      axios
        .post(`http://localhost:8000/flights/search-m2`, date)
        .then((res) => {
          console.log(res.data);
          //document.getElementById("tag");
        });
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
                  onChange={fromValue}
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
                  onChange={toValue}
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
          <Tag
            icon={<CloseCircleOutlined />}
            color="error"
            visible={true}
            id="tag"
          >
            Please choose a different destination from origin
          </Tag>
        </Footer>
      </Layout>
    </React.Fragment>
  );
}
