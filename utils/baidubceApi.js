import http from './http'

/**
 * 获取应用访问调用token 
 * @param {应用的 appKey} client_id 
 * @param {应用的 appSecret} client_secret 
 */
const _getAccessToken = (client_id, client_secret) => {
  let authUrl = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials";
  let param = "&client_id=" + client_id + "&client_secret=" + client_secret;
  let url = authUrl + param;
  return http({
    url: url,
    method: 'post',
    header: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
};

/**
 * 该请求用于识别果蔬类食材，即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片中的果蔬食材结果。
 * @param {api访问token} token 
 * @param {图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式。注意：图片需要base64编码、去掉编码头（data:image/jpg;base64,）后，再进行urlencode} image 
 * @param {图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效。} imageUrl 
 * @param {返回预测得分top结果数，如果为空或小于等于0默认为5；如果大于20默认20} top_num 
 */
const _ingredient = (token, image, imageUrl = "", top_num = 5) => {
  let url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient?access_token=" + token;
  return http({
    url: url,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      image: image,
      top_num: top_num
    }
  })
};
/**
 * 该请求用于识别一张图片，即对于输入的一张图片（可正常解码，且长宽比较合适），输出植物识别结果。
 * @param {*} token 
 * @param {*} image 
 * @param {*} imageUrl 
 * @param {*} baike_num 用于控制返回结果是否带有百科信息，若不输入此参数，则默认不返回百科结果；若输入此参数，会根据输入的整数返回相应个数的百科信息
 */
const _lookPlant = (token, image, imageUrl = "", baike_num = 5) => {
  let url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=" + token;
  return http({
    url: url,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      image: image,
      baike_num: baike_num
    }
  })
};

/**
 * 该请求用于识别一张图片，即对于输入的一张图片（可正常解码，且长宽比较合适），输出动物识别结果。
 * @param {*} token 
 * @param {*} image 
 * @param {*} imageUrl 
 * @param {*} top_num 
 * @param {*} baike_num 
 */
const _lookAnimal = (token, image, imageUrl = "", top_num = 5,baike_num = 1) => {
  let url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=" + token;
  return http({
    url: url,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      image: image,
      top_num: top_num,
      baike_num: baike_num
    }
  })
};

export default {
  _getAccessToken,
  _ingredient,
  _lookPlant,
  _lookAnimal
}