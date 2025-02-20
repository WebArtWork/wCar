import{e as j}from"./chunk-LGAQXJCQ.js";import{I as c,L as f,M as u,R as _,Ra as w,Va as C,X as v,ab as g,f as n,fb as y,gb as b,i as s,mb as S,r as h,s as d,tb as k,vb as I}from"./chunk-XY7HJDFI.js";var M={formId:"carpart",title:"Carpart",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill carpart title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill carpart description"},{name:"Label",value:"Description"}]}]};var F=(()=>{class r extends b{constructor(){super({name:"carpart"})}static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var m=(()=>{class r{constructor(i,t,e,o,l,P){this._translate=i,this._carpartService=t,this._alert=e,this._form=o,this._core=l,this._router=P,this.car_id=this._router.url.includes("carpart/")?this._router.url.replace("/carpart/",""):"",this.columns=["name","description"],this.form=this._form.getForm("carpart",M),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._carpartService.setPerPage.bind(this._carpartService),allDocs:!1,create:()=>{this._form.modal(this.form,{label:"Create",click:(a,p)=>n(this,null,function*(){p(),this._preCreate(a),yield s(this._carpartService.create(a)),this.setRows()})})},update:a=>{this._form.modal(this.form,[],a).then(p=>{this._core.copy(p,a),this._carpartService.update(a)})},delete:a=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this carpart?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>n(this,null,function*(){yield s(this._carpartService.delete(a)),this.setRows()})}]})},buttons:[{icon:"cloud_download",click:a=>{this._form.modalUnique("carpart","url",a)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this._page=1,this.setRows()}setRows(i=this._page){this._page=i,this._core.afterWhile(this,()=>{this._carpartService.get({page:i,query:this.car_id?"car="+this.car_id:""}).subscribe(t=>{this.rows.splice(0,this.rows.length),this.rows.push(...t)})},250)}_bulkManagement(i=!0){return()=>{this._form.modalDocs(i?[]:this.rows).then(t=>n(this,null,function*(){if(i)for(let e of t)this._preCreate(e),yield s(this._carpartService.create(e));else{for(let e of this.rows)t.find(o=>o._id===e._id)||(yield s(this._carpartService.delete(e)));for(let e of t){let o=this.rows.find(l=>l._id===e._id);o?(this._core.copy(e,o),yield s(this._carpartService.update(o))):(this._preCreate(e),yield s(this._carpartService.create(e)))}}this.setRows()}))}}_preCreate(i){i.__created,this.car_id&&(i.car=this.car_id)}static{this.\u0275fac=function(t){return new(t||r)(c(S),c(F),c(y),c(I),c(g),c(w))}}static{this.\u0275cmp=f({type:r,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Parts",3,"columns","config","rows"]],template:function(t,e){t&1&&v(0,"wtable",0),t&2&&_("columns",e.columns)("config",e.config)("rows",e.rows)},dependencies:[k],encapsulation:2})}}return r})();var T=[{path:"",component:m},{path:":car_id",component:m}],J=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=u({type:r})}static{this.\u0275inj=d({imports:[C.forChild(T),j]})}}return r})();export{J as CarpartModule};
