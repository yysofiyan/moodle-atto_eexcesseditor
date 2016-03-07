YUI.add("moodle-atto_eexcesseditor-button",function(e,t){e.namespace("M.atto_eexcesseditor").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{selectedRec:[],citationStyles:!1,citStyleList:[],userID:null,respError:!1,initializer:function(){window.postMessage({event:"attoEditorOpened",data:""},"*");var e=this;e.citationStyles=this.get("defaultCitStyle");var t=this.get("citStyles");this.citStyleList=t,e.userID=this.get("userId"),e.respError=this.get("respError");var n=[];for(var r=0;r<t.length;r++){var i={text:t[r].label,callback:function(t,n){e.saveSelectedCitation(n)},callbackArgs:t[r].val};n.push(i)}n.push({text:"Insert Link",callback:function(t,n){e.saveSelectedCitation(n)},callbackArgs:"lnk"}),this.addToolbarMenu({icon:"iconcitstyles",title:"citationstyle",iconComponent:"atto_eexcesseditor",callback:function(){},items:n}),window.addEventListener("message",function(t){t.data.event==="eexcess.queryTriggered"?e.selectedRec=[]:t.data.event==="eexcess.linkItemClicked"?(e.selectedRec=[t.data.data],e.requireCitations()):t.data.event==="eexcess.linkImageClicked"?(e.selectedRec=[t.data.data],e.insertImage(),window.postMessage({event:"eexcess.log.itemCitedAsImage",data:e.selectedRec[0]},"*")):t.data.event==="eexcess.screenshot"&&e.insertScreenshot(t.data.data)}),this.get("host").editor.on("key",function(){window.postMessage({event:"eexcess.paragraphEnd",text:e.getText()},"*")},"enter")},insertCitationToEditor:function(e){var t=this.get("host");t.focus(),t.insertContentAtFocusPoint(e+"<br/>")},insertScreenshot:function(t){var n=this,r=M.cfg.wwwroot+"/lib/editor/atto/plugins/eexcesseditor/savescreen.php";e.io(r,{data:{imgdata:t},method:"POST",on:{success:function(e,t){var r="<img src='"+decodeURI(t.response)+"'/>";n.insertCitationToEditor(r)}}})},insertLink:function(){var e=this.selectedRec;this.lastUsedCitationStyle="insertLink";if(!e.length)return!1;for(var t=0;t<e.length;t++){var n=e[t],r='<a href ="'+n.uri+'" target="_blank">'+n.title+"</a> ";this.insertCitationToEditor(r)}},insertImage:function(){var e=this.selectedRec;if(!e.length)return!1;for(var t=0;t<e.length;t++){var n=window.document.createElement("img"),r=e[t];n.src=r.previewImage;if(n.src!==r.previewImage){var i=e[t],s='<a href =""'+i.uri+">"+i.title+"</a> ";this.insertCitationToEditor(s)}else this.insertCitationToEditor(n.outerHTML)}},requireCitations:function(){var e=this.citationStyles;if(!this.selectedRec.length)return!1;var t=this;if(e==="lnk")return t.insertLink(),window.postMessage({event:"eexcess.log.itemCitedAsHyperlink",data:t.selectedRec[0]},"*"),!1;require(["local_eexcess/citationBuilder"],function(n){var r=t.parseRecToCitation(t.selectedRec),i=null;t.lastUsedCitationStyle=e,i=new n(r,undefined,e),window.postMessage({event:"eexcess.log.itemCitedAsText",data:t.selectedRec[0]},"*"),t.insertCitationToEditor(i)})},parseRecToCitation:function(e){var t={};for(var n=0;n<e.length;n++){var r=e[n],i=typeof r.id=="undefined"?"":r.id,s=typeof r.collectionName=="undefined"?"":r.collectionName,o=typeof r.uri=="undefined"?"":r.uri,u=typeof r.title=="undefined"?"":r.title,a=typeof r.creator=="undefined"?"":r.creator,f=typeof r.facets.year=="undefined"?"":r.facets.year,l={id:i,"container-title":s,URL:o,title:u,author:[{family:a}],issued:{"date-parts":[[f]]}};t[l.id]=l}return t},getText:function(){var e=this.get("host"),t=this.getNodesUntilCursor(e.editor.getDOMNode()),n=null;for(var r=t.childNodes.length-1;r>-1;r--){var i=t.childNodes[r];i.textContent.length>0&&(n=i.textContent,r=-1)}return n},getNodesUntilCursor:function(e){var t=0;if(typeof window.getSelection!="undefined"){var n=window.getSelection().getRangeAt(0),r=n.cloneRange();return r.selectNodeContents(e),r.setEnd(n.endContainer,n.endOffset),t=r.toString().length,r.cloneContents()}if(typeof document.selection!="undefined"&&document.selection.type!=="Control"){var i=document.selection.createRange(),s=document.body.createTextRange();return s.moveToElementText(e),s.setEndPoint("EndToEnd",i),t=s.text.length,s.cloneContents()}},saveSelectedCitation:function(t){var n=M.cfg.wwwroot+"/lib/editor/atto/plugins/eexcesseditor/savecit.php",r=this.userID,i=this.respError;t==="lnk"?this.citationStyles=t:this.citationStyles=this.citStyleList[t].content,this.requireCitations(),e.io(n,{data:{userid:r,citstyle:t},method:"POST",on:{success:function(){i!==!1?window.alert(i):window.console.log("response")}}})}},{ATTRS:{citStyles:{value:!1},defaultCitStyle:{value:!1},userId:{value:!1},respError:{value:!1}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
