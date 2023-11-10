export function css() {
  return `
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
    /*inicio switch*/
    .switch {
      /* position: relative;*/
       display: inline-block;
       width: 68px;
       height: 16px;
   }   
   .switch input {display:none;}   
   .slider {
     position: absolute;
     cursor: pointer;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: #9e9e9e;
     -webkit-transition: .4s;
     transition: .4s;
   }   
   .slider:before {
       position: absolute;
       content: "";
       height: 12px;
       width: 12px;
       left: 7px;
       bottom: 4px;
       background-color: white;
       -webkit-transition: .4s;
       transition: .4s;
   }   
   input:checked + .slider {
     background-color:#9e9e9e;
   }   
   input:focus + .slider {
     box-shadow: 0 0 1px green;
   }   
   input:checked + .slider:before {
     -webkit-transform: translateX(41px);
     -ms-transform: translateX(41px);
     transform: translateX(41px);
   }   
   .on
   {
     display: none;
   }   
   .on, .off
   {
     color: white;
     position: absolute;
     transform: translate(-50%,-50%);
     top: 50%;
     left: 50%;
     font-size: 10px;
     font-family: Verdana, sans-serif;
   }   
   .off{
     left:48px;
   }   
   .on{
     left:30%;
   }   
   input:checked+ .slider .on
   {display: block;}   
   input:checked + .slider .off
   {display: none;}   
   /*--------- END --------*/   
   /* Rounded sliders */
   .slider.round {
     border-radius: 34px;
    }   
    .slider.round:before {
     border-radius: 50%;
    }
    /*fim switch*/
    ::-webkit-scrollbar{
      width: 10px;
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
      cursor: point;
      background-color: #dedede;
    }  
    `;
}
