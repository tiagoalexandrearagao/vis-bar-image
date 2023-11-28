export function css(config, element) {
  return `
      .material-symbols-outlined {
        top: 3px;
        position: relative;
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
      }
      html: {
        height: 110%;
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
        width:100%;
        text-align:center;
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
      table > tr:hover {
        cursor: pointer;   
        background:  ${config.value_background_selected} ;
        color: ${config.value_color_selected} ;
      }  
      #chart{
        position: absolute;
        margin-top: ${config.config.top_margin};
        overflow-y: scroll;
        overflow-x: hidden;
        width: ${
          element.clientWidth - config.left_margin - config.right_margin
        }; 
        height: ${
          element.clientHeight - config.top_margin - config.bottom_margin
        };;
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
        width:100%; 
      }
      `;
}
