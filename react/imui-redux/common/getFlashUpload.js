import {checkFileType, checkFileSize} from '@liepin/imcore/upload/checkFile';

export default function getFlashUpload(options) {
  let picshim, flashUpload, flashPicUpload;
  let uploadShim = function (fileInputId) {
    if ( typeof SWFUpload === 'undefined' ) {
      return;
    }
    $(options.iconDom).hide();
    return new SWFUpload({
      file_post_name: 'file'
      , flash_url: "//concat.lietou-static.com/dev/core/pc/v3/static/unpack_files/webim/swfupload/swfupload.swf"
      , button_placeholder_id: fileInputId
      , button_width: 24
      , button_height: 24
      , button_cls: 'webim-icons16 icons16-picture'
      , button_cursor: SWFUpload.CURSOR.HAND
      , button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT
      , file_size_limit: 10485760
      , file_upload_limit: 0
      , file_queued_handler: function(file) {
        if (this.getStats().files_queued > 1) {
          this.cancelUpload();
        }
        var checkType = {
          "jpg" : true,
          "gif" : true,
          "png" : true,
          "bmp" : true,
          'jpeg': true,
        };
        var ttype = file.type.slice(1).toLowerCase();
        // if ( !checkType[ttype] ) {
        //   alert('不支持此文件类型' + file.type);
        //   this.cancelUpload();
        // } else if ( 10485760 < file.size ) {
        //   alert('文件大小超过限制！请上传大小不超过10M的文件');
        //   this.cancelUpload();
        // } else {
          alert('send')
          options.sendImage();
          // let uploadObj = {
          //   apiUrl: WebIM.config.apiURL,
          //   flashUpload: WebIM.flashUpload
          // }

          // WebIM.utils.uploadFile.call(options.imcore._conn, uploadObj);
        //}
      }
      , file_dialog_start_handler: function () {
      }
      , upload_error_handler: function ( file, code, msg ) {
        alert('error,'+code+','+msg)
        if ( code != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
          && code != SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED
          && code != SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED ) {
            this.uploadOptions.onFileUploadError && this.uploadOptions.onFileUploadError({ type: WebIM.statusCode.WEBIM_UPLOADFILE_ERROR, msg: msg });
        }
      }
      , upload_complete_handler: function () {
        //this.setButtonText('点击上传');
      }
      , upload_success_handler: function ( file, response ) {
        //处理上传成功的回调
        alert('succ')
        try{
          var res = WebIM.utils.parseUploadResponse(response);
          res = $.parseJSON(res);
          res.filename = file.name;
          this.uploadOptions.onFileUploadComplete && this.uploadOptions.onFileUploadComplete(res);
        } catch ( e ) {
          alert('上传图片发生错误');
        }
      }
    });
  };

  //if ( !WebIM.utils.isCanUploadFileAsync && typeof uploadShim === 'function' ) {
    picshim = uploadShim(options.fileInputId);
  //}
  //提供上传接口
  flashUpload = function ( swfObj, url, options ) {
    swfObj.setUploadURL(url);
    swfObj.uploadOptions = options;
    swfObj.startUpload();
  };
  flashPicUpload = function ( url, options ) {
    flashUpload(picshim, url, options);
  };
  return flashPicUpload;
}
/*

export default function getFlashUpload(options) {
    var swfupload;

    var flashUpload = function (url) {
        swfupload.setUploadURL(url);
        swfupload.startUpload();
    };

    var startUpload = function (file) {
      let uploadObj = {
          apiUrl: WebIM.config.apiURL,
          flashUpload: flashUpload
      }

      WebIM.utils.uploadFile.call(options.imcore._conn, uploadObj);
    };
    //$(options.iconDom).hide();
    //alert($(options.iconDom).length)
    var upload = {
        shim: function (fileInputId) {
            if (!WebIM.utils.isCanUploadFile) {
                return;
            }

            //var pageTitle = document.title;
            var uploadBtn = document.getElementById(options.fileInputId);
            if (typeof SWFUpload === 'undefined' || !uploadBtn) {
                return;
            }

            return new SWFUpload({
                file_post_name: 'file'
                , flash_url: '//concat.lietou-static.com/dev/core/pc/v3/static/unpack_files/webim/swfupload/swfupload.swf'
                , button_placeholder_id: options.fileInputId
                , button_width: 24
                , button_height: 24
                //, button_cls: 'webim-icons16 icons16-picture'
                , button_cursor: SWFUpload.CURSOR.HAND
                , button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT
                , file_size_limit: 10485760
                , file_upload_limit: 0
                , file_queued_error_handler: function () {
                }
                , file_dialog_start_handler: function () {
                }
                , file_dialog_complete_handler: function () {
                }
                , file_queued_handler: function (file) {
                    if (this.getStats().files_queued > 1) {
                        this.cancelUpload();
                    }
                    if (10485760 < file.size) {
                        Demo.api.NotifyError(Demo.lan.exceed);
                        this.cancelUpload();
                    } else {
                      console.log(file)
                      startUpload(file)
                    }
                }
                , upload_error_handler: function (file, code, msg) {
                    if (code != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
                        && code != SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED
                        && code != SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED) {
                      alert('fail')
                    alert(code)
                    alert(msg)
                        // var option = {
                        //     data: Demo.lan.uploadFileFailed,
                        //     to: Demo.selected
                        // };
                        // Demo.api.addToChatRecord(option, 'txt');
                        // Demo.api.appendMsg(option, 'txt');
                    }
                }
                , upload_success_handler: function (file, response) {
                        alert('succ')
                    if (!file || !response) {
                        return;
                    }

                    var me = this;

                    try {
                        var res = WebIM.utils.parseUploadResponse(response);
                        res = JSON.parse(res);
                        if (file && !file.url && res.entities && res.entities.length > 0) {
                            file.url = ( (location.protocol != 'https:' && WebIM.config.isHttpDNS) ? Demo.conn.apiUrl : res.uri) + '/' + res.entities[0].uuid;
                        }

                        // var msg = new WebIM.message(this.filetype, Demo.conn.getUniqueId());


                        // var opt = {
                        //     body: {
                        //         type: this.filetype,
                        //         url: file.url,
                        //         filename: file.name
                        //     },
                        //     file: file,
                        //     to: Demo.selected,
                        //     roomType: Demo.selectedCate === 'chatrooms',
                        //     success: function (id) {
                        //         var option = {
                        //             data: file.url,
                        //             from: Demo.user,
                        //             to: Demo.selected
                        //         };
                        //         Demo.api.addToChatRecord(option, me.filetype);
                        //         Demo.api.appendMsg(option, me.filetype);
                        //     }
                        // };

                        // msg.set(opt);

                        // if (Demo.selectedCate === 'groups') {
                        //     msg.setGroup(Demo.groupType);
                        // } else if (Demo.selectedCate === 'chatrooms') {
                        //     msg.setGroup(Demo.groupType);
                        // }

                        // Demo.conn.send(msg.body);

                    } catch (e) {
                        // Demo.api.NotifyError('文件发送失败');
                    }
                }
            });
        }
    };

    if (!WebIM.utils.isCanUploadFileAsync && WebIM.utils.isCanUploadFile) {
        swfupload = upload.shim(options.fileInputId);
    }

    return upload;
};
*/
// export default function getFlashUpload(imcore, fileInputId, iconSendPicDom, sendImage){
//   let picshim;
//   if ( !WebIM.utils.isCanUploadFileAsync && typeof uploadShim === 'function' ) {
//     alert(fileInputId)
//     picshim = uploadShim(fileInputId);
//   }
//   //提供上传接口
//   let flashUpload = function ( swfObj, url, options ) {
//     alert(Object.keys(swfObj))
//     swfObj.setUploadURL(url);
//     swfObj.uploadOptions = options;
//     swfObj.startUpload();
//   };
//   let flashPicUpload = function ( url, options ) {
//     flashUpload(picshim, url, options);
//   };

