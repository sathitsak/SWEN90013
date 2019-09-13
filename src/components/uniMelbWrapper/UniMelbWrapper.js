import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { uom_css } from "../../css/uom.css"

class UniMelbWrapper extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <script
            type="text/javascript"
            src="https://d2h9b02ioca40d.cloudfront.net/v7.0.1/uom.js"
          />
          <link
            defer="true"
            async="true"
            rel="stylesheet"
            href={uom_css}
          />
        </Helmet>
        <div className="uomcontent">
          <Header />
          <div className="page-inner">
            <div role="main">{this.props.children}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default UniMelbWrapper;
