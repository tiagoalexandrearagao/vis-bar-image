export function slider(params) {
  let store = require("store");
  let currentAndOr = "AND";
  let dataOr = "";
  let dataAnd = "";
  let sliderButton = "";
  let mountSlider = "";

  try {
    currentAndOr = store.get("toggle_filter").name;
    dataOr = store.get("data-or").name;
    dataAnd = store.get("data-and").name;
  } catch (error) {}

  if (currentAndOr == "AND") {
    sliderButton = `
        <div class="slider round">                
                <span class="off">AND</span>
                <span class="on">OR</span>                
              </div>`;
  } else {
    sliderButton = `
        <div class="slider round">              
                <span class="off">OR</span>
                <span class="on">AND</span>  
              </div>`;
  }

  mountSlider = `<div style="position:absolute; margin-left:10px; margin-top:-10px;">
  <h3>${params.config.default_icon} <span style="font-family: ${params.config.table_font_family}; font-weight: normal;"> ${params.config.title_graphic}</span></h3>
  </div>      
  <div style="position:relative; float:right; right:30px;margin-top:10px;" id="toggle_filter"
    data-condition="${currentAndOr}" 
    data-or="${dataOr}"
    data-and="${dataAnd}"      
    >
    <label class="switch">
    <input type="checkbox" id="togBtn">
    ${sliderButton}
    </label>
  </div>      
  `;

  return mountSlider;
}
