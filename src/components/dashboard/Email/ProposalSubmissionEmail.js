
        export function constructConfirmationEmail( clientFirstName,
            secondaryClientFirstName,title, 
            outline, 
            beneficiaries, 
            benefits,
            original, 
            used) {
          
            var message =
              "<!DOCTYPE html>" +
              "<html>" +
              "  <head>" +
              '    <meta name="viewport" content="width=device-width" />' +
              '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
              "   " +
              "    <style>" +
              "      /* -------------------------------------" +
              "          GLOBAL RESETS" +
              "      ------------------------------------- */" +
              "      " +
              "      /*All the styling goes here*/" +
              "      " +
              "      img {" +
              "        border: none;" +
              "        -ms-interpolation-mode: bicubic;" +
              "        max-width: 100%; " +
              "      }" +
              "      body {" +
              "        background-color: #f6f6f6;" +
              "        font-family: sans-serif;" +
              "        -webkit-font-smoothing: antialiased;" +
              "        font-size: 14px;" +
              "        line-height: 1.4;" +
              "        margin: 0;" +
              "        padding: 0;" +
              "        -ms-text-size-adjust: 100%;" +
              "        -webkit-text-size-adjust: 100%; " +
              "      }" +
              "      table {" +
              "        border-collapse: separate;" +
              "        mso-table-lspace: 0pt;" +
              "        mso-table-rspace: 0pt;" +
              "        width: 100%; }" +
              "        table td {" +
              "          font-family: sans-serif;" +
              "          font-size: 14px;" +
              "          vertical-align: top; " +
              "      }" +
              "      /* -------------------------------------" +
              "          BODY & CONTAINER" +
              "      ------------------------------------- */" +
              "      .body {" +
              "        background-color: #f6f6f6;" +
              "        width: 100%; " +
              "      }" +
              "      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */" +
              "      .container {" +
              "        display: block;" +
              "        margin: 0 auto !important;" +
              "        /* makes it centered */" +
              "        max-width: 580px;" +
              "        padding: 10px;" +
              "        width: 580px; " +
              "      }" +
              "      /* This should also be a block element, so that it will fill 100% of the .container */" +
              "      .content {" +
              "        box-sizing: border-box;" +
              "        display: block;" +
              "        margin: 0 auto;" +
              "        max-width: 580px;" +
              "        padding: 10px; " +
              "      }" +
              "      /* -------------------------------------" +
              "          HEADER, FOOTER, MAIN" +
              "      ------------------------------------- */" +
              "      .main {" +
              "        background: #ffffff;" +
              "        border-radius: 3px;" +
              "        width: 100%; " +
              "      }" +
              "      .wrapper {" +
              "        box-sizing: border-box;" +
              "        padding: 20px; " +
              "      }" +
              "      .content-block {" +
              "        padding-bottom: 10px;" +
              "        padding-top: 10px;" +
              "      }" +
              "      .footer {" +
              "        clear: both;" +
              "        margin-top: 10px;" +
              "        text-align: center;" +
              "        width: 100%; " +
              "      }" +
              "        .footer td," +
              "        .footer p," +
              "        .footer span," +
              "        .footer a {" +
              "          color: #999999;" +
              "          font-size: 12px;" +
              "          text-align: center; " +
              "      }" +
              "      /* -------------------------------------" +
              "          TYPOGRAPHY" +
              "      ------------------------------------- */" +
              "      h1," +
              "      h2," +
              "      h3," +
              "      h4 {" +
              "        color: #000000;" +
              "        font-family: sans-serif;" +
              "        font-weight: 400;" +
              "        line-height: 1.4;" +
              "        margin: 0;" +
              "        margin-bottom: 30px; " +
              "      }" +
              "      h1 {" +
              "        font-size: 35px;" +
              "        font-weight: 300;" +
              "        text-align: center;" +
              "        text-transform: capitalize; " +
              "      }" +
              "      p," +
              "      ul," +
              "      ol {" +
              "        font-family: sans-serif;" +
              "        font-size: 14px;" +
              "        font-weight: normal;" +
              "        margin: 0;" +
              "        margin-bottom: 15px; " +
              "      }" +
              "        p li," +
              "        ul li," +
              "        ol li {" +
              "          list-style-position: inside;" +
              "          margin-left: 5px; " +
              "      }" +
              "      a {" +
              "        color: #3498db;" +
              "        text-decoration: underline; " +
              "      }" +
              "      /* -------------------------------------" +
              "          BUTTONS" +
              "      ------------------------------------- */" +
              "      .btn {" +
              "        box-sizing: border-box;" +
              "        width: 100%; }" +
              "        .btn > tbody > tr > td {" +
              "          padding-bottom: 15px; }" +
              "        .btn table {" +
              "          width: auto; " +
              "      }" +
              "        .btn table td {" +
              "          background-color: #ffffff;" +
              "          border-radius: 5px;" +
              "          text-align: center; " +
              "      }" +
              "        .btn a {" +
              "          background-color: #ffffff;" +
              "          border: solid 1px #3498db;" +
              "          border-radius: 5px;" +
              "          box-sizing: border-box;" +
              "          color: #3498db;" +
              "          cursor: pointer;" +
              "          display: inline-block;" +
              "          font-size: 14px;" +
              "          font-weight: bold;" +
              "          margin: 0;" +
              "          padding: 12px 25px;" +
              "          text-decoration: none;" +
              "          text-transform: capitalize; " +
              "      }" +
              "      .btn-primary table td {" +
              "        background-color: #3498db; " +
              "      }" +
              "      .btn-primary a {" +
              "        background-color: #3498db;" +
              "        border-color: #3498db;" +
              "        color: #ffffff; " +
              "      }" +
              "      /* -------------------------------------" +
              "          OTHER STYLES THAT MIGHT BE USEFUL" +
              "      ------------------------------------- */" +
              "      .last {" +
              "        margin-bottom: 0; " +
              "      }" +
              "      .first {" +
              "        margin-top: 0; " +
              "      }" +
              "      .align-center {" +
              "        text-align: center; " +
              "      }" +
              "      .align-right {" +
              "        text-align: right; " +
              "      }" +
              "      .align-left {" +
              "        text-align: left; " +
              "      }" +
              "      .clear {" +
              "        clear: both; " +
              "      }" +
              "      .mt0 {" +
              "        margin-top: 0; " +
              "      }" +
              "      .mb0 {" +
              "        margin-bottom: 0; " +
              "      }" +
              "      .preheader {" +
              "        color: transparent;" +
              "        display: none;" +
              "        height: 0;" +
              "        max-height: 0;" +
              "        max-width: 0;" +
              "        opacity: 0;" +
              "        overflow: hidden;" +
              "        mso-hide: all;" +
              "        visibility: hidden;" +
              "        width: 0; " +
              "      }" +
              "      .powered-by a {" +
              "        text-decoration: none; " +
              "      }" +
              "      hr {" +
              "        border: 0;" +
              "        border-bottom: 1px solid #f6f6f6;" +
              "        margin: 20px 0; " +
              "      }" +
              "      /* -------------------------------------" +
              "          RESPONSIVE AND MOBILE FRIENDLY STYLES" +
              "      ------------------------------------- */" +
              "      @media only screen and (max-width: 620px) {" +
              "        table[class=body] h1 {" +
              "          font-size: 28px !important;" +
              "          margin-bottom: 10px !important; " +
              "        }" +
              "        table[class=body] p," +
              "        table[class=body] ul," +
              "        table[class=body] ol," +
              "        table[class=body] td," +
              "        table[class=body] span," +
              "        table[class=body] a {" +
              "          font-size: 16px !important; " +
              "        }" +
              "        table[class=body] .wrapper," +
              "        table[class=body] .article {" +
              "          padding: 10px !important; " +
              "        }" +
              "        table[class=body] .content {" +
              "          padding: 0 !important; " +
              "        }" +
              "        table[class=body] .container {" +
              "          padding: 0 !important;" +
              "          width: 100% !important; " +
              "        }" +
              "        table[class=body] .main {" +
              "          border-left-width: 0 !important;" +
              "          border-radius: 0 !important;" +
              "          border-right-width: 0 !important; " +
              "        }" +
              "        table[class=body] .btn table {" +
              "          width: 100% !important; " +
              "        }" +
              "        table[class=body] .btn a {" +
              "          width: 100% !important; " +
              "        }" +
              "        table[class=body] .img-responsive {" +
              "          height: auto !important;" +
              "          max-width: 100% !important;" +
              "          width: auto !important; " +
              "        }" +
              "      }" +
              "      /* -------------------------------------" +
              "          PRESERVE THESE STYLES IN THE HEAD" +
              "      ------------------------------------- */" +
              "      @media all {" +
              "        .ExternalClass {" +
              "          width: 100%; " +
              "        }" +
              "        .ExternalClass," +
              "        .ExternalClass p," +
              "        .ExternalClass span," +
              "        .ExternalClass font," +
              "        .ExternalClass td," +
              "        .ExternalClass div {" +
              "          line-height: 100%; " +
              "        }" +
              "        .apple-link a {" +
              "          color: inherit !important;" +
              "          font-family: inherit !important;" +
              "          font-size: inherit !important;" +
              "          font-weight: inherit !important;" +
              "          line-height: inherit !important;" +
              "          text-decoration: none !important; " +
              "        }" +
              "        #MessageViewBody a {" +
              "          color: inherit;" +
              "          text-decoration: none;" +
              "          font-size: inherit;" +
              "          font-family: inherit;" +
              "          font-weight: inherit;" +
              "          line-height: inherit;" +
              "        }" +
              "        .btn-primary table td:hover {" +
              "          background-color: #34495e !important; " +
              "        }" +
              "        .btn-primary a:hover {" +
              "          background-color: #34495e !important;" +
              "          border-color: #34495e !important; " +
              "        } " +
              "      } " +
              "      .header {" +
              "  overflow: hidden;" +
              "  background-color: #084183;" +
              "  padding: 20px 10px;" +
              "}" +
              "" +
              ".cis-text {" +
              "    padding-left: 60px;" +
              "    padding-top: 25px; " +
              "}" +
              "" +
              ".uom-image {" +
              "    width: 90px;" +
              "    height: 90px;" +
              "    padding-right: 30px;" +
              "}" +
              "" +
              "/* Style the header links */" +
              ".header a {" +
              "  float: left;" +
              "  color: white;" +
              "  text-align: center;" +
              "  padding: 12px;" +
              "  text-decoration: none;" +
              "  font-size: 18px;" +
              '  font-family: "Arial", Helvetica, sans-serif; ' +
              "  line-height: 25px;" +
              "  border-radius: 4px;" +
              "" +
              "" +
              "}" +
              "" +
              "/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */" +
              ".header a.logo {" +
              "  font-size: 25px;" +
              "  font-weight: bold;" +
              "}" +
              "" +
              "/* Change the background color on mouse-over */" +
              ".header a:hover {" +
              "  background-color: #ddd;" +
              "  color: black;" +
              "}" +
              "" +
              "/* Style the active/current link*/" +
              ".header a.active {" +
              "  background-color: dodgerblue;" +
              "  color: white;" +
              "}" +
              "" +
              "/* Float the link section to the right */" +
              ".header-right {" +
              "  float: right;" +
              "}" +
              "" +
              "/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */" +
              "@media screen and (max-width: 500px) {" +
              "  .header a {" +
              "    float: none;" +
              "    display: block;" +
              "    text-align: left;" +
              "  }" +
              "  .header-right {" +
              "    float: none;" +
              "  }" +
              "}" +
              "    </style>" +
              "  </head> " +
              "" +
              '  <div class="header">' +
              '  <a href="#default" class="logo">' +
              "    <div>" +
              '<img class="uom-image" src="https://brandhub.unimelb.edu.au/guidelines/logos/04_Logo_Vertical-Housed.jpg" align="left" /></div>' +
              "" +
              '<div class="cis-text" ><center>CIS Project Management System</center></div></a>' +
              " " +
              "</div>" +
              "" +
              "" +
              "" +
              '  <body class="">' +
              "" +
              '    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">' +
              "      <tr>" +
              "        <td> </td>" +
              '        <td class="container">' +
              '          <div class="content">' +
              "" +
              "            <!-- START CENTERED WHITE CONTAINER -->" +
              '            <table role="presentation" class="main">' +
              "" +
              "              <!-- START MAIN CONTENT AREA -->" +
              "              <tr>" +
              '                <td class="wrapper">' +
              '                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">' +
              "                    <tr>" +
              "                      <td>" +
              "                        <p>Hi " +
              clientFirstName +
              " and " +
              secondaryClientFirstName +
              ",</p>" +
              "                        <p>Welcome to the University of Melbourne Software Engineering Projects Scheme. Your proposal has been successfully submitted. We will be reviewing your proposal in the upcoming days and you will expect to hear an outcome in the" +
              "         next few days. </p>" +
              '                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">' +
              "                          <tbody>" +
              "                            <tr>" +
              '                              <td align="left">' +
              '                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">' +
              "                                 " +
              "                                </table>" +
              "                              </td>" +
              "                            </tr>" +
              "                          </tbody>" +
              "                        </table>" +
              "                        " +
              "                        <p>In the meantime, here is a quick summary of your proposal. </p>" +
              "                       <p> <b>Title - </b>" +
              title +
              "</p> " +
              "                         <p> <b>Outline </b>" +
              outline +
              "</p> " +
              " " +
              "   <p> <b>Beneficiaries - </b>" +
              beneficiaries +
              "</p> " +
              " " +
              "   <p> <b>Benefits of end product - </b>" +
              benefits +
              "</p>  " +
              "     <p> <b>Originality - </b>" +
              original +
              "</p> " +
              "" +
              "  <p> <b>End product use - </b>" +
              used +
              "</p> " +
              "<p>Regards,</p>" +
              "<p>CIS Project Management Team </p>" +
              "                      </td>" +
              "                    </tr>" +
              "                  </table>" +
              "                </td>" +
              "              </tr>" +
              "" +
              "            <!-- END MAIN CONTENT AREA -->" +
              "            </table>" +
              "            <!-- END CENTERED WHITE CONTAINER -->" +
              "" +
              "            <!-- START FOOTER -->" +
              '            <div class="footer">' +
              '              <table role="presentation" border="0" cellpadding="0" cellspacing="0">' +
              "                <tr>" +
              '                  <td class="content-block">' +
              '                    <span class="apple-link">This is an automated email. </span>' +
              "                    <br> Please do not reply to this email. " +
              "                  </td>" +
              "                </tr>" +
              "                <tr>" +
              "                 " +
              "                </tr>" +
              "              </table>" +
              "            </div>" +
              "            <!-- END FOOTER -->" +
              "" +
              "          </div>" +
              "        </td>" +
              "        <td> </td>" +
              "      </tr>" +
              "    </table>" +
              "  </body>" +
              "</html>";
          
            return message;
          }
          