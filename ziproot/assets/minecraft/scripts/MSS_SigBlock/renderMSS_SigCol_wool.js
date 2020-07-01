var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);

importPackage(Packages.net.minecraft.tileentity);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.net.minecraft.command.server);
importPackage(Packages.net.minecraft.init);
importClass(java.util.HashMap);
importPackage(Packages.jp.ngt.rtm.electric);

//include <minecraft:mc-wrapper/all.js>

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
    pt8 = renderer.registerParts(new Parts("8"));
    pt9 = renderer.registerParts(new Parts("9"));
    pt10 = renderer.registerParts(new Parts("10"));
    pt11 = renderer.registerParts(new Parts("11"));
    pt12 = renderer.registerParts(new Parts("12"));
    pt13 = renderer.registerParts(new Parts("13"));
    pt14 = renderer.registerParts(new Parts("14"));
    pt15 = renderer.registerParts(new Parts("15"));
}

function render(entity, pass, par3) {
    var wEntity = WTileEntity.wrap(entity)
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
                var pos = [Math.floor(wEntity.x), Math.floor(wEntity.y), Math.floor(wEntity.z)];

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
            //信号照会ブロック
            var delayBlock = searchBlockAndMeta(wEntity, "minecraft:wool", null);
            var isDelaying = delayBlock !== null;
        } catch (e) {
            error.isError = true;
            error.hasStackTrace = true;
            error.error = e;
            error.stackTrace = e.stack;
            error.info = "不明なエラー";
            ErrorData.put(entity, error);
        }

		switch (delayBlock ? delayBlock.meta : 0) {
		   case 0:
		       	GL11.glPushMatrix();
     	  		pt0.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 1:
		       	GL11.glPushMatrix();
     	  		pt1.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 2:
		       	GL11.glPushMatrix();
     	  		pt2.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 3:
		       	GL11.glPushMatrix();
     	  		pt3.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 4:
		       	GL11.glPushMatrix();
      	 		pt4.render(renderer);
     	  		GL11.glPopMatrix();
			break;
		   case 5:
		       	GL11.glPushMatrix();
   	    		pt5.render(renderer);
   	    		GL11.glPopMatrix();
			break;
		   case 6:
		       	GL11.glPushMatrix();
     	  		pt6.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 7:
		       	GL11.glPushMatrix();
     	  		pt7.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 8:
		       	GL11.glPushMatrix();
     	  		pt8.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 9:
		       	GL11.glPushMatrix();
    	   		pt9.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 10:
		       	GL11.glPushMatrix();
     	  		pt10.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 11:
		       	GL11.glPushMatrix();
    	   		pt11.render(renderer);
     	  		GL11.glPopMatrix();
			break;
		   case 12:
		       	GL11.glPushMatrix();
     	  		pt12.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 13:
		       	GL11.glPushMatrix();
	       		pt13.render(renderer);
 	      		GL11.glPopMatrix();
			break;
		   case 14:
		       	GL11.glPushMatrix();
      	 		pt14.render(renderer);
      	 		GL11.glPopMatrix();
			break;
		   case 15:
		       	GL11.glPushMatrix();
     	  		pt15.render(renderer);
    	   		GL11.glPopMatrix();
			break;
	 	  default:
		       	GL11.glPushMatrix();
      	 		pt16.render(renderer);
      	 		GL11.glPopMatrix();
			break;
		}
    }
}

/**
 * @param entity {WTileEntity}
 * @param blockType {string} the id of the block
 * @param metadata {number|null} the meta to search. if null, all meta is allowed
 * @return {WBlock|null}
 */
function searchBlockAndMeta(entity, blockType, metadata) {
    var x = Math.floor(entity.x);
    var y = Math.floor(entity.y);
    var z = Math.floor(entity.z);
    var searchMaxCount = 32;//判定深さ
    var world = entity.world;
    for (var i = 1; i <= searchMaxCount; i++) {
        var block = world.getBlock(x, y - i, z);
        if (block.name === blockType) {
            if (metadata !== null) {
                if (block.meta === metadata)
                    return block;
            }
            return block;
        }
    }
    return null;
}
