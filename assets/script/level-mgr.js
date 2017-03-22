cc.Class({
    extends: cc.Component,

    properties: {
        currentLevel: 0,
        _gateNum: 0,
        _sceneLoading: false,
    },

    onLoad: function () {
        this.node.on('init-gate',this.onInitGate,this);
        this.node.on('touch-gate',this.onTouchGate,this);
        this.node.on('leave-gate',this.onLeaveGate,this);
    },

    onInitGate: function(){
        this._gateNum++;
    },

    onTouchGate: function(){
        this._gateNum--;
        if(this._gateNum == 0){
            if(!this._sceneLoading){
                this._sceneLoading = true;
                let nextSceneName = 'level-' + (this.currentLevel + 1) + '-scene';
                cc.director.loadScene(nextSceneName);
            }
        }
    },

    onLeaveGate: function(){
        this._gateNum++;
    }

});
