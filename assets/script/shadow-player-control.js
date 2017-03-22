cc.Class({
    extends: cc.Component,

    properties: {
        _mirrorTarget: null,
        _mirror : null,
    },

    init: function (mirrorTarget,mirror) {
        this._mirrorTarget = mirrorTarget;
        this._mirror = mirror;
        this._mirrorTarget.on('leave-mirror',this.onLeaveMirror,this)
    },

    onLeaveMirror: function(e){
        if(e.detail == this._mirror.name){
            
        }
    },

    update: function(){
        if(this._mirrorTarget){
            this.node.position = cc.pAdd(this._mirror.position,cc.pSub(this._mirror.position,this._mirrorTarget.position));
        }
    }

});
