$.ajax({
  url : '//localhost:27017/admin',
  type : 'get',
  success : function(data){
    document.write(data);
  }
});