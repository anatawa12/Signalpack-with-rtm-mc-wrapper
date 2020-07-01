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
    pt1 = renderer.registerParts(new Parts("1"));
    pt2 = renderer.registerParts(new Parts("2"));
    pt3 = renderer.registerParts(new Parts("3"));
    pt4 = renderer.registerParts(new Parts("4"));
    pt5 = renderer.registerParts(new Parts("5"));
    pt6 = renderer.registerParts(new Parts("6"));
    pt7 = renderer.registerParts(new Parts("7"));
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
            //信号照会ブロック(メタ式)
            var MetaBlock = searchBlockAndMeta(wEntity, "minecraft:soul_sand", null);
            var isMetaBlock = MetaBlock !== null;

            //信号照会ブロック(色式)
            var ColorBlock = searchBlockAndMeta(wEntity, "minecraft:stained_glass", null);
            var isColorBlock = ColorBlock !== null;
        }
        catch (e) {
            error.isError = true;
            error.hasStackTrace = true;
            error.error = e;
            error.stackTrace = e.stack;
            error.info = "不明なエラー";
            ErrorData.put(entity, error);
        }


		switch (MetaBlock ? MetaBlock.meta : 0) {
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
		   default:
			break;
		}
/*
		switch (ColorBlock[1]) {
		   case 14:
		       	GL11.glPushMatrix();
      	 		pt1.render(renderer);
      	 		GL11.glPopMatrix();
			break;
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
		   case 9:
		       	GL11.glPushMatrix();
    	   		pt4.render(renderer);
    	   		GL11.glPopMatrix();
			break;
		   case 5:
		       	GL11.glPushMatrix();
   	    		pt5.render(renderer);
   	    		GL11.glPopMatrix();
			break;
		   case 13:
		       	GL11.glPushMatrix();
	       		pt6.render(renderer);
 	      		GL11.glPopMatrix();
			break;
		   case 11:
		       	GL11.glPushMatrix();
    	   		pt7.render(renderer);
     	  		GL11.glPopMatrix();
			break;
	 	  default:
			break;
		}
*/
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
