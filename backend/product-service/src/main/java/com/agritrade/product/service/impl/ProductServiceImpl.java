package com.agritrade.product.service.impl;

import com.agritrade.product.client.UserClient;
import com.agritrade.product.dto.ProductRequestDTO;
import com.agritrade.product.dto.ProductResponseDTO;
import com.agritrade.product.dto.UserDTO;
import com.agritrade.product.exception.ResourceNotFoundException;
import com.agritrade.product.model.Product;
import com.agritrade.product.repository.ProductRepository;
import com.agritrade.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserClient userClient;

    @Override
    public ProductResponseDTO listProduct(ProductRequestDTO productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setCategory(productRequest.getCategory());
        product.setQuantity(productRequest.getQuantity());
        product.setUnit(productRequest.getUnit());
        product.setPrice(productRequest.getPrice());
        product.setFarmerId(productRequest.getFarmerId());

        Product savedProduct = productRepository.save(product);
        return mapToResponseDTO(savedProduct);
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapToResponseDTO(product);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private ProductResponseDTO mapToResponseDTO(Product product) {
        // Fetch farmer details via Feign Client
        UserDTO farmer = null;
        try {
            farmer = userClient.getUserById(product.getFarmerId());
        } catch (Exception e) {
            // Handle cases where User Service is down or User doesn't exist
            // In a real app, you might want to log this or return a partial response
        }

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory())
                .quantity(product.getQuantity())
                .unit(product.getUnit())
                .price(product.getPrice())
                .farmer(farmer)
                .build();
    }
}