//   function uploadShim ( fileInputId ) {
//     if ( typeof SWFUpload === 'undefined' ) {
//       return;
//     }

//     $(iconSendPicDom).hide();

//     return new SWFUpload({
//       file_post_name: 'file'
//       , flash_url: "//concat.lietou-static.com/dev/core/pc/v3/static/unpack_files/webim/swfupload/swfupload.swf"
//       , button_placeholder_id: fileInputId
//       , button_width: 24
//       , button_height: 24
//       , button_cls: 'webim-icons16 icons16-picture'
//       , button_cursor: SWFUpload.CURSOR.HAND
//       , button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT
//       , file_size_limit: 10485760
//       , file_upload_limit: 0
//       , file_queued_handler: function ( file ) {
//         if ( this.getStats().files_queued > 1 ) {
//           this.cancelUpload();
//         }
//         var ttype = file.type.slice(1).toLowerCase();
//         if (checkFileType(ttype)) {
//           imcore.handleVisibleErr('UPLOAD_FILE_TYPE_ERROR');
//           this.cancelUpload();
//         } else if (checkFileSize(file.size)) {
//           alert('文件大小超过限制！请上传大小不超过10M的文件');
//           this.cancelUpload();
//         } else {
//           alert('sendsendImage:' + file.name)
//           alert(sendImage.toString())
//           //sendImage(file.name);
//           alert('111')
//           WebIM.utils.uploadFile.call(imcore._conn, {
//               apiUrl: WebIM.config.apiURL,
//               flashUpload: flashUpload
//           });
//           return true;
//         }
//         return false;
//       }
//       , file_dialog_start_handler: function () {
//       }
//       , upload_error_handler: function ( file, code, msg ) {
//         alert('uploaderror333')
//         alert(code)
//         alert(window.WebIM.statusCode)
//         // if ( code != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
//         //   && code != SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED
//         //   && code != SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED ) {
//         //   this.uploadOptions.onFileUploadError && this.uploadOptions.onFileUploadError({ type: window.WebIM.statusCode.WEBIM_UPLOADFILE_ERROR, msg: msg });
//         // }
//         // else{
//         //   alert('unknow error')
//         // }
//       }
//       , upload_complete_handler: function () {
//         //this.setButtonText('点击上传');
//       }
//       , upload_success_handler: function ( file, response ) {
//         //处理上传成功的回调
//         alert('succss')
//         try{
//           alert('success')
//           alert(this.uploadOptions.toString())
//           var res = WebIM.utils.parseUploadResponse(response);
//           res = JSON.parse(res);
//           res.filename = file.name;
//           this.uploadOptions.onFileUploadComplete && this.uploadOptions.onFileUploadComplete(res);
//         } catch ( e ) {
//           imcore.handleVisibleErr('UPLOAD_FILE_ERROR');
//         }
//       }
//     });
//   };


//   return flashPicUpload;
// }