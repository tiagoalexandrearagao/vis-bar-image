export function head(element, css) {
  var container = element.appendChild(document.createElement("div"));
  container.id = "chart";

  const style = document.createElement("style");

  style.innerHTML = css;

  document.head.appendChild(style);

  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.crossorigin = "anonymous";
  link.referrerpolicy = "no-referrer";
  document.head.appendChild(link);
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css";
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

  return container;
}
