import React, { FC } from 'react';
import styles from './ProductView.module.scss';

interface ProductViewProps {}

const ProductView: FC<ProductViewProps> = () => (
  <div className={styles.ProductView}>
    ProductView Component
  </div>
);

export default ProductView;
