cc.Class({
    extends: cc.Component,

    properties: {
        _currentTouchMirror: null,
        //mirrorNum: 5,
        mirrorPrefab: cc.Prefab,
        dropable: true,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.systemEvent.on('keyup',this.onKeyUp,this)
    },

    onKeyUp: function(e){
        if(e.keyCode == cc.KEY.space){
                this.onSpace();
        }
    },

    onSpace: function(){
        if(this._currentTouchMirror){
            //pick
            //this._currentTouchMirror.emit('pick');
            this._currentTouchMirror.destroy();
            this._currentTouchMirror = null;
            //this.mirrorNum++;
        }else{
            //drop
            if(this.mirrorNum == 0){return};
            if(!this.dropable){return;}
            let mirror = cc.instantiate(this.mirrorPrefab);
            this.node.parent.addChild(mirror);
            mirror.position = this.node.position;
            mirror.name = 'mirror' + Date.now();
            //this.mirrorNum--;
            //this._currentTouchMirror = mirror;
        }
    },


    onCollisionEnter: function(other,self){
        if(other.node.group == 'mirror-core'){
            this._currentTouchMirror = other.node.parent;
        }
        else if(other.node.group == 'mirror'){
            this.dropable = false;
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'mirror-core'){
            if(other.node.parent == this._currentTouchMirror){
                this._currentTouchMirror = null;
            }
        }
        else if(other.node.group == 'mirror'){
            this.dropable = true;
        }
    }
});
