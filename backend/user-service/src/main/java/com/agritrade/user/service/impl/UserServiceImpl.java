package com.agritrade.user.service.impl;

import com.agritrade.user.dto.UserRequestDTO;
import com.agritrade.user.dto.UserResponseDTO;
import com.agritrade.user.exception.ResourceNotFoundException;
import com.agritrade.user.model.User;
import com.agritrade.user.repository.UserRepository;
import com.agritrade.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponseDTO registerUser(UserRequestDTO userRequest) {
        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword()); // In real app, encode this!
        user.setName(userRequest.getName());
        user.setRole(userRequest.getRole());
        user.setLocation(userRequest.getLocation());
        user.setContact(userRequest.getContact());

        User savedUser = userRepository.save(user);
        return mapToResponseDTO(savedUser);
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToResponseDTO(user);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return mapToResponseDTO(user);
    }

    private UserResponseDTO mapToResponseDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .location(user.getLocation())
                .contact(user.getContact())
                .build();
    }
}
