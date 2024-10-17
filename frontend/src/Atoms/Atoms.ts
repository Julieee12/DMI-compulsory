import {CustomerDto, OrderDto, OrderStatusDto, ProductDto} from "../Api";
import {atom} from "jotai";

// Product Atom
export const productAtom = atom<ProductDto[]>([])

//Customer Atom
export const customerAtom = atom<CustomerDto[]>([])
export const customerSelectedAtom = atom(null);

//Order Atom
export const orderAtom = atom<OrderDto[]>([])
export const orderStatusAtom = atom<OrderStatusDto[]>([]);
