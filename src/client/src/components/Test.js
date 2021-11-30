import React from "react";
import ReactDOM, { render } from "react-dom";
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
var j = {}; // Depature flight
var k = {}; // arrival flight
var cabin = ""; // cabin class (F,B,E)
var AdultNo = 0; // No of Passengers (Adult & childern)
var childNo = 0;

export default function DatePick() {
  const [errVisible, setErrorVisible] = useState(false);
  const [errVisible1, setErrorVisible1] = useState(false);
  const [date, setDate] = useState({});
  const [date2, setDate2] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const style = { background: "white", padding: "8px 0" };

  // Flight Code
  const options = [
    { value: "JFK" },
    { value: "CAI" },
    { value: "ASU" },
    { value: "CGD" },
    { value: "SYD" },
    { value: "BEY" },
    { value: "BEI" },
  ];

  // Date Values
  function onChange(dates, dateStrings) {
    console.log("onChange");
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    j["FlightDate"] = dateStrings[0]; // departure date
    k["FlightDate"] = dateStrings[1]; // arrival date
  }
  // From
  function fromValue(value3) {
    console.log("in 3");
    j["From"] = value3;
    k["To"] = value3;
  }
  //To
  function toValue(value4) {
    console.log("in 4");
    j["To"] = value4;
    k["From"] = value4;
  }
  // NO of Passengers
  function onChangeAdult(value1) {
    console.log("in 1");
    AdultNo = 0;
    AdultNo = value1;
  }
  // NO of Passengers
  function onChangeChildren(value2) {
    console.log("in 2");
    childNo = 0;
    childNo = value2;
  }
  // Cabin class
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
  // Search Button
  function buttonClicked() {
    console.log("buttonClicked");
    console.log("date old");
    console.log(date);
    console.log("date 2 old");
    console.log(date2);

    if (j["From"] === j["To"]) {
      setErrorVisible(true);
    } else {
      if (cabin === "" && AdultNo !== 0) {
        console.log(" cabin = 0");
        setErrorVisible1(true);
      } else {
        setErrorVisible(false);
        setErrorVisible1(false);
        delete j.fseatsAvailable;
        delete k.fseatsAvailable;
        delete j.bseatsAvailable;
        delete k.bseatsAvailable;
        delete j.eseatsAvailable;
        delete k.eseatsAvailable;

        if (cabin === "1") {
          j["eseatsAvailable"] = AdultNo + childNo;
          k["eseatsAvailable"] = AdultNo + childNo;
        }
        if (cabin === "2") {
          j["fseatsAvailable"] = AdultNo + childNo;
          k["fseatsAvailable"] = AdultNo + childNo;
        }
        if (cabin === "3") {
          j["bseatsAvailable"] = AdultNo + childNo;
          k["bseatsAvailable"] = AdultNo + childNo;
        }
        // var x = {};
        // var y = {};

        // x = j;
        // y = k;
        setDate(Object.assign({}, j)); //Depature Flight
        setDate2(Object.assign({}, k));
        // sessionStorage.setItem("date", j);
        // sessionStorage.setItem("date2", k);
        // console.log("j");
        // console.log(j);
        // console.log("K");
        // console.log(k);
        console.log("Date");
        console.log(date);
        console.log("Date2");
        console.log(date2);
      }
    }
  }
  // useEffect(() => {
  //   const storeddate = parseInt(sessionStorage.getItem("date") || {});
  //   setDate(storeddate);
  //   const storeddate2 = parseInt(sessionStorage.getItem("date2") || {});
  //   setDate2(storeddate2);
  // }, []);

  useEffect(() => {
    console.log("use1");
    if (date !== {}) {
      axios
        .post(`http://localhost:8000/flights/search-m2`, date)
        .then((res) => {
          console.log(res.data);
          // if (res.data === "error") {
          //   console.log("error true");
          //   // err = true;
          //   // console.log(err);
          //   setErrorMessage("Example error message");
          // } else {
          //   err = false;
          //   console.log(err);
          // }
          //document.getElementById("tag");
        });
    }
  }, [date]);

  useEffect(() => {
    if (date2 !== {}) {
      axios
        .post(`http://localhost:8000/flights/search-m2`, date2)
        .then((res) => {
          console.log(res.data);
          // if (res.data === "error") {
          //   console.log("error true");
          //   setErrorMessage("Example error message");
          //   // err = true;
          //   // console.log(err);
          // }
        });
    }
  }, [date2]);

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
                    Class Cabin <DownOutlined />
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
                  min={1}
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
        {errVisible ? (
          <Tag
            icon={<CloseCircleOutlined />}
            color="error"
            visible={errVisible}
            id="tag"
          >
            Please choose a different destination from origin
          </Tag>
        ) : (
          <Tag
            icon={<CloseCircleOutlined />}
            color="error"
            visible={errVisible}
            id="tag"
          >
            Please choose a different destination from origin
          </Tag>
        )}
        {errVisible1 ? (
          <Tag
            icon={<CloseCircleOutlined />}
            color="error"
            visible={errVisible1}
            id="tag"
          >
            Please choose the cabin class
          </Tag>
        ) : (
          <Tag
            icon={<CloseCircleOutlined />}
            color="error"
            visible={errVisible1}
            id="tag"
          >
            Please choose the cabin class
          </Tag>
        )}
      </Layout>
    </React.Fragment>
  );
}
//ReactDOM.render(<buttonClicked />, document.getElementById("root"));