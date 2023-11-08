//import { setColor } from "../../caracteristica_enviada/functions/index";

export function html_table(d, params, count, max) {
  let html = "";
  let td = "";
  let appendTitle = "";
  let color = params.config.color_table;

  if (count == 0) {
    appendTitle = `<div style="position:absolute; margin-top:-25px; left:0; margin-left:10px;">${params.config.thead_title_1}</div>`;
  }

  html = `<td width="110">${appendTitle}<div>${d.dimension}</div></td>`;

  td = td + createTD(params, max, d, count, "");

  return html + td;
}

function createTD(params, max, d, counter = 1, percentString = "") {
  let appendTitle = "";
  let width = params.width;
  let margin = params.margin;
  let dimension = d.dimension;
  let measure = d.measure;
  let percent = (d.measure / max) * 100;
  let scale = percent < 5 ? 5 : percent;
  scale = scale > 100 ? 100 : scale;

  let selected_color = d.color;

  try {
    dimension = JSON.stringify(dimension);
  } catch (error) {}

  try {
    measure = measure.toFixed(2);
  } catch (error) {}

  if (counter == 0) {
    appendTitle = `<div style="position:absolute; margin-top:-20px; left:0; margin-left:0px;">${params.config.thead_title_2}</div> `;
  }

  let td = `
    <td style="position:relative"> 
          ${appendTitle} 
        <div  
        style="margin-right:5px; float:left; border-radius:0px 7px 7px 0px; height:25px; width:${scale}%; background:${selected_color}" 
        data-value="${dimension}">
        </div>   
    </td>  
    <td align="right" width="70">
        <div style="overflow:hidden;margin-top: 8px;"> 
          ${Intl.NumberFormat("pt-BR").format(measure)}${percentString}
        </div>  
    </td>   
    `;

  return td;
}
