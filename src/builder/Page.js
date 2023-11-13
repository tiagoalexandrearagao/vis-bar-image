Object.defineProperty(exports, "__esModule", { value: false });
exports.Page = void 0;
var fs = require("fs");
//import fs from "fs";
var DEFAULT_BACKGROUND = "rgba(242,242,242,1.12)";
var Page = /** @class */ (function () {
  function Page(pageProps) {
    this.pageProps = pageProps;
    this.pageProps.theme = this.pageProps.theme || undefined;
    this.pageProps.width = this.pageProps.width || "auto";
    this.pageProps.height = this.pageProps.height || "auto";
    this.pageProps.backgroundColor =
      this.pageProps.backgroundColor || DEFAULT_BACKGROUND;
    this.html = [];
  }
  Page.prototype.getPageProps = function () {
    var props = [];
    props.push("width: ".concat(this.pageProps.width, ";"));
    props.push("height: ".concat(this.pageProps.width, ";"));
    props.push(
      "background-color: ".concat(this.pageProps.backgroundColor, ";")
    );
    props.push("margin: 8px;");
    props.push(this.pageProps.styles || "");
    props.push(";");
    return props.join("");
  };
  Page.prototype.add = function (component) {
    this.html.push(component);
  };
  Page.prototype.construct = function () {
    console.log("diretorio", __dirname + "/Styles/styles.css");

    var STYLES = `.shadow {
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    
    /* Card */
    
    .card {
      background-color: #fff;
      border-radius: 2px;
    }
    
    .cardHead {
      font-weight: 600;
      padding: 15px;
      position: relative;
    }
    
    .cardContents {
      padding: 15px 20px;
      position: relative;
    }
    
    /* Progress Bar */
    
    .bar {
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
    
    .barFill {
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
    
    /* Table */
    
    .tableCard {
      background-color: #fff;
      padding: 0px;
      font-family: Roboto, Helvetica Neue, sans-serif;
      position: relative;
      color: rgba(0, 0, 0, 0.87);
      border-radius: 2px;
      display: inline-block;
      text-align: center;
    }
    
    .table {
      border-collapse: collapse;
      background-color: #fff;
      padding: 0px;
      font-family: Roboto, Helvetica Neue, sans-serif;
      position: relative;
      color: rgba(0, 0, 0, 0.87);
      border-radius: 2px;
      display: inline-block;
    }
    
    .tableHeadings {
      display: table-cell;
      padding: 4px 56px 4px 24px;
      text-align: left;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      vertical-align: inherit;
      height: 56px;
      font-size: 15px;
      font-weight: 500;
      color: #fff;
    }
    .tableHead {
    }
    .tableRowEven,
    .tableRowOdd {
      color: inherit;
      height: 48px;
      display: table-row;
      vertical-align: middle;
      background-color: #fff;
    }
    
    .tableRowEven {
      background-color: #eee;
    }
    
    .tableCell {
      display: table-cell;
      padding: 4px 56px 4px 24px;
      text-align: left;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      vertical-align: inherit;
    }
    
    .tableTitle {
      color: rgba(0, 0, 0, 0.87);
      font-size: 25px;
      font-weight: 500;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 40px;
      margin-top: auto;
      margin-bottom: auto;
      padding: 8px;
    }
    
    /* chip */
    
    .chip {
      color: rgba(0, 0, 0, 0.87);
      border: none;
      height: 32px;
      width: fit-content;
      cursor: default;
      padding: 0;
      display: inline-flex;
      outline: none;
      font-size: 0.8125rem;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      white-space: nowrap;
      align-items: center;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      border-radius: 16px;
      justify-content: center;
      background-color: #e0e0e0;
    }
    
    .chipText {
      display: flex;
      align-items: center;
      user-select: none;
      white-space: nowrap;
      padding-left: 12px;
      padding-right: 12px;
    }
    
    /* list */
    
    .listCard {
      flex-direction: column;
      padding: 5px 8px 2px 10px;
      border-radius: 2px;
      font-family: Roboto, Helvetica Neue, sans-serif;
      position: relative;
      display: inline-block;
      color: rgba(0, 0, 0, 0.87);
    }
    
    .listTitle {
      color: rgba(0, 0, 0, 0.87);
      font-size: 18px;
      font-weight: 400;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 25px;
    }
    
    .listItems {
      padding: 12px 10px 5px 10px;
    }
    
    /* Text */
    
    .text {
      display: inline-block;
      position: relative;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    }
    
    /* container */
    
    .container {
      padding: 24px;
      border-radius: 2px;
      font-family: Roboto, Helvetica Neue, sans-serif;
      position: relative;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
    }
    `; /*fs.readFileSync(
      __dirname + "/src/builder/Styles/styles.css",
      "utf8"
    )*/
    return "<html><head><title></title><style>"
      .concat(STYLES, "</style></head><body style= ' \n               ")
      .concat(this.getPageProps(), " '>\n               ")
      .concat(this.html.join(""), "\n               </body></html>")
      .replace(/\n*\t*\r*\s+/g, " ");
  };
  return Page;
})();
exports.Page = Page;
