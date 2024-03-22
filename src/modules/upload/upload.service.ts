import { Injectable } from "@nestjs/common";
import { auth, conf, zone } from "qiniu";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const qiniu = require("qiniu");
@Injectable()
export class QiniuService {
  private readonly accessKey: string =
    "YjnR6PrUbPFgTAIr_Z6adVFp-srqT_Y745U9DPd4"; //  AK
  private readonly secretKey: string =
    "6c97iTvtCs2IpH__KMhhTlueTVNuc5EiHNnuxyjH"; //  SK
  private readonly mac: auth.digest.Mac; //  鉴权对象
  private readonly config: conf.Config;
  constructor() {
    this.mac = new auth.digest.Mac(this.accessKey, this.secretKey);
    this.config = new conf.Config();
    this.config["zone"] = zone.Zone_z0;
  }
  uptoken(bucket: string): string {
    const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket }); //  指定七牛云存储空间
    return putPolicy.uploadToken(this.mac); //  获取上传凭证
  }
  //构造上传函数
  async uploadToCloud(uptoken, key, localFile) {
    const formUploader = new qiniu.form_up.FormUploader(this.config); //  生成表单上传的类
    const putExtra = new qiniu.form_up.PutExtra(); //  生成表单提交额外参数
    return await formUploader.putFile(
      uptoken,
      key,
      localFile,
      putExtra,
      function (respErr) {
        if (respErr) {
          throw respErr;
        } else {
          console.log("upload success");
        }
      },
    );
  }
  async uploadFile(file: any, fileName: string): Promise<any> {
    const bucket = "image-goat"; //  七牛云存储空间名
    const key = "image/" + fileName; //  上传到七牛后保存的文件路径名
    const uploadToken = this.uptoken(bucket); //  获取上传凭证
    const filePath = "src/upload/images/" + fileName; //  要上传文件的本地路径
    return await this.uploadToCloud(uploadToken, key, filePath);
  }
}
