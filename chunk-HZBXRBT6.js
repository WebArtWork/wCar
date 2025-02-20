import{a as j,b as k}from"./chunk-63GIKE6M.js";import{e as R}from"./chunk-LGAQXJCQ.js";import{I as s,L as p,M as _,Pa as v,R as f,Ra as w,Va as C,X as u,ab as g,f as n,fb as y,i as a,mb as S,s as m,tb as b,vb as M}from"./chunk-XY7HJDFI.js";var h=(()=>{class o{constructor(e,r,t,c,d,I,q){this._translate=e,this._carrecordService=r,this._alert=t,this._route=c,this._form=d,this._core=I,this._router=q,this.columns=["name","description"],this.form=this._form.getForm("carrecord",j),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._carrecordService.setPerPage.bind(this._carrecordService),allDocs:!1,create:this._router.url.includes("carrecord/")?()=>{this._form.modal(this.form,{label:"Create",click:(i,l)=>n(this,null,function*(){l(),this._preCreate(i),yield a(this._carrecordService.create(i)),this.setRows()})})}:null,update:i=>{this._form.modal(this.form,[],i).then(l=>{this._core.copy(l,i),this._carrecordService.update(i)})},delete:i=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this carrecord?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>n(this,null,function*(){yield a(this._carrecordService.delete(i)),this.setRows()})}]})},buttons:[{icon:"cloud_download",click:i=>{this._form.modalUnique("carrecord","url",i)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this.car_id="",this._page=1,this.setRows(),this._route.paramMap.subscribe(i=>{this.car_id=i.get("car_id")||"",console.log(this.car_id)})}setRows(e=this._page){this._page=e,this._core.afterWhile(this,()=>{this._carrecordService.get({page:e,query:this._query()}).subscribe(r=>{this.rows.splice(0,this.rows.length),this.rows.push(...r)})},250)}_bulkManagement(e=!0){return()=>{this._form.modalDocs(e?[]:this.rows).then(r=>n(this,null,function*(){if(e)for(let t of r)this._preCreate(t),yield a(this._carrecordService.create(t));else{for(let t of this.rows)r.find(c=>c._id===t._id)||(yield a(this._carrecordService.delete(t)));for(let t of r){let c=this.rows.find(d=>d._id===t._id);c?(this._core.copy(t,c),yield a(this._carrecordService.update(c))):(this._preCreate(t),yield a(this._carrecordService.create(t)))}}this.setRows()}))}}_preCreate(e){e.__created=!1,this.car_id&&(e.car=this.car_id)}_query(){let e="";return this.car_id&&(e+=(e?"&":"")+"car="+this.car_id),e}static{this.\u0275fac=function(r){return new(r||o)(s(S),s(k),s(y),s(v),s(M),s(g),s(w))}}static{this.\u0275cmp=p({type:o,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Records",3,"columns","config","rows"]],template:function(r,t){r&1&&u(0,"wtable",0),r&2&&f("columns",t.columns)("config",t.config)("rows",t.rows)},dependencies:[b],encapsulation:2})}}return o})();var P=[{path:"",component:h},{path:":car_id",component:h}],H=(()=>{class o{static{this.\u0275fac=function(r){return new(r||o)}}static{this.\u0275mod=_({type:o})}static{this.\u0275inj=m({imports:[C.forChild(P),R]})}}return o})();export{H as CarrecordModule};
