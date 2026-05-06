package com.agritrade.product.controller;

import com.agritrade.product.dto.ProductRequestDTO;
import com.agritrade.product.dto.ProductResponseDTO;
import com.agritrade.product.service.ProductService;
import com.agritrade.product.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/list")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> listProduct(@RequestBody ProductRequestDTO productRequest) {
        ProductResponseDTO product = productService.listProduct(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(product, "Product listed successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> getProduct(@PathVariable Long id) {
        ProductResponseDTO product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(product, "Product retrieved successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ProductResponseDTO>>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.success(products, "All products retrieved successfully"));
    }
}
