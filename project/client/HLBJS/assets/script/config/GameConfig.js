

module.exports.init = function(globalVar){
    //游戏ID
    var GameID = globalVar.GameID = {};
    GameID.ZZMJ = 1;
    GameID.NZMJ = 2; 


    //gate服务器
    globalVar.gateServer = { ip:'192.168.198.128', port:3014};

};
