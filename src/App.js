/* eslint-disable react/no-typos */
import React, { Component } from "react";
import Table from "./components/Table";
import { data } from "./data/data";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const headers = [
      "symbol",
      "series",
      "openPrice",
      "highPrice",
      "lowPrice",
      "ltp",
      //"previousPrice",
      "netPrice",
      // "tradedQuantity",
      // "turnoverInLakhs",
      // "lastCorpAnnouncementDate",
      // "lastCorpAnnouncement",
    ];
    this.state = {
      windowWidth: window.innerWidth,
      dataArray: [data],
      headers: headers,
      segments: 1,
      tableWidth: 100,
    };
  }

  getModifiedDataArray = (segments) => {
    const fullData = data;
    console.log(fullData.length);
    const dataDivision = Math.floor(fullData.length / segments);
    let rem = fullData.length % segments;
    let last = 0;
    let modifiedData = [];
    for (let i = 0; i < segments; i++) {
      let end = last + dataDivision;
      if (rem !== 0) {
        end++;
        rem--;
      }
      let temp = [];
      for (let j = last; j < end; j++) {
        temp.push(fullData[j]);
      }
      modifiedData.push(temp);
      last = end;
    }
    return modifiedData;
  };

  // Handle any distortion in Ui
  handleDistortion = () => {
    if (this.state.segments > 1) {
      const reqWidth = document.getElementsByTagName("table")[0].offsetWidth;
      const availableWidth = window.innerWidth / this.state.segments + 1;
      console.log(reqWidth, availableWidth);
      if (reqWidth > availableWidth) {
        this.setState({ tableWidth: reqWidth }, () => this.handleResize());
      }
    }
  };

  handleResize = () => {
    const { tableWidth } = this.state;
    if (window.innerWidth <= tableWidth)
      this.setState({
        windowWidth: window.innerWidth,
        dataArray: [data],
        segments: 1,
      });
    else {
      let segments = Math.floor(window.innerWidth / tableWidth);
      if (segments > 4) segments = 4;

      if (this.state.segments !== segments) {
        this.setState(
          {
            windowWidth: window.innerWidth,
            dataArray: this.getModifiedDataArray(segments),
            segments: segments,
          },
          () => this.handleDistortion()
        );
      } else {
        this.handleDistortion();
      }
    }
    //console.log(window.innerWidth);
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnMount() {
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    const { headers } = this.state;
    const { dataArray } = this.state;
    const clas = `mx-0 px-0 py-0 col-${12 / dataArray.length}`;
    console.log(dataArray, clas);
    return (
      
      <div class="p-3 mb-2 bg-dark text-white" >
        <h1 class="p-3 mb-2 bg-danger text-white">
          Sample Responsive UI Project
        </h1>
        <div className="row mx-0 px-0 py-0">
          {dataArray.map((data) => (
            <div className={clas}>
              <Table data={data} headers={headers} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

