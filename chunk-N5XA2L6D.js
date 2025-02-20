import{e as I}from"./chunk-LGAQXJCQ.js";import{I as c,L as d,M as u,R as _,Va as w,X as v,ab as C,f as n,fb as g,gb as y,i as s,mb as b,r as h,s as f,tb as S,vb as k}from"./chunk-XY7HJDFI.js";var M={formId:"carplace",title:"Carplace",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill carplace title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill carplace description"},{name:"Label",value:"Description"}]}]};var x=(()=>{class i extends y{constructor(){super({name:"carplace"})}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275prov=h({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var m=(()=>{class i{constructor(r,e,t,o,l){this._translate=r,this._carplaceService=e,this._alert=t,this._form=o,this._core=l,this.columns=["name","description"],this.form=this._form.getForm("carplace",M),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._carplaceService.setPerPage.bind(this._carplaceService),allDocs:!1,create:()=>{this._form.modal(this.form,{label:"Create",click:(a,p)=>n(this,null,function*(){p(),this._preCreate(a),yield s(this._carplaceService.create(a)),this.setRows()})})},update:a=>{this._form.modal(this.form,[],a).then(p=>{this._core.copy(p,a),this._carplaceService.update(a)})},delete:a=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this carplace?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>n(this,null,function*(){yield s(this._carplaceService.delete(a)),this.setRows()})}]})},buttons:[{icon:"cloud_download",click:a=>{this._form.modalUnique("carplace","url",a)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this._page=1,this.setRows()}setRows(r=this._page){this._page=r,this._core.afterWhile(this,()=>{this._carplaceService.get({page:r}).subscribe(e=>{this.rows.splice(0,this.rows.length),this.rows.push(...e)})},250)}_bulkManagement(r=!0){return()=>{this._form.modalDocs(r?[]:this.rows).then(e=>n(this,null,function*(){if(r)for(let t of e)this._preCreate(t),yield s(this._carplaceService.create(t));else{for(let t of this.rows)e.find(o=>o._id===t._id)||(yield s(this._carplaceService.delete(t)));for(let t of e){let o=this.rows.find(l=>l._id===t._id);o?(this._core.copy(t,o),yield s(this._carplaceService.update(o))):(this._preCreate(t),yield s(this._carplaceService.create(t)))}}this.setRows()}))}}_preCreate(r){delete r.__created}static{this.\u0275fac=function(e){return new(e||i)(c(b),c(x),c(g),c(k),c(C))}}static{this.\u0275cmp=d({type:i,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Places",3,"columns","config","rows"]],template:function(e,t){e&1&&v(0,"wtable",0),e&2&&_("columns",t.columns)("config",t.config)("rows",t.rows)},dependencies:[S],encapsulation:2})}}return i})();var P=[{path:"",component:m},{path:":car_id",component:m}],E=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=u({type:i})}static{this.\u0275inj=f({imports:[w.forChild(P),I]})}}return i})();export{E as CarplaceModule};
