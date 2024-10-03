import {ProductDto} from "../Api";
import {atom} from "jotai";

// Product Atom
export const productAtom = atom<ProductDto[]>([])