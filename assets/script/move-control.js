cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        moveSpeed: 5,
    },

    onLoad: function () {
        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);

        // let manager = cc.director.getCollisionManager();
        // manager.enabled = true;
    },

    // onCollisionEnter: function(){

    // },

    // onCollisionExit: function(){

    // },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.w: {this._up = true; break;}
            case cc.KEY.s: {this._down = true; break;}
            case cc.KEY.a: {this._left = true; break;}
            case cc.KEY.d: {this._right = true; break;}
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            case cc.KEY.w: {this._up = false; break;}
            case cc.KEY.s: {this._down = false; break;}
            case cc.KEY.a: {this._left = false; break;}
            case cc.KEY.d: {this._right = false; break;}
        }
    },

    update: function(){
        if(this._left){this.node.x -= 5};
        if(this._right){this.node.x += 5};
        if(this._up){this.node.y += 5};
        if(this._down){this.node.y -= 5};
    }
});
