const Parser = require("./parser");

module.exports = class Formatter {
  static convertJsonToSoapRequest(jsonArguments) {
    let soapBody = Parser.parseJSONBodyToXML(jsonArguments);

    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wel="http://localhost/soap/api/WelcomePost">
        <soapenv:Header/>
        <soapenv:Body>
          <wel:GetPostRequest>
            ${soapBody}
          </wel:GetPostRequest>
        </soapenv:Body>
      </soapenv:Envelope>`;
  }
};