cc.Class({
    extends: cc.Component,

    properties: {
        _mirrorTarget: null,
        _mirror : null,
        _removing: false,
    },

    init: function (mirrorTarget,mirror) {
        this._mirrorTarget = mirrorTarget;
        this._mirror = mirror;
        this._mirrorTarget.on('leave-mirror',this.onLeaveMirror,this);
        this._mirrorTarget.on('before-destroy',this.onBeforeDestroy,this);
    },

    onLeaveMirror: function(e){//wait
        if(e.detail == this._mirror.name){
            if(!this._removing){
                this._removing = true;
                this.node.destroy();
            }
        }
    },

    onBeforeDestroy: function(){
        //this.node.emit('before-destroy');
        this.node.destroy();
    },

    onDestroy: function(){
        this.node.emit('before-destroy');
    },


    update: function(){
        if(this._mirrorTarget){
            this.node.position = cc.pAdd(this._mirror.position,cc.pSub(this._mirror.position,this._mirrorTarget.position));
        }
    }

});
