import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {DetailDescription} from "./DetailDescription/DetailDescription";
import {getProductDetail, getProfit} from "../../features/product";
import {ProductDetailTabs} from "./ProductDetailTabs/ProductDetailTabs";
import {RelatedProduct} from "./RelatedProduct/RelatedProduct";
import {Breadcrumb} from "./Breadcrumb/Breadcrumb";
import {getWarehouse} from "../../features/receipt";

export const ProductDetail = ({match}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductDetail(match.params.id));
        dispatch(getWarehouse());
        dispatch(getProfit());
    }, [dispatch, match])
    const product = useSelector(state => state.product.productDetail);
    const warehouse = useSelector(state => state.receipt.warehouse);
    const profit = useSelector(state => state.product.profit);
    return (
        <Grid container className="pt-5 px-16 pb-10">
            <Breadcrumb product={product}/>
            <Grid item xs={12}>
                <DetailDescription product={product} warehouse={warehouse} profit={profit}/>
            </Grid>
            <Grid item xs={12} className="mt-5 mb-8">
                <ProductDetailTabs  product={product} id={match.params.id}/>
            </Grid>
            <Grid item xs={12}>
                <RelatedProduct product={product} warehouse={warehouse} profit={profit}/>
            </Grid>
        </Grid>
    )
}
