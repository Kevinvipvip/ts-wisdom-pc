import config from './config';
import qs from 'qs';
import QRCode from 'qrcodejs2'

const date_format = (date, fmt = 'yyyy.MM.dd') => {
  if (date) {
    // 如果是数字类型
    if (typeof date === 'number') {
      date = date.toString()[12] ? new Date(date) : new Date(date * 1000);
    }

    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  } else {
    return '';
  }
};

const ajax = (vue, url, data, handle_code_list = []) => {
  data = data || {};
  let token = localStorage.getItem('token') || '';
  if (data instanceof FormData) {
    data.append('token', token);
  } else {
    data.token = token;
  }

  return new Promise((resolve, reject) => {
    vue.$axios({
      method: 'post',
      url: config.api + url,
      data: data instanceof FormData ? data : qs.stringify(data),  // 如果是FormData类型则为上传文件，data原样上传
      timeout: 5000  // 请求超时时间
    }).then(res => {
      if (res.data.code === 1) {
        resolve(res.data.data)  // 接口正确则直接返回数据
      } else {
        // 如果错误码在自行处理的列表里，则reject回去
        if (handle_code_list.indexOf(res.data.code) !== -1) {
          reject(res.data)
        } else {
          switch (res.data.code) {
            case -3:  // token无效
            case -5:  // token未传
            case -6:  // token未传
              // 重新跳转授权
              // vue.$dialog.alert({
              //   message: '登录已失效',
              // }).then(() => {
              //   localStorage.clear();
              //   vue.$router.push({
              //     path: '/login',
              //     query: {
              //       url: vue.$route.path,
              //       params: vue.$route.query
              //     }
              //   });
              // });
              break;
            // case 44:
            //   vue.$toast(res.data.data);
            //   break;
            default:
              vue.$Message.error(res.data.data);
              vue.$Message.config({ duration: 3 });
              break;
          }
        }
      }
    }).catch(() => {
      vue.$Message.config({ duration: 3 });
      vue.$Message.error('网络超时');
    })
  })
};
// 处理阿里云图片路径
const aliyun_format = (obj, aliyun_field = 'pic') => {
  if (obj instanceof Array) {
    if (typeof obj[0] === 'string') {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = aliyun_empty_or(obj[i]);
      }
    } else {
      for (let i = 0; i < obj.length; i++) {
        obj[i][aliyun_field] = aliyun_empty_or(obj[i][aliyun_field]);
      }
    }
  } else if (typeof obj === 'object') {
    obj[aliyun_field] = aliyun_empty_or(obj[aliyun_field]);
  } else {
    return aliyun_empty_or(obj);
  }
};
const aliyun_empty_or = (aliyun) => {
  if (aliyun) {
    if (aliyun.indexOf('https') === 0) {
      return aliyun;
    } else {
      return config.aliyun + aliyun;
    }
  }
};

//禁止页面滑动
const stop = () => {
  var mo = function (event) {
    event.preventDefault();
  };
  document.body.style.overflow = 'hidden';
  document.addEventListener("touchmove", mo, false);//禁止页面滑动
};
//取消滚动限制
const move = () => {
  var mo = function (event) {
    event.preventDefault();
  };
  document.body.style.overflow = '';//出现滚动条
  document.removeEventListener("touchmove", mo, false);
};

// 获取最小值数组索引值
const getMinIndex = (arr) => {
  let min = arr[0].list_height;
  //声明了个变量 保存下标值
  let index = 0;
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i].list_height) {
      min = arr[i].list_height;
      index = i;
    }
  }
  return index;
};

// 初始化二维码
const initCode = (vue) => {
  vue.qrcode = new QRCode(vue.$refs.qrCode, {
    text: '',
    width: 200,
    height: 200,
    colorDark: '#333333', // 二维码颜色
    colorLight: '#ffffff', // 二维码背景色
    correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
  });
};

export default {
  date_format,//格式化时间
  aliyun_format,//阿里云图片地址补全
  ajax,//请求后台数据
  stop,//禁止页面滑动
  move,//取消滚动限制
  getMinIndex,//获取最小值数组索引值
  initCode,//初始化二维码
}
