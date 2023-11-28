export function head(element, css) {
  const style = document.createElement("style");

  style.innerHTML = css;

  document.head.appendChild(style);

  //TODO: remover após a configuração dos paineis no explore do looekr
  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.crossorigin = "anonymous";
  link.referrerpolicy = "no-referrer";
  document.head.appendChild(link);
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css";

  //Google icons
  link = document.createElement("link");
  link.rel = "stylesheet";
  document.head.appendChild(link);
  link.href =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

  //Google Fonts
  let linkFontPreConnectApis = document.createElement("link");
  linkFontPreConnectApis.rel = "preconnect";
  document.head.appendChild(linkFontPreConnectApis);
  linkFontPreConnectApis.href = "https://fonts.googleapis.com";

  let linkFontPreConnectGstatic = document.createElement("link");
  linkFontPreConnectGstatic.rel = "preconnect";
  linkFontPreConnectGstatic.crossorigin = "anonymous";
  document.head.appendChild(linkFontPreConnectGstatic);
  linkFontPreConnectGstatic.href = "https://fonts.gstatic.com";

  let linkFont = document.createElement("link");
  linkFont.type = "text/css";
  linkFont.rel = "stylesheet";
  document.head.appendChild(linkFont);
  linkFont.href =
    "https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Quicksand:wght@300;700&family=Roboto&display=swap";

  //javascript
  let linkFontAwesome = document.createElement("script");
  linkFontAwesome.crossorigin = "anonymous";
  document.head.appendChild(linkFontAwesome);
  linkFontAwesome.src = "https://kit.fontawesome.com/9e8face2b6.js";
}

export function titleChart(config) {
  let title = `<div 
  id="title_chart" 
  style="
  position: fixed; 
  margin-left: 10px; 
  margin-top: -10px;
  background: #ffffff;
  width: 100%;
  ">
    <h3 style="
    font-family: ${config.font_family_title};
    color: ${config.font_color_title};
    font-size: ${config.font_size_title}px; 
    font-weight: ${config.font_weight_title};">
    ${config.default_icon} <span> ${config.title_graphic} </span>
    </h3>
  </div> 
  `;

  return title;
}
