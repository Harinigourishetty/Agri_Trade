package com.agritrade.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String category;
    private Double quantity;
    private String unit;
    private Double price;
    private UserDTO farmer;
}
