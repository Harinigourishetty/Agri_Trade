package com.agritrade.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
    private Long id;
    private String email;
    private String name;
    private String role;
    private String location;
    private String contact;
}
