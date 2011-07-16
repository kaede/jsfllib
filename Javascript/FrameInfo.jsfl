﻿fl.runScript(fl.configURI+"Javascript/TimelineUtil.jsfl");FrameInfo = function(timeline,layerIndex,frameIndex){	this.timeline = timeline;	this.layerIndex = layerIndex;	this.frameIndex = frameIndex;}FrameInfo.prototype = {	getTimeline:function(){		return this.timeline	},	getLayer:function(){		return this.timeline.layers[this.layerIndex]	},	getFrame:function(){		return this.getLayer().frames[this.frameIndex]	},	convertXML:function(){		return <timeline>			<layer index={this.layerIndex} name={this.getLayer().name}>				<frame index={this.frameIndex} name={this.getFrame().name}>					<actionScript>{this.getFrame().actionScript}</actionScript>				</frame>			</layer>		</timeline>	}}/**	TimelineUtilを拡張して選択中のFrameInfoを取得する**/TimelineUtil.getSelectedFrameInfo = function(timeline,isStarframe,isEndframe){	timeline = timeline || fl.getDocumentDOM().getTimeline();	var arr = timeline.getSelectedFrames();	if(!arr || !arr.length)return null;	var layers = timeline.layers;	var frames = [];	for(var i=0;i<arr.length;i+=3){		var k = arr[i]//レイヤーindex		var f = arr[i+1];//選択範囲先頭のフレームindex		var l = arr[i+2];//選択範囲最後尾のフレームindex				for(f;f<l;f++){//選択範囲の中でループ処理						var fi = new FrameInfo(timeline,k,f);			var layer = fi.getLayer();//レイヤー			var frame = fi.getFrame();			if(!frame)continue;			if((!isStarframe && !isEndframe) || 			   (isStarframe && frame.startFrame == f) || 			   (isEndframe && layer.frameCount-1 == f)){				frames.push(fi);			}		}	}	return frames}