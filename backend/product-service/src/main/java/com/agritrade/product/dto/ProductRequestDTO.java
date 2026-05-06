package com.agritrade.product.dto;

import lombok.Data;

@Data
public class ProductRequestDTO {
    private String name;
    private String category;
    private Double quantity;
    private String unit;
    private Double price;
    private Long farmerId;
}
