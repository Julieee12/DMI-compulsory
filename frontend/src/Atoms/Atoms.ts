import {CustomerDto, OrderDto, ProductDto} from "../Api";
import {atom} from "jotai";

// Product Atom
export const productAtom = atom<ProductDto[]>([])

//Customer Atom
export const customerAtom = atom<CustomerDto[]>([])
export const customerSelectedAtom = atom(null);

//Oder Atom
export const orderAtom = atom<OrderDto[]>([])
