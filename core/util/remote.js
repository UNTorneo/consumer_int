const Formatter = require("./formatter");
const ApiClient = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const dotenv = require('dotenv');

dotenv.config();

const url = `http://35.237.139.95:4700/ws/WelcomePost.asmx`;
const postId = process.env.POST_ID;

module.exports = class Remote {
  static async getPost() {
    try {
      let payload = {
        "wel:postId" : postId,
      };

      const headers = {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
        },
      };

      let args = Formatter.convertJsonToSoapRequest(payload);
      let remoteResponse = await ApiClient.post(url, args, headers);
      remoteResponse = await Parser.convertXMLToJSON(remoteResponse.data);
      console.log('remoteResponse.data (JSON) :>> ', remoteResponse);
      const post = remoteResponse['SOAP-ENV:Body']['ns2:PostType'];
      delete post['$'];
      post.postId = post['ns2:postId'];
      delete post['ns2:postId'];
      post.ownerId = post['ns2:ownerId'];
      delete post['ns2:ownerId'];
      post.location = post['ns2:location'];
      delete post['ns2:location'];
      post.description = post['ns2:description'];
      delete post['ns2:description'];
      console.log('post :>> ', post);
      return post
    } catch (err) {
      throw new Error(
        `Oops something went wrong. Please try again later ${JSON.stringify(
          err
        )}`
      );
    }
  }
};