import {Document} from "mongoose";

export interface Product extends Document {
    readonly _id: string;
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly sku: string;
    readonly keyword: string;
    readonly contraindicated: string; // chống chỉ định
    readonly dative: string; // chỉ định
    readonly dosageAndUsage: string; // liều dùng và cách dùng
    readonly preservation: string; // bảo quản
    readonly ingredient: string; // thành phần
    readonly packing: string; // quy cách đóng gói
    readonly idTradeMark: string; //thương hiệu
    readonly idProducer: string; // nhà sản xuất
    readonly idUnit: string; //đơn vị
    idPrice: any;
    readonly createAt: string; //
}

export interface TradeMark extends Document{ // thương hiệu
    readonly _id: string;
    readonly origin: string; // xuất xứ thương hiệu
    readonly name: string;
}

export interface Producer extends Document{
    readonly _id: string;
    readonly name: string;
}

export interface Unit extends Document{
    readonly _id: string;
    readonly name: string;
}
export interface ProductResponse {
    readonly effectArrows: number;
}
export interface ProductPrice extends Document{
    readonly _id: string;
    readonly idProduct: string;
    readonly price: number;
    readonly createAt: string;
    readonly updateAt: string;
}
