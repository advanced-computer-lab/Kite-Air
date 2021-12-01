import React from "react";
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
import { Row, Col } from "antd";
import { Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const filter = createFilterOptions();
var j = {}; // Depature flight
var k = {}; // arrival flight
var cabin = ""; // cabin class (F,B,E)
var AdultNo = 0; // No of Passengers (Adult & childern)
var childNo = 0;

export default function DatePick(props) {
  const [errVisible, setErrorVisible] = useState(false);
  const [errVisible1, setErrorVisible1] = useState(false);
  const [date, setDate] = useState({});
  const [date2, setDate2] = useState({});
  const [chosenClass, setChosenClass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const style = {};

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
    if (dates !== null) {
      console.log("onChange");
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      j["FlightDate"] = dateStrings[0]; // departure date
      k["FlightDate"] = dateStrings[1]; // arrival date
    }
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

    switch (key) {
      case "1":
        setChosenClass("Economy Class");
        break;
      case "2":
        setChosenClass("First Class");
        break;
      case "3":
        setChosenClass("Business Class");
        break;
    }
    console.log("Chosen " + chosenClass);
  };

  const menu = (
    <Menu onClick={onChangeDropDown}>
      <Menu.Item key="1">Economy Class</Menu.Item>
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

          // j["fseatsAvailable"] = 0;
          // k["fseatsAvailable"] = 0;

          // j["bseatsAvailable"] = 0;
          // k["bseatsAvailable"] = 0;
        }
        if (cabin === "2") {
          j["fseatsAvailable"] = AdultNo + childNo;
          k["fseatsAvailable"] = AdultNo + childNo;

          // j["bseatsAvailable"] = 0;
          // k["bseatsAvailable"] = 0;
          // j["eseatsAvailable"] = 0;
          // k["eseatsAvailable"] = 0;
        }
        if (cabin === "3") {
          j["bseatsAvailable"] = AdultNo + childNo;
          k["bseatsAvailable"] = AdultNo + childNo;

          // j["eseatsAvailable"] = 0;
          // k["eseatsAvailable"] = 0;

          // j["fseatsAvailable"] = 0;
          // k["fseatsAvailable"] = 0;
        }

        // var x = {};
        // var y = {};

        // x = j;
        // y = k;
        setDate(Object.assign({}, j)); //Depature Flight
        setDate2(Object.assign({}, k));

        props.setSearchData(j);//searchData

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
          // let n = res.data.length;
          // for(let i = 0; i< n; i++){

          // }

          console.log(res.data);
          props.setDepFlights(res.data);

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
          props.setRetFlights(res.data);

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
    <div>
      <br />
      <br />
      <br />

      <Content style={{}}>
      
        <table>
          <thead>
            <tr>
              <td style={{ display: "flex", justifyContent: "flex-start",color: "white"}}>
               <h2 style={{color: "white"}}>Search flights</h2>{" "}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {" "}
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {chosenClass.localeCompare("") === 0
                      ? "Cabin Class "
                      : chosenClass + " "}
                    <DownOutlined />
                  </a>
                </Dropdown>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tg-hfk9">
                {" "}
                <AutoComplete
                  style={{ borderColor: "black", width: 150 }}
                  options={options}
                  placeholder="Leaving From"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={fromValue}
                />
              </td>
              <td class="tg-hfk9">
                {" "}
                <AutoComplete
                  style={{ borderColor: "black", width: 200 }}
                  options={options}
                  placeholder="Going To"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={toValue}
                />
              </td>
              <td class="tg-hfk9">
                {" "}
                <RangePicker
                  format="MM-DD-YYYY"
                  onChange={onChange}
                  autoFocus={true}
                  allowClear
                  style={{}}
                />
              </td>
              <td class="tg-hfk9">
                {" "}
                <InputNumber
                  placeholder="Adult"
                  min={1}
                  max={10}
                  onChange={onChangeAdult}
                  style={{ width: 100 }}
                />
              </td>
              <td class="tg-hfk9">
                {" "}
                <InputNumber
                  style={{ width: 200 }}
                  placeholder="Child"
                  min={0}
                  max={10}
                  onChange={onChangeChildren}
                  style={{ width: 100 }}
                />
              </td>
            </tr>
            <tr style={{padding:"100px"}}>
              <td class="tg-hfk9"></td>
              <td class="tg-hfk9"></td>
              <td class="tg-hfk9"></td>
              <td class="tg-hfk9"></td>
              <td class="tg-hfk9" style={{}}>
                {" "}
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={buttonClicked}
                >Search</Button>
              </td>
            </tr>
          </tbody>
        </table>

         {/* <Row gutter={20}>
          <Col className="gutter-row" span={1}>
            <div style={style}></div>
          </Col>
          <Col
            className="gutter-row"
            span={10}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <h4 style={style}> Search flights </h4>
          </Col>

          <Col
            style={{ display: "flex", justifyContent: "flex-end" }}
            className="gutter-row"
            span={4}
          >
            <div style={style}>
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {chosenClass.localeCompare("") === 0
                    ? "Cabin Class "
                    : chosenClass + " "}
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>

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
        <Row>
          {" "}
          <Col
            span={15}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={buttonClicked}
            >
              Search
            </Button>
          </Col>
        </Row> */}

      </Content>

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
    </div>
  );
}
