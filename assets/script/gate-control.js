cc.Class({
    extends: cc.Component,

    properties: {
        duration:10,
        _blink: false,
        _leaveTimeStamp: null,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    start: function(){
        cc.find('Canvas').emit('init-gate');
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'shadow-player'){
            if(this._blink){return;}
            this._blink = true;
            this.node.color = cc.Color.GREEN;
            cc.find('Canvas').emit('touch-gate');
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'shadow-player'){
            this._leaveTimeStamp = Date.now();
        }
    },

    update: function(){
        if(this._blink && this._leaveTimeStamp){
            if(this._leaveTimeStamp + this.duration * 1000 < Date.now()){
                this._blink = false;
                cc.find('Canvas').emit('leave-gate');
                this.node.color = cc.Color.RED;
                this._leaveTimeStamp = null;
            }
        }
    },


});
