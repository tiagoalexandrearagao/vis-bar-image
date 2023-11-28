export function css(config) {
  return `
      html: {
        height: 100%;
      }
      body {
        overflow: hidden !important;
      } 
      #title_chart{
        position:absolute; 
        margin-left: 10px; 
        margin-top: -10px;
      }  
      .no-content{
        width: 100%;
        text-align: center;
      }
      .no-content > h5{
        font-family: 'Quicksand', sans-serif; 
        font-weight: normal; 
        color:#ababab
      }  
      *{
          scrollbar-width: auto;
          scrollbar-color: #878787 #FFFFFF;
      }  
      *::-webkit-scrollbar{
          width: 9px;
      }      
      *::-webkit-scrollbar-track{
          background: #FFFFFF;
      }      
      *::-webkit-scrollbar-thumb{
          background-color: #878787;
          border-radius: 22px;
          border: 2px solid #FFFFFF;
      }
      table > tr {        
        background: #fff; ;
        color: ${config.font_color};
        padding-left: 0px;
      }          
      table > tr:hover {
        cursor: pointer;   
        color: ${config.mouse_hover_color};
        background:  ${config.mouse_hover_background};
        padding-left:12px;
      }  
      #chart-content{
        position: absolute;
        margin-top: ${config.top_margin}px;
        margin-left: ${config.left_margin}px;
        margin-right: ${config.right_margin}px;
        overflow-y: scroll;
        overflow-x: hidden;
        width: ${config.width_wrapper}%; 
        height: ${config.height_wrapper}%;
      }
      #table-main{
        font-size: ${config.font_size}px;
        font-family: ${config.font_family};
        font-weight: ${config.font_weight};
        color: ${config.font_color};      
        width: 97%; 
      }
      `;
}
