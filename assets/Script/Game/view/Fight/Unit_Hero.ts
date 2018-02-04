/*
author: JustinLin
日期:2018-02-03 10:47:34
*/
import { RES } from "../../../Frame/common/resource";
import { UnitComponent } from "../../../Frame/view/UnitComponent";
import CustEmitter from "../../../Frame/ctrl/CustEmitter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Unit_Hero extends UnitComponent {
	//私有变量
	_id : number = 0;
	_nTotalHp : number = 0;
	_nCurHp : number = 0;
	_nTotalMp : number = 0;
	_nCurMp : number = 0;
	_abnormal : number = 0;
	_Atted : boolean = false;
	//私有变量声明结束
	//这边去声明ui组件
	@property({
		tooltip : "名称",
		type : cc.Label
	})
	Hero_Name : cc.Label = null;
	@property({
		tooltip : "角色血量条",
		type : cc.ProgressBar
	})
	Hero_Hp : cc.ProgressBar = null;
	@property({
		tooltip : "角色魔法条",
		type : cc.ProgressBar
	})
	Hero_Mp : cc.ProgressBar = null;
	@property({
		tooltip : "角色伤害/补血数值",
		type : cc.Label
	})
	Hero_Value : cc.Label = null;
	@property({
		tooltip : "角色形象",
		type : cc.Sprite
	})
	Hero_Image : cc.Sprite = null;
	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
		this.Hero_Value.node.active = false;
	}

   	//渲染结束后会调用
	initUi () : void {
		//创建当前类时传进来的数据
		let data = this._oData;
		cc.log(data);
		// this._event = [data.id+"removeSelf", data.id+"showDamage", data.id+"removeSelf", data.id+"showRescue"];
		// for (let i = 0; i < this._event.length; i ++) {
		// 	CustEmitter.getInstance().on(this._event[i], this[this._event[i]], this);
		// }
		this.Hero_Name.string = data.name;
		if (data.camp == "monster") {
			this.Hero_Name.node.color = cc.Color.RED;
		}
		this._nTotalHp = data.hp;
		this._nCurHp = data.hp;
		this.setHeroHp(data.hp);
		this.setHeroMp(data.mp);
	}

	//显示数值
	showValue (data) : void {
		this.Hero_Value.string = data.value;
		this.Hero_Value.node.color = data.color;
	}

	setHeroHp (value) : void {
		this.Hero_Hp.progress = value / this._nTotalHp;
	}

	setHeroMp (value) : void {
		this.Hero_Mp.progress = value / this._nTotalMp;
	}

	//显示异常状态
	showAbnormal () : void {
		
	}

	//设置攻击状态
	setAttStatus (att : boolean) : void {
		this._Atted = att;
	}
	getAttStatus () : boolean {
		return this._Atted;
	}

	//移除自己
	removeSelf () : void {
		this.destroy();
	}
}