YUI.add("moodle-atto_eexcesseditor-button",function(e,t){e.namespace("M.atto_eexcesseditor").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{selectedRec:[],citationStyles:[],initializer:function(){var e=this;e.citationStyles=this.get("citStyles"),window.console.log("that.citationStyles"),window.console.log(e.citationStyles),this.addButton({icon:"icon",iconComponent:"atto_eexcesseditor",buttonName:"eexcesseditor",callback:this.insertCit}),window.addEventListener("message",function(t){t.data.event=="eexcess.selectionChanged"?(e.selectedRec=[],e.selectedRec=t.data.selected):t.data.event=="eexcess.queryTriggered"?e.selectedRec=[]:t.data.event=="eexcess.linkItemClicked"?(window.console.log("atto plugin received clicked link: "+t.data.data.id),e.selectedRec=[t.data.data],e.requireCitations()):t.data.event=="eexcess.linkImageClicked"?(window.console.log("atto plugin received image: "+t.data.data.id),e.selectedRec=[t.data.data],e.insertImage()):t.data.event=="eexcess.screenshot"&&(window.console.log("atto plugin received screenshot: "+t.data.data),e.insertScreenshot(t.data.data))}),this.get("host").editor.on("key",function(){var t=e.getText();window.console.log('Querying for text: "'+t+'"'),window.postMessage({event:"eexcess.paragraphEnd",text:e.getText()},"*")},"enter")},insertCit:function(){this.citationStyles=="lnk"?this.insertLink():this.citationStyles=="img"?this.insertImage():this.requireCitations()},hideDashboard:function(){var e=document.getElementById("eexcess_container");e.style.visibility="hidden",document.getElementById("eexcess_button").className="sym-eexcess"},showDashboard:function(){var e=document.getElementById("eexcess_container");e.style.visibility="visible"},insertCitationToEditor:function(e){var t=this.get("host");window.console.log("got to insert: "+e),this.hideDashboard(),t.focus(),t.insertContentAtFocusPoint(e+"<br/>")},insertScreenshot:function(e){window.console.log("imagesrc"),window.console.log(e);var t="<img src='"+e+"'/>";this.insertCitationToEditor(t)},insertLink:function(){var e=this.selectedRec;this.lastUsedCitationStyle="insertLink";if(!e.length)return window.console.log("Nothing is selected"),!1;for(var t=0;t<e.length;t++){var n=e[t],r='<a href ="'+n.uri+'" target="_blank">'+n.title+"</a> ";this.insertCitationToEditor(r)}},insertImage:function(){var e=this.selectedRec;if(!e.length)return window.console.log("Nothing is selected"),!1;for(var t=0;t<e.length;t++){var n=window.document.createElement("img"),r=e[t];n.src=r.previewImage;if(n.src!==r.previewImage){var i=e[t],s='<a href =""'+i.uri+">"+i.title+"</a> ";this.insertCitationToEditor(s)}else this.insertCitationToEditor(n.outerHTML),window.console.log(n)}},requireCitations:function(){var e=this.citationStyles;if(!this.selectedRec.length)return window.console.log("Nothing is selected"),!1;var t=this;require(["local_eexcess/citationBuilder"],function(n){var r=t.parseRecToCitation(t.selectedRec),i=null;t.lastUsedCitationStyle=e,i=new n(r,undefined,e),t.insertCitationToEditor(i)})},parseRecToCitation:function(e){var t={};for(var n=0;n<e.length;n++){var r=e[n],i=typeof r.id=="undefined"?"":r.id,s=typeof r.collectionName=="undefined"?"":r.collectionName,o=typeof r.uri=="undefined"?"":r.uri,u=typeof r.title=="undefined"?"":r.title,a=typeof r.creator=="undefined"?"":r.creator,f=typeof r.facets.year=="undefined"?"":r.facets.year,l={id:i,"container-title":s,URL:o,title:u,author:[{family:a}],issued:{"date-parts":[[f]]}};t[l.id]=l}return t},getText:function(){var e=this.get("host"),t=this.getNodesUntilCursor(e.editor.getDOMNode()),n=null;for(var r=t.childNodes.length-1;r>-1;r--){var i=t.childNodes[r];i.textContent.length>0&&(n=i.textContent,r=-1)}return n},getNodesUntilCursor:function(e){var t=0;if(typeof window.getSelection!="undefined"){var n=window.getSelection().getRangeAt(0),r=n.cloneRange();return r.selectNodeContents(e),r.setEnd(n.endContainer,n.endOffset),t=r.toString().length,r.cloneContents()}if(typeof document.selection!="undefined"&&document.selection.type!="Control"){var i=document.selection.createRange(),s=document.body.createTextRange();return s.moveToElementText(e),s.setEndPoint("EndToEnd",i),t=s.text.length,s.cloneContents()}}},{ATTRS:{citStyles:{value:!1}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
