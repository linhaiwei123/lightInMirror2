cc.Class({
    extends: cc.Component,

    properties: {
        shadowPlayerPrefab: cc.Prefab, 
        _canvas: {
            get: function(){
                return cc.find('Canvas');
            }
        }
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        //this.node.on('pick',this.onPick,this)
    },

    // onPick: function(){
    //     this.node.removeFromParent(true);
    // },

    onCollisionEnter: function(other,self){
        if(other.node.group == "player" || other.node.group == "shadow-player"){
           //如果是自己生成的影子 加标志位 避免重复生成
           //并且要用数组存起来 当本体离开的时候，删除对应的影子
           let shadowPlayerControl = other.node.getComponent('shadow-player-control');
           if(!shadowPlayerControl || shadowPlayerControl._mirror.name != this.node.name){
           //if(other.node.mirrorName == undefined || other.node.mirrorName != this.node.name){
               let shadowPlayer = cc.instantiate(this.shadowPlayerPrefab);
               //shadowPlayer.mirrorName = this.node.name;
               this._canvas.addChild(shadowPlayer);
               shadowPlayer.getComponent('shadow-player-control').init(other.node,this.node);
          }
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == "shadow-player" || other.node.group == "player"){
            let shadowPlayerControl = other.node.getComponent('shadow-player-control');
            if(!shadowPlayerControl || shadowPlayerControl._mirror.name != this.node.name){
            //if(other.node.mirror != undefined || other.node.mirrorName == this.node.name){
                other.node.emit('leave-mirror',this.node.name);
            }
        }
    }

});
