package com.agritrade.product.service;

import com.agritrade.product.dto.ProductRequestDTO;
import com.agritrade.product.dto.ProductResponseDTO;

import java.util.List;

public interface ProductService {
    ProductResponseDTO listProduct(ProductRequestDTO productRequest);
    ProductResponseDTO getProductById(Long id);
    List<ProductResponseDTO> getAllProducts();
}
