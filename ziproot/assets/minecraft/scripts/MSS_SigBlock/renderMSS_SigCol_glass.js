var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.net.minecraft.tileentity);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.net.minecraft.command.server);
importPackage(Packages.net.minecraft.init);
importClass(java.util.HashMap);
importPackage(Packages.jp.ngt.rtm.electric);

var ErrorData = new HashMap();

function init(par1, par2) {
    base = renderer.registerParts(new Parts("obj1"));
    pt0 = renderer.registerParts(new Parts("0"));
    pt1 = renderer.registerParts(new Parts("1"));
    pt2 = renderer.registerParts(new Parts("2"));
    pt3 = renderer.registerParts(new Parts("3"));
    pt4 = renderer.registerParts(new Parts("4"));
    pt5 = renderer.registerParts(new Parts("5"));
    pt6 = renderer.registerParts(new Parts("6"));
    pt7 = renderer.registerParts(new Parts("7"));
}

function render(entity, pass, par3) {
    if (0 <= pass || pass <= 2) {
        GL11.glPushMatrix();
        base.render(renderer);
        GL11.glPopMatrix();

        if (entity === null) return;
        
        var error = ErrorData.get(entity);
        if (error === null) {
            ErrorData.put(entity, {});
            error = {};
        }

        if (error.isError) {
            if (!error.drawed) {
                var player = NGTUtil.getClientPlayer();
                var pos = [Math.floor(entity.field_145851_c), Math.floor(entity.field_145848_d), Math.floor(entity.field_145849_e)];

                NGTLog.sendChatMessage(player, "§b[EditableDepSign] §cエラーが発生しました");
                NGTLog.sendChatMessage(player, "Pos:" + pos.join(", "));
                NGTLog.sendChatMessage(player, "Info:§e" + error.info);
                if (error.hasStackTrace) {
                    //NGTLog.sendChatMessage(player, "Error:" + error.error);
                    NGTLog.sendChatMessage(player, "StackTrace:" + error.stackTrace);
                }
                NGTLog.sendChatMessage(player, "--------------------------------------");
            }
            error.drawed = true;
            ErrorData.put(entity, error);
        }
        else {
            error.drawed = false;
            error.hasStackTrace = false;
            ErrorData.put(entity, error);
        }
        //ErrorData.put(entity, error);

        try {
            // Blocks.field_150425_aM; ソウルサンド
	    // Blocks.field_150340_R;  金ブロック
	    // Blocks.field_150399_cn; 色ガラス

            //信号照会ブロック
            var delayBlockData = Blocks.field_150399_cn;
            var delayBlock = searchBlockAndMeta(entity, delayBlockData, null);
            var isDelaying = delayBlock[0] !== null;
        }




        catch (e) {
            error.isError = true;
            error.hasStackTrace = true;
            error.error = e;
            error.stackTrace = e.stack;
            error.info = "不明なエラー";
            error.command = command;
            ErrorData.put(entity, error);
        }



		switch (delayBlock[1]) {
		   case 1:
		       	GL11.glPushMatrix();
     	  		pt2.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 4:
		       	GL11.glPushMatrix();
      	 		pt3.render(renderer);
     	  		GL11.glPopMatrix();
			break;
		   case 5:
			var light = renderer.getTick(entity)*24;
			var si = NGTMath.toRadians(light);
			var rotate = NGTMath.getSin(si);
		       	GL11.glPushMatrix();
 			if(rotate > 0){
				pt5.render(renderer);
			}else{
				pt0.render(renderer);
			}
   	    		GL11.glPopMatrix();
			break;
		   case 9:
		       	GL11.glPushMatrix();
    	   		pt4.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 11:
		       	GL11.glPushMatrix();
    	   		pt7.render(renderer);
     	  		GL11.glPopMatrix();
			break;
		   case 13:
		       	GL11.glPushMatrix();
	       		pt6.render(renderer);
 	      		GL11.glPopMatrix();
			break;
		   case 14:
		       	GL11.glPushMatrix();
      	 		pt1.render(renderer);
      	 		GL11.glPopMatrix();
			break;
	 	  default:
		       	GL11.glPushMatrix();
      	 		pt0.render(renderer);
      	 		GL11.glPopMatrix();
			break;
		}
    }
}



//metadataにnullを与えると全metadataが対象になる
//返り値:[block(Block型), meta(Int型)]
function searchBlockAndMeta(entity, blockType, metadata) {
    var x = Math.floor(entity.field_145851_c);
    var y = Math.floor(entity.field_145848_d);
    var z = Math.floor(entity.field_145849_e);
    var searchMaxCount = 32;//判定深さ
    var world = entity.func_145831_w();
    for (var i = 1; i <= searchMaxCount; i++) {
        var block = world.func_147439_a(x, y - i, z);
        if (block === blockType) {
            if (metadata !== null) {
                if (world.func_72805_g(x, y - i, z) === metadata) return [block, world.func_72805_g(x, y - i, z)];
            }
            return [block, world.func_72805_g(x, y - i, z)];
        }
    }
    return [null, 0];
}

function searchTileEntity(entity, typeName) {
    var x = Math.floor(entity.field_145851_c);
    var y = Math.floor(entity.field_145848_d);
    var z = Math.floor(entity.field_145849_e);
    var searchMaxCount = 32;//判定深さ
    var world = entity.func_145831_w();
    for (var i = 1; i <= searchMaxCount; i++) {
        var block = world.func_147438_o(x, y - i, z);
        if (block instanceof typeName) return block;
    }
    return null;
}