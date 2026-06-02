package com.agritrade.user.service;

import com.agritrade.user.dto.UserRequestDTO;
import com.agritrade.user.dto.UserResponseDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO registerUser(UserRequestDTO userRequest);
    UserResponseDTO getUserById(Long id);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO getUserByEmail(String email);
    UserResponseDTO loginUser(String email, String password);
}
