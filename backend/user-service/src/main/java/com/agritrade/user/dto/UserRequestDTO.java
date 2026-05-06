package com.agritrade.user.dto;

import lombok.Data;

@Data
public class UserRequestDTO {
    private String email;
    private String password;
    private String name;
    private String role;
    private String location;
    private String contact;
}
