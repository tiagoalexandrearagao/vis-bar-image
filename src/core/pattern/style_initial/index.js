export function css() {
  return `
      html {
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
      *::-webkit-scrollbar-thumb {
        background-color: #ababab;
        border-radius: 10px;
        border: 3px solid #ffffff;
      }
      *::-webkit-scrollbar-track {
        background: #ffffff;
      }
      table > tr {
        cursor: pointer;
        background-color: #dedede;
      }  
      `;
}
