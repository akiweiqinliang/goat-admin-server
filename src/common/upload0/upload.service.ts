import { Injectable } from "@nestjs/common";
import * as upyun from "upyun";

const service = new upyun.Service(
  "http://v0.api.upyun.com/image-goat",
  "aki0",
  "ufI0oICqlZaw29Jsdb1kFJXernKgR9St",
);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require("crypto");
// import axios from "axios";
// import { HttpService } from "@nestjs/axios";
// import * as FormData from "form-data";

@Injectable()
export class UpYunService {
  // private client: any;
  private readonly bucket: string;
  private readonly username: string;
  private readonly password: string;
  private upyunUrl: string;
  constructor() {
    this.bucket = "image-goat"; // 空间名
    this.username = "aki0"; // 操作员
    this.password = "ufI0oICqlZaw29Jsdb1kFJXernKgR9St"; // 密码
    this.upyunUrl = "http://v0.api.upyun.com/";
  }
  // MD5
  // MD5(value): string {
  //   return crypto.createHash("md5").update(value).digest("hex");
  // }
  // base64(value): string {
  //   return Buffer.from(value).toString("base64");
  // }
  // hmacsha1(secret, value): string {
  //   return crypto
  //     .createHmac("sha1", secret)
  //     .update(value, "utf-8")
  //     .digest()
  //     .toString("base64");
  // }
  getSignHeader(
    method: string,
    uri: string,
    date: string,
    contentMd5 = null,
  ): any {
    const signStr = `${method}&${uri}&${date}&${contentMd5}`;
    const sign = crypto
      .createHmac("sha1", this.password)
      .update(signStr)
      .digest("base64");
    const authorization = `UPYUN ${this.username}:${sign}`;
    return {
      Authorization: authorization,
      Date: date,
      "Content-MD5": contentMd5,
    };
  }
  async uploadFile(file: any, fileName: string): Promise<object> {
    const filePath = "src/upload/images/" + fileName; //  要上传文件的本地路径
    const client = new upyun.Client(
      service,
      this.getSignHeader(
        "POST",
        this.upyunUrl + this.bucket,
        new Date().toDateString(),
      ),
    );
    // console.log(result);
    return await client.putFile("/image/upload", filePath, {});
    // // const date = new Date().toString();
    // const fileName = fileName0;
    // const method = "PUT";
    // const expiration = ((Date.now() / 1000) >>> 0) + 30 * 60;
    // // poicy
    // const policy = this.base64(
    //   JSON.stringify({
    //     bucket: this.bucket,
    //     "save-key": `/${fileName}{.suffix}`,
    //     expiration: expiration,
    //   }),
    // );
    // // authorization
    // const authorization =
    //   "UPYUN " +
    //   this.username +
    //   ":" +
    //   this.hmacsha1(
    //     this.MD5(this.password),
    //     method + "&/" + this.bucket + "&" + policy,
    //   );
    // const url = this.upyunUrl + this.bucket; // 替换为您要发送 POST 请求的 API 地址
    // const data = new FormData();
    // data.append("Authorization", authorization);
    // data.append("policy", policy);
    // data.append("file", file);
    // const result = await axios({
    //   url: url,
    //   method: "PUT",
    //   data: data,
    // });
    // return result.statusText;
  }
}
